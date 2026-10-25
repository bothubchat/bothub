import { Lexer, type MarkedToken, type Token } from 'marked';
import { isEscaped } from './utils';

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
const CITE_OPEN_PATTERN = /<cite>/gi;
const CITE_CLOSE_PATTERN = /<\/cite>/gi;

const countMatches = (value: string, pattern: RegExp): number =>
  value.match(pattern)?.length ?? 0;

const countMathFences = (value: string): number => {
  let count = 0;
  for (
    let index = value.indexOf('$$');
    index !== -1;
    index = value.indexOf('$$', index + 2)
  ) {
    if (!isEscaped(value, index)) {
      count += 1;
    }
  }
  return count;
};

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
 * block is never split) and outside `$$` formulas and `<cite>` tags, which
 * remark parses across blank lines. It does not end before a list or an
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
  let mathFences = 0;
  let openCites = 0;

  tokens.forEach((token, index) => {
    block += token.raw;

    if (token.type !== 'code') {
      mathFences += countMathFences(token.raw);
      openCites +=
        countMatches(token.raw, CITE_OPEN_PATTERN) -
        countMatches(token.raw, CITE_CLOSE_PATTERN);
    }

    const next = tokens[index + 1];

    if (
      block.length >= MIN_MARKDOWN_BLOCK_LENGTH &&
      mathFences % 2 === 0 &&
      openCites <= 0 &&
      BLANK_LINE_END_PATTERN.test(block) &&
      !(next && mayContinueList(next, index + 2 === tokens.length))
    ) {
      blocks.push(block);
      block = '';
      mathFences = 0;
      openCites = 0;
    }
  });

  if (block) {
    blocks.push(block);
  }

  return blocks;
};
