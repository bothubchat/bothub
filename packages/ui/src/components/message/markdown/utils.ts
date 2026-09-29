type SegmentKind = 'code' | 'math' | 'text';

interface Segment {
  kind: SegmentKind;
  value: string;
}

// Fence may be preceded by indentation, blockquote markers and list markers.
const FENCE_OPEN_PATTERN =
  /^((?:[ \t]*>)*[ \t]*(?:(?:[-*+]|\d{1,9}[.)])[ \t]+)*)(`{3,}|~{3,})(.*)$/;
const FENCE_CLOSE_PATTERN = /^(?:[ \t]*>)*[ \t]*(`{3,}|~{3,})[ \t]*$/;
const INLINE_CODE_PATTERN = /(`+)([^`\n](?:[^\n]*?[^`\n])?)\1(?!`)/g;
// Text before a block math delimiter that still allows a `$$` fence on the line.
const BLOCK_PREFIX_PATTERN =
  /^(?:[ \t]*>)*[ \t]*(?:(?:[-*+]|\d{1,9}[.)])[ \t]+)*$/;
const LIST_MARKER_PATTERN = /[-*+]|\d{1,9}[.)]/g;

const MATH_OPERATOR_PATTERN = /[=^_\\{}]/;
const MATH_BODY_PATTERN = /[=^_{}]|\\[a-zA-Z]+|[+\-*/<>]\s*\d|\d\s*[+\-*/<>]/;
const SIMPLE_EXPRESSION_PATTERN = /^[\sA-Za-z\d+\-*/<>=()|.,']+$/;
const SINGLE_VARIABLE_PATTERN = /^\s*[A-Za-z]'*\s*$/;

function isWhitespace(char: string | undefined): boolean {
  return char === ' ' || char === '\n' || char === '\t' || char === '\r';
}

function isDigit(char: string | undefined): boolean {
  return char !== undefined && char >= '0' && char <= '9';
}

function isEscaped(content: string, index: number): boolean {
  let backslashes = 0;
  for (let i = index - 1; i >= 0 && content[i] === '\\'; i -= 1) {
    backslashes += 1;
  }
  return backslashes % 2 === 1;
}

function looksLikeMathBody(body: string): boolean {
  if (MATH_BODY_PATTERN.test(body)) {
    return true;
  }

  return (
    SIMPLE_EXPRESSION_PATTERN.test(body) &&
    /[A-Za-z]/.test(body) &&
    /[+\-*/<>=]/.test(body)
  );
}

function looksLikeInlineMathBody(body: string): boolean {
  return looksLikeMathBody(body) || SINGLE_VARIABLE_PATTERN.test(body);
}

function looksLikeCurrencySpan(body: string): boolean {
  // Another dollar inside the span means it would be paired incorrectly.
  if (body.includes('$')) {
    return true;
  }

  if (MATH_OPERATOR_PATTERN.test(body) || /^\d+[^\d\s.,$]/.test(body)) {
    return false;
  }

  return /^\d[\d.,]*\s/.test(body);
}

/**
 * Splits content into fenced code blocks (``` and ~~~, including unclosed ones
 * while a message is streaming) and the rest of the text.
 */
function splitFencedCode(content: string): Segment[] {
  const segments: Segment[] = [];
  const lines = content.split('\n');
  let current: Segment = { kind: 'text', value: '' };
  let fence: { char: string; length: number } | null = null;

  const append = (kind: SegmentKind, value: string) => {
    if (current.kind !== kind) {
      if (current.value) {
        segments.push(current);
      }
      current = { kind, value: '' };
    }
    current.value += value;
  };

  lines.forEach((line, index) => {
    const value = index < lines.length - 1 ? `${line}\n` : line;

    if (fence) {
      append('code', value);
      const close = FENCE_CLOSE_PATTERN.exec(line);
      if (
        close &&
        close[1][0] === fence.char &&
        close[1].length >= fence.length
      ) {
        fence = null;
      }
      return;
    }

    const open = FENCE_OPEN_PATTERN.exec(line);
    // A backtick fence info string cannot contain backticks (```a``` is inline code).
    if (open && !(open[2][0] === '`' && open[3].includes('`'))) {
      fence = { char: open[2][0], length: open[2].length };
      append('code', value);
      return;
    }

    append('text', value);
  });

  if (current.value) {
    segments.push(current);
  }

  return segments;
}

function splitInlineCode(content: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(INLINE_CODE_PATTERN)) {
    const index = match.index ?? 0;
    if (isEscaped(content, index)) {
      continue;
    }
    if (index > lastIndex) {
      segments.push({ kind: 'text', value: content.slice(lastIndex, index) });
    }
    segments.push({ kind: 'code', value: match[0] });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({ kind: 'text', value: content.slice(lastIndex) });
  }

  return segments;
}

function startsWithUnescaped(
  content: string,
  needle: string,
  index: number,
): boolean {
  return content.startsWith(needle, index) && !isEscaped(content, index);
}

