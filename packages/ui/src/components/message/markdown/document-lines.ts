// Sub-clause numbers like `2.3.` or `1.2.1`: not a markdown list marker.
const CLAUSE_LINE_PATTERN = /^\d{1,9}(?:\.\d{1,9})+\.?[ \t]/;
const LIST_LINE_PATTERN = /^[ \t]*(?:[-*+]|\d{1,9}[.)])[ \t]/;
// `1. Title` at the start of the line.
const SECTION_LINE_PATTERN = /^(\d{1,9})\.[ \t]+(\S.*)$/;
const SECTION_HEADING_MARK = '###';
// No lowercase letters, at least one capital one.
const CAPITALS_TITLE_PATTERN = /^\P{Ll}*\p{Lu}\P{Ll}*$/u;
const MAX_SECTION_TITLE_LENGTH = 120;
// Models draw the place for a signature with underscores: `________`.
const SIGNATURE_LINE_PATTERN = /^[ \t]*_{5,}[ \t]*$/;
const BULLET_LINE_PATTERN = /^[ \t]*[-*+][ \t]/;
const INDENTED_BULLET_PATTERN = /^([ \t]+)[-*+][ \t]/;
const INDENTED_LINE_PATTERN = /^[ \t]/;
// An indented line that goes on with a lowercase word is the rest of the
// sentence above, wrapped by the model to fit a width.
const WRAPPED_LINE_PATTERN = /^[ \t]+\p{Ll}/u;
// Lines that never take a wrapped sentence: headings, tables, quotes.
const NO_CONTINUATION_PATTERN = /^[ \t]*(?:#|\||>)/;

const isBlank = (line: string | undefined): boolean =>
  line === undefined || line.trim() === '';

const isWrappedLine = (line: string, previous: string | undefined): boolean =>
  !isBlank(previous) &&
  !NO_CONTINUATION_PATTERN.test(previous ?? '') &&
  WRAPPED_LINE_PATTERN.test(line) &&
  !BULLET_LINE_PATTERN.test(line);

interface ClauseState {
  /** Indent of the first bullet under the clause, `null` before it. */
  bulletIndent: string | null;
}

/**
 * The bullets under a clause were indented for the list the clause was in:
 * without the list, an indent of 4 spaces makes them paragraph text.
 */
const dedentClauseBullet = (line: string, clause: ClauseState): string => {
  const bullet = INDENTED_BULLET_PATTERN.exec(line);
  if (bullet) {
    clause.bulletIndent ??= bullet[1];
  }

  return clause.bulletIndent && line.startsWith(clause.bulletIndent)
    ? line.slice(clause.bulletIndent.length)
    : line;
};

// The clause goes on until a blank line or an unindented line of a list.
const endsClause = (line: string): boolean =>
  isBlank(line) ||
  (!INDENTED_LINE_PATTERN.test(line) && LIST_LINE_PATTERN.test(line));

const findNextContentLine = (
  lines: string[],
  from: number,
): string | undefined => {
  for (let index = from + 1; index < lines.length; index += 1) {
    if (!isBlank(lines[index])) {
      return lines[index];
    }
  }
  return undefined;
};

interface SectionContext {
  previous: string | undefined;
  next: string | undefined;
  nextContent: string | undefined;
}

const hasOwnClauseBelow = (number: string, nextContent?: string): boolean =>
  !!nextContent &&
  nextContent.startsWith(`${number}.`) &&
  CLAUSE_LINE_PATTERN.test(nextContent);

// `1. TITLE` alone between blank lines, without lowercase letters.
const isCapitalsTitle = (
  title: string,
  { previous, next }: SectionContext,
): boolean =>
  isBlank(previous) &&
  isBlank(next) &&
  title.length <= MAX_SECTION_TITLE_LENGTH &&
  CAPITALS_TITLE_PATTERN.test(title);

/**
 * `1. Title` with its clauses `1.1.` below, or `1. TITLE` in capitals on a
 * line of its own, is the heading of a section, not a list of one item:
 * editors indent a list, so the section would stand to the right of its own
 * clauses, and markdown joins it with a list next to it and numbers it anew
 * (`6. QUALIFICATIONS` after a list of 4 items became `5.`).
 */
const getSectionHeading = (
  line: string,
  context: SectionContext,
): string | null => {
  const section = SECTION_LINE_PATTERN.exec(line);
  if (!section) {
    return null;
  }

  const [, number, title] = section;
  return hasOwnClauseBelow(number, context.nextContent) ||
    isCapitalsTitle(title, context)
    ? `${SECTION_HEADING_MARK} ${number}. ${title}`
    : null;
};

// A line of underscores is the place for a signature, not a markdown rule.
const keepSignatureLine = (line: string): string =>
  SIGNATURE_LINE_PATTERN.test(line) ? line.trim().replace(/_/g, '\\_') : line;

/**
 * Lines of a document written by a model without blank lines between its
 * clauses (`1. Title`, `1.1. Text`, `- item`, `1.2. Text`): a numbered title
 * with clauses is a section heading, every sub-clause after a list starts a
 * paragraph of its own instead of going on the last list item, the bullets
 * under it stay a list, and a sentence the model wrapped is joined back.
 * Code is not passed here.
 */
export function formatDocumentLines(text: string): string {
  const source = text.split('\n');
  const lines: string[] = [];
  let clause: ClauseState | null = null;

  for (const [index, line] of source.entries()) {
    const previous = lines[lines.length - 1];

    if (isWrappedLine(line, previous)) {
      lines[lines.length - 1] = `${previous} ${line.trim()}`;
      continue;
    }

    const heading = getSectionHeading(line, {
      previous,
      next: source[index + 1],
      nextContent: findNextContentLine(source, index),
    });
    if (heading) {
      clause = null;
      lines.push(heading);
      continue;
    }

    if (CLAUSE_LINE_PATTERN.test(line)) {
      if (LIST_LINE_PATTERN.test(previous ?? '')) {
        lines.push('');
      }
      clause = { bulletIndent: null };
      lines.push(line);
      continue;
    }

    if (clause && endsClause(line)) {
      clause = null;
    }

    lines.push(
      clause ? dedentClauseBullet(line, clause) : keepSignatureLine(line),
    );
  }

  return lines.join('\n');
}
