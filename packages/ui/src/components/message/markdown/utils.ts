const CODE_SEGMENT_PATTERN = /(```[\s\S]*?```|`[^`\n]*`)/g;
const DISPLAY_MATH_PATTERN = /(\$\$[\s\S]*?\$\$)/g;
const CURRENCY_DOLLAR_PATTERN = /(^|[^\\])\$(?=\d)/g;

function isCodeSegment(segment: string): boolean {
  return segment.startsWith('```') || segment.startsWith('`');
}

function isDisplayMathSegment(segment: string): boolean {
  return segment.startsWith('$$') && segment.endsWith('$$');
}

function normalizeExplicitMathDelimiters(content: string): string {
  return content
    .replace(
      /\\\$\$([\s\S]*?)\\\$\$/g,
      (_, expression: string) => `$$\n${expression.trim()}\n$$`,
    )
    .replace(
      /\\\[([\s\S]*?)\\]/g,
      (_, expression: string) => `$$\n${expression.trim()}\n$$`,
    )
    .replace(
      /\\\((.+?)\\\)/g,
      (_, expression: string) => `$${expression.trim()}$`,
    )
    .replace(
      /\\\$(.+?)\\\$/g,
      (_, expression: string) => `$${expression.trim()}$`,
    );
}

function normalizeInlineDollars(content: string): string {
  return content.replace(
    CURRENCY_DOLLAR_PATTERN,
    (_, prefix: string) => `${prefix}\\$`,
  );
}

function normalizeTextSegment(content: string): string {
  return normalizeExplicitMathDelimiters(content)
    .split(DISPLAY_MATH_PATTERN)
    .map((segment) =>
      isDisplayMathSegment(segment) ? segment : normalizeInlineDollars(segment),
    )
    .join('');
}

export function normalizeMessageMarkdown(content: string): string {
  return content
    .split(CODE_SEGMENT_PATTERN)
    .map((segment) =>
      isCodeSegment(segment) ? segment : normalizeTextSegment(segment),
    )
    .join('');
}
