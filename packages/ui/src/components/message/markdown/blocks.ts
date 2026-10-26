/*
 * Splits markdown into top-level blocks that can be parsed separately: the
 * rendered blocks joined with a newline give the same markup as the whole
 * text rendered at once. While a message is typed only the last block changes,
 * so finished blocks are not parsed again on every chunk.
 *
 * The splitter is deliberately conservative. A boundary is only placed before
 * a line without indentation that follows a blank line: there every paragraph,
 * list, blockquote, table and indented code block has ended. Constructs that
 * may contain blank lines (fenced code, `$$` math, raw HTML) are tracked, and
 * whenever the structure cannot be known for sure the rest of the text is kept
 * in one block. The equivalence is covered by randomized tests.
 */

interface OpenConstruct {
  /**
   * Column the construct starts at. Above 0 it may be inside a list item and
   * end together with the item.
   */
  column: number;
  /** Fence character and length, for fenced code and math. */
  fence?: { char: string; length: number };
  /** End marker, for raw HTML blocks. */
  close?: RegExp;
}

const BLANK_LINE_PATTERN = /^[ \t]*\r?$/;
const CODE_FENCE_OPEN_PATTERN = /^(`{3,}|~{3,})(.*)$/;
const CODE_FENCE_CLOSE_PATTERN = /^(`{3,}|~{3,})[ \t]*$/;
// remark-math: two or more dollars, the rest of the line has no dollars.
const MATH_FENCE_OPEN_PATTERN = /^(\${2,})[^$]*$/;
const MATH_FENCE_CLOSE_PATTERN = /^(\${2,})[ \t]*$/;
const LIST_MARKERS_PATTERN = /^(?:(?:[-*+]|\d{1,9}[.)])[ \t]+)+/;
const LIST_ITEM_PATTERN = /^(?:[-*+]|\d{1,9}[.)])(?:[ \t]|$)/;
const NESTED_LIST_ITEM_PATTERN =
  /^[ \t]*(?:>[ \t]?)*[ \t]*(?:[-*+]|\d{1,9}[.)])(?:[ \t]|$)/;
// Link reference and footnote definitions apply to the whole text. The second
// pattern is the end of a label that started on a previous line.
const DEFINITION_PATTERNS = [
  /^[ \t]*(?:>[ \t]?)*[ \t]*(?:(?:[-*+]|\d{1,9}[.)])[ \t]+)*\[(?:[^\]\n\\]|\\.)+\]:/,
  /^[^[]*\]:/,
];
const CITE_OPEN_LINE = '<cite>';
const CITE_CLOSE_LINE = '</cite>';

// HTML blocks that may contain blank lines (CommonMark types 1-5).
const HTML_BLOCKS: { open: RegExp; close: RegExp }[] = [
  {
    open: /^<(?:pre|script|style|textarea)(?:[ \t>]|$)/i,
    close: /<\/(?:pre|script|style|textarea)>/i,
  },
  { open: /^<!--/, close: /-->/ },
  { open: /^<\?/, close: /\?>/ },
  { open: /^<!\[CDATA\[/, close: /\]\]>/ },
  { open: /^<![A-Za-z]/, close: />/ },
];

function isDefinitionLine(line: string): boolean {
  return DEFINITION_PATTERNS.some((pattern) => pattern.test(line));
}

function isBlankLine(line: string): boolean {
  return BLANK_LINE_PATTERN.test(line);
}

/** Columns of leading whitespace, tabs move to the next multiple of 4. */
function getIndent(line: string): number {
  let indent = 0;
  for (const char of line) {
    if (char === ' ') {
      indent += 1;
    } else if (char === '\t') {
      indent += 4 - (indent % 4);
    } else {
      break;
    }
  }
  return indent;
}

function openConstruct(content: string, column: number): OpenConstruct | null {
  const code = CODE_FENCE_OPEN_PATTERN.exec(content);
  // A backtick fence info string cannot contain backticks.
  if (code && !(code[1][0] === '`' && code[2].includes('`'))) {
    return { column, fence: { char: code[1][0], length: code[1].length } };
  }

  const math = MATH_FENCE_OPEN_PATTERN.exec(content);
  if (math) {
    return { column, fence: { char: '$', length: math[1].length } };
  }

  const html = HTML_BLOCKS.find(({ open }) => open.test(content));
  const opener = html?.open.exec(content)?.[0] ?? '';
  // The block may end on the same line.
  if (html && !html.close.test(content.slice(opener.length))) {
    return { column, close: html.close };
  }

  return null;
}

function isClosingFence(
  content: string,
  fence: NonNullable<OpenConstruct['fence']>,
): boolean {
  const match = (
    fence.char === '$' ? MATH_FENCE_CLOSE_PATTERN : CODE_FENCE_CLOSE_PATTERN
  ).exec(content);

  return (
    !!match && match[1][0] === fence.char && match[1].length >= fence.length
  );
}

function findCiteRange(lines: string[]): [number, number] | null {
  const normalized = lines.map((line) => line.trim().toLowerCase());
  const open = normalized.indexOf(CITE_OPEN_LINE);
  if (open === -1) {
    return null;
  }

  const close = normalized.lastIndexOf(CITE_CLOSE_LINE);
  return [open, close > open ? close : lines.length];
}