function findUnescaped(content: string, needle: string, from: number): number {
  let index = content.indexOf(needle, from);
  while (index !== -1 && isEscaped(content, index)) {
    index = content.indexOf(needle, index + 1);
  }
  return index;
}

function toInlineMath(expression: string): string {
  return `$${expression.trim().replace(/\s*\n\s*/g, ' ')}$`;
}

/**
 * Converts display math into a `$$` block. A block is only possible when the
 * delimiters occupy whole lines, otherwise `$$` fences would swallow the rest
 * of the message, so inline display-style math is used instead. Continuation
 * lines keep the indentation of the opening line to stay inside list items
 * and blockquotes.
 */
function toDisplayMath(
  expression: string,
  linePrefix: string | null,
  lineSuffix: string,
): string {
  if (
    linePrefix === null ||
    !BLOCK_PREFIX_PATTERN.test(linePrefix) ||
    lineSuffix.trim() !== ''
  ) {
    return toInlineMath(`\\displaystyle ${expression.trim()}`);
  }

  const indent = linePrefix.replace(LIST_MARKER_PATTERN, (marker) =>
    ' '.repeat(marker.length),
  );
  const lines = expression
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return ['$$', ...lines.map((line) => `${indent}${line}`), `${indent}$$`].join(
    '\n',
  );
}

function getLineSuffix(content: string, from: number): string {
  const lineEnd = content.indexOf('\n', from);
  return content.slice(from, lineEnd === -1 ? content.length : lineEnd);
}

/**
 * Splits text into math (`$$…$$`, `\[…\]`, `\(…\)`, `\$$…\$$`, `\$…\$`) and
 * plain text. Explicit LaTeX delimiters are converted to remark-math syntax.
 */
function splitMath(content: string, startsAtLineStart: boolean): Segment[] {
  const segments: Segment[] = [];
  let text = '';
  let index = 0;

  const pushText = () => {
    if (text) {
      segments.push({ kind: 'text', value: text });
      text = '';
    }
  };

  const getLinePrefix = (at: number): string | null => {
    const lineStart = content.lastIndexOf('\n', at - 1) + 1;
    if (lineStart === 0 && !startsAtLineStart) {
      return null;
    }
    return content.slice(lineStart, at);
  };

  while (index < content.length) {
    let handled = false;

    if (startsWithUnescaped(content, '\\$$', index)) {
      const close = findUnescaped(content, '\\$$', index + 3);
      if (close !== -1) {
        pushText();
        segments.push({
          kind: 'math',
          value: toDisplayMath(
            content.slice(index + 3, close),
            getLinePrefix(index),
            getLineSuffix(content, close + 3),
          ),
        });
        index = close + 3;
        handled = true;
      }
    } else if (startsWithUnescaped(content, '\\[', index)) {
      const close = findUnescaped(content, '\\]', index + 2);
      const expression = close === -1 ? '' : content.slice(index + 2, close);
      if (close !== -1 && looksLikeMathBody(expression)) {
        pushText();
        segments.push({
          kind: 'math',
          value: toDisplayMath(
            expression,
            getLinePrefix(index),
            getLineSuffix(content, close + 2),
          ),
        });
        index = close + 2;
        handled = true;
      }
    } else if (startsWithUnescaped(content, '\\(', index)) {
      const close = findUnescaped(content, '\\)', index + 2);
      const expression = close === -1 ? '' : content.slice(index + 2, close);
      if (
        close !== -1 &&
        !expression.includes('\n') &&
        expression.trim() !== ''
      ) {
        pushText();
        segments.push({ kind: 'math', value: toInlineMath(expression) });
        index = close + 2;
        handled = true;
      }
    } else if (startsWithUnescaped(content, '\\$', index)) {
      const close = findUnescaped(content, '\\$', index + 2);
      const expression = close === -1 ? '' : content.slice(index + 2, close);
      // `\$10 and \$20` is escaped currency, not a formula.
      if (
        close !== -1 &&
        !expression.includes('\n') &&
        !/^\s*\d/.test(expression) &&
        looksLikeInlineMathBody(expression)
      ) {
        pushText();
        segments.push({ kind: 'math', value: toInlineMath(expression) });
        index = close + 2;
        handled = true;
      }
    } else if (startsWithUnescaped(content, '$$', index)) {
      const close = findUnescaped(content, '$$', index + 2);
      if (close !== -1) {
        pushText();
        segments.push({ kind: 'math', value: content.slice(index, close + 2) });
        index = close + 2;
        handled = true;
      }
    }

    if (!handled) {
      text += content[index];
      index += 1;
    }
  }

  pushText();

  return segments;
}

