import { Lexer, type MarkedToken, type Token } from 'marked';
import { getLinesOutsideFencedCode } from './utils';

/*
 * Every block is parsed by its own react-markdown, so a streamed message only
 * re-parses its last block. A separate parse has a fixed cost of ~0.2–0.3 ms
 * (unified processor and micromark setup): smaller blocks would make the first
 * render of a long message slower than one parse of the whole text.
 */
export const MIN_MARKDOWN_BLOCK_LENGTH = 1500;

// marked does not know footnotes: `[^1]: Сноска с пробелами` is a paragraph
// for it.
const DEFINITION_PATTERN = /^ {0,3}\[(?:\\[\s\S]|[^[\]\\])+\]:/m;
const BLANK_LINE_END_PATTERN = /\n[ \t]*\n$/;
const INDENT_PATTERN = /^[ \t]/;
// A list item that is still streamed: marked sees a paragraph in `1` or `- `.
const LIST_MARKER_PATTERN = /^(?:[-*+]|\d{1,9}[.)]?)[ \t]*$/;
// A fence line of a `$$` formula block, also in a list item or a quote. Inline
// math cannot span a blank line, and a `$` after the fence makes it inline.
const MATH_FENCE_PATTERN =
  /^(?:[ \t]*>)*[ \t]*(?:(?:[-*+]|\d{1,9}[.)])[ \t]+)*(\${2,})([^$]*)$/;
const CITE_OPEN = '<cite>';
const CITE_CLOSE = '</cite>';

/**
 * Size of the fence of a `$$` formula block that is still open after the
 * text, 0 if there is none. As in remark-math, a formula is closed only by a
 * fence line of at least as many `$` and nothing after them.
 */
const getOpenMathFence = (text: string, openFence: number): number =>
  // Most of the text has no formulas: the lines are not even split then.
  text.includes('$$')
    ? getLinesOutsideFencedCode(text).reduce((fence, line) => {
        const match = MATH_FENCE_PATTERN.exec(line);

        if (!match) {
          return fence;
        }
        if (!fence) {
          return match[1].length;
        }
        return match[1].length >= fence && !match[2].trim() ? 0 : fence;
      }, openFence)
    : openFence;

/**
 * Reference links and footnotes may be defined in another block. Code is
 * skipped: `[key: string]: string;` of a TS interface is not a definition.
 */
const hasDefinition = (tokens: Token[]): boolean =>
  // Without marked extensions every token is a MarkedToken.
  (tokens as MarkedToken[]).some((token) => {
    switch (token.type) {
      case 'def':
        return true;
      case 'paragraph':
      case 'text':
        return DEFINITION_PATTERN.test(token.raw);
      case 'blockquote':
        return hasDefinition(token.tokens);
      case 'list':
        return token.items.some((item) => hasDefinition(item.tokens));
      default:
        return false;
    }
  });

// After a blank line a list goes on with a new item or an indented line.
const mayContinueList = (token: Token, isLast: boolean): boolean =>
  token.type === 'list' ||
  INDENT_PATTERN.test(token.raw) ||
  (isLast && LIST_MARKER_PATTERN.test(token.raw));

/**
 * Splits markdown into top-level blocks that render the same on their own. A
 * block ends only on a blank line between top-level elements (a list or a code
 * block is never split) and outside `$$` formulas and cites, which remark
 * parses across blank lines: remarkCite wraps everything between `<cite>` and
 * `</cite>` HTML blocks of the top level. It does not end before a list or an
 * indented line either: marked knows no `$$` formulas and ends tables later
 * than remark, so `2. …` right after them is a list for remark only, and this
 * list may go on after the blank line. Boundaries depend only on the text
 * before them and the start of the next element, so blocks that are already
 * complete do not change while the text grows.
 */
export const splitMarkdownBlocks = (markdown: string): string[] => {
  if (markdown.length < MIN_MARKDOWN_BLOCK_LENGTH) {
    return [markdown];
  }

  const tokens = new Lexer().blockTokens(markdown, []);

  if (hasDefinition(tokens)) {
    return [markdown];
  }

  const blocks: string[] = [];
  let block = '';
  let mathFence = 0;
  let isCiteOpen = false;

  tokens.forEach((token, index) => {
    block += token.raw;

    if (token.type !== 'code') {
      mathFence = getOpenMathFence(token.raw, mathFence);
    }

    if (token.type === 'html') {
      const tag = token.raw.trim().toLowerCase();

      if (tag === CITE_OPEN) {
        isCiteOpen = true;
      } else if (tag === CITE_CLOSE) {
        isCiteOpen = false;
      }
    }

    const next = tokens[index + 1];

    if (
      block.length >= MIN_MARKDOWN_BLOCK_LENGTH &&
      !mathFence &&
      !isCiteOpen &&
      BLANK_LINE_END_PATTERN.test(block) &&
      !(next && mayContinueList(next, index + 2 === tokens.length))
    ) {
      blocks.push(block);
      block = '';
    }
  });

  if (block) {
    blocks.push(block);
  }

  return blocks;
};