export function splitMarkdownBlocks(markdown: string): string[] {
  // A lone `\r` is a line ending for markdown, but not for this splitter.
  if (/\r(?!\n)/.test(markdown)) {
    return [markdown];
  }

  const lines = markdown.split('\n');
  // `<cite>` and `</cite>` on their own lines are joined by remarkCite.
  const citeRange = findCiteRange(lines);

  const blocks: string[] = [];
  let blockStart = 0;
  let blockHasContent = false;
  let isListStartUnsafe = false;
  // Raw HTML is not rendered: a block of it would leave an extra newline
  // between its neighbours, so it is kept with the next block.
  let blockStartsWithHtml = false;
  let open: OpenConstruct | null = null;
  // Other HTML blocks end at a blank line and may contain lines that look
  // like fences. Whether a line starting with `<` opens one is not checked.
  let isInHtmlLine = false;
  let previousBlank = false;

  let index = 0;
  for (; index < lines.length; index++) {
    const line = lines[index].replace(/\r$/, '');
    const isBlank = isBlankLine(line);
    const indent = getIndent(line);
    const content = line.trimStart();

    if (open) {
      // A less indented line ends the list item the construct may be in, and
      // may look like a closing fence while opening a new one.
      if (!isBlank && indent < open.column) {
        break;
      }

      if (open.fence && isClosingFence(content, open.fence)) {
        // A closing fence may be indented up to 3 columns relative to the
        // list item, which is somewhere up to 3 columns before the opening
        // one. Only these closing fences are certain.
        if (indent !== open.column && (open.column > 3 || indent > 3)) {
          break;
        }
        open = null;
      } else if (open.close?.test(line)) {
        open = null;
      }

      previousBlank = isBlank;
      continue;
    }

    if (isDefinitionLine(line)) {
      return [markdown];
    }

    const isCandidate =
      previousBlank &&
      !isBlank &&
      indent === 0 &&
      blockHasContent &&
      !content.startsWith('<') &&
      !(isListStartUnsafe && LIST_ITEM_PATTERN.test(content)) &&
      !(citeRange && index > citeRange[0] && index <= citeRange[1]);

    if (isCandidate && !blockStartsWithHtml) {
      // Blank lines go to the next block, so appending them while typing
      // does not change a finished block.
      let end = index;
      while (isBlankLine(lines[end - 1])) {
        end -= 1;
      }

      blocks.push(`${lines.slice(blockStart, end).join('\n')}\n`);
      blockStart = end;
      blockHasContent = false;
      isListStartUnsafe = false;
    } else if (isCandidate) {
      // The HTML block now has rendered content after it.
      blockStartsWithHtml = false;
    }

    if (isBlank) {
      isInHtmlLine = false;
      previousBlank = true;
      continue;
    }

    if (!blockHasContent) {
      blockHasContent = true;
      blockStartsWithHtml = content.startsWith('<');
    }
    // A list item after a blank line may continue a list of this block.
    // After indented code micromark does not start an ordered list with a
    // number other than 1, as if it interrupted a paragraph.
    if (indent >= 4 || NESTED_LIST_ITEM_PATTERN.test(line)) {
      isListStartUnsafe = true;
    }

    // Fences and HTML blocks may also start after list markers.
    const markers = LIST_MARKERS_PATTERN.exec(content)?.[0] ?? '';
    if (markers.includes('\t')) {
      break;
    }

    open = openConstruct(
      content.slice(markers.length),
      indent + markers.length,
    );

    if (open && isInHtmlLine) {
      // Either a fence or a line of the HTML block: unknown.
      break;
    }
    if (!open && content.startsWith('<')) {
      isInHtmlLine = true;
    }

    previousBlank = false;
  }

  // The rest is kept in one block when its structure is unknown, but a
  // definition there still applies to the blocks before it.
  if (lines.slice(index).some(isDefinitionLine)) {
    return [markdown];
  }

  blocks.push(lines.slice(blockStart).join('\n'));

  return blocks;
}

/*
 * Every part is parsed by its own react-markdown, so a streamed message only
 * re-parses its last part. A separate parse has a fixed cost of ~0.2–0.3 ms
 * (unified processor and micromark setup): smaller parts would make the first
 * render of a long message slower than one parse of the whole text.
 */
export const MIN_MARKDOWN_BLOCK_LENGTH = 1500;

/**
 * Joins consecutive blocks until each part has at least `minLength`
 * characters: every part is parsed by its own processor, which costs more than
 * parsing a small block itself. Joining blocks keeps the same markup.
 */
export function groupMarkdownBlocks(
  blocks: string[],
  minLength: number,
): string[] {
  const groups: string[] = [];
  let group = '';

  blocks.forEach((block) => {
    group += block;
    if (group.length >= minLength) {
      groups.push(group);
      group = '';
    }
  });

  if (group || !groups.length) {
    groups.push(group);
  }

  return groups;
}

/** Parts of the text that `MessageMarkdown` parses separately. */
export function getMarkdownBlocks(markdown: string): string[] {
  return groupMarkdownBlocks(
    splitMarkdownBlocks(markdown),
    MIN_MARKDOWN_BLOCK_LENGTH,
  );
}