function findInlineMathClose(content: string, from: number): number {
  for (let index = from; index < content.length; index += 1) {
    if (content[index] !== '$' || isEscaped(content, index)) {
      continue;
    }

    if (content[index + 1] === '$') {
      index += 1;
      continue;
    }

    if (isWhitespace(content[index - 1]) || isDigit(content[index + 1])) {
      continue;
    }

    return index;
  }

  return -1;
}

/**
 * Escapes currency dollars (`$10`) so remark-math does not pair them into
 * inline formulas.
 */
function normalizeInlineDollars(content: string): string {
  let result = '';

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const isCurrencyCandidate =
      char === '$' && !isEscaped(content, index) && isDigit(content[index + 1]);

    if (isCurrencyCandidate) {
      const closeIndex = findInlineMathClose(content, index + 1);
      const body =
        closeIndex === -1 ? '' : content.slice(index + 1, closeIndex);

      if (closeIndex === -1 || looksLikeCurrencySpan(body)) {
        result += '\\$';
        continue;
      }
    }

    result += char;
  }

  return result;
}

interface UnfinishedMath {
  segmentIndex: number;
  offset: number;
}

// Mirrors which explicit delimiters `splitMath` converts once they are closed.
const EXPLICIT_MATH_DELIMITERS = [
  { open: '\\$$', close: '\\$$', isMath: () => true },
  {
    open: '\\[',
    close: '\\]',
    isMath: (body: string) => body.trim() === '' || looksLikeMathBody(body),
  },
  { open: '\\(', close: '\\)', isMath: (body: string) => !body.includes('\n') },
];

/**
 * Finds the opening delimiter of a formula that has not been closed yet.
 * Works on normalized text: closed `\[…\]` and `\(…\)` are already converted,
 * currency dollars are already escaped. Inline math is limited to one line so a
 * stray `$` can hide at most the current line.
 */
function findUnfinishedMath(segments: Segment[]): UnfinishedMath | null {
  let display: UnfinishedMath | null = null;
  let inline: UnfinishedMath | null = null;

  for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
    const { kind, value } = segments[segmentIndex];

    if (kind === 'code') {
      continue;
    }

    for (let offset = 0; offset < value.length; offset += 1) {
      const char = value[offset];
      const position = { segmentIndex, offset };

      if (char === '\n' && !display) {
        inline = null;
        continue;
      }

      if (isEscaped(value, offset)) {
        continue;
      }

      if (char === '\\' && !display && !inline) {
        const explicit = EXPLICIT_MATH_DELIMITERS.find(({ open }) =>
          value.startsWith(open, offset),
        );

        if (explicit) {
          const bodyStart = offset + explicit.open.length;
          const close = findUnescaped(value, explicit.close, bodyStart);

          if (close === -1 && explicit.isMath(value.slice(bodyStart))) {
            return position;
          }

          if (close !== -1) {
            offset = close + explicit.close.length - 1;
          }
          continue;
        }

        // A lone trailing backslash may be the start of `\[` or `\(`.
        if (offset === value.length - 1) {
          return position;
        }
        continue;
      }

      if (char !== '$') {
        continue;
      }

      if (value[offset + 1] === '$') {
        display = display ? null : position;
        offset += 1;
        continue;
      }

      if (display) {
        continue;
      }

      if (inline) {
        inline = null;
      } else if (!isWhitespace(value[offset + 1])) {
        inline = position;
      }
    }
  }

  return display ?? inline;
}

function trimUnfinishedMath(segments: Segment[]): Segment[] {
  const unfinished = findUnfinishedMath(segments);

  if (!unfinished) {
    return segments;
  }

  const { segmentIndex, offset } = unfinished;

  return [
    ...segments.slice(0, segmentIndex),
    {
      ...segments[segmentIndex],
      value: segments[segmentIndex].value.slice(0, offset),
    },
  ];
}

export interface NormalizeMessageMarkdownOptions {
  /**
   * The message is still streaming: the last formula may be incomplete, so it
   * is hidden until its closing delimiter arrives instead of rendering as a
   * KaTeX error or raw LaTeX.
   */
  typing?: boolean;
}

export function normalizeMessageMarkdown(
  content: string,
  { typing = false }: NormalizeMessageMarkdownOptions = {},
): string {
  const segments: Segment[] = [];

  splitFencedCode(content).forEach((block) => {
    if (block.kind !== 'text') {
      segments.push(block);
      return;
    }
    segments.push(...splitInlineCode(block.value));
  });

  const normalized = segments.map((segment, index): Segment => {
    if (segment.kind !== 'text') {
      return segment;
    }

    const previous = segments[index - 1];
    const startsAtLineStart = !previous || previous.value.endsWith('\n');

    return {
      kind: 'text',
      value: splitMath(segment.value, startsAtLineStart)
        .map((part) =>
          part.kind === 'text'
            ? normalizeInlineDollars(part.value)
            : part.value,
        )
        .join(''),
    };
  });

  return (typing ? trimUnfinishedMath(normalized) : normalized)
    .map((segment) => segment.value)
    .join('');
}
