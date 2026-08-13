const CODE_SEGMENT_PATTERN = /(```[\s\S]*?```|`[^`\n]*`)/g;
const DISPLAY_MATH_PATTERN = /(\$\$[\s\S]*?\$\$)/g;
const MATH_OPERATOR_PATTERN = /[=^_\\{}]/;

function isCodeSegment(segment: string): boolean {
  return segment.startsWith('```') || segment.startsWith('`');
}

function isDisplayMathSegment(segment: string): boolean {
  return segment.startsWith('$$') && segment.endsWith('$$');
}

function isWhitespace(char: string | undefined): boolean {
  return char === ' ' || char === '\n' || char === '\t' || char === '\r';
}

function isDigit(char: string | undefined): boolean {
  return char !== undefined && char >= '0' && char <= '9';
}

function findInlineMathClose(content: string, from: number): number {
  for (let index = from; index < content.length; index += 1) {
    if (content[index] !== '$' || content[index - 1] === '\\') {
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

function looksLikeCurrencySpan(body: string): boolean {
  if (MATH_OPERATOR_PATTERN.test(body) || /^\d+[^\d\s.,$]/.test(body)) {
    return false;
  }

  return /^\d[\d.,]*\s/.test(body);
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
  let result = '';

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const isCurrencyCandidate =
      char === '$' &&
      content[index - 1] !== '\\' &&
      isDigit(content[index + 1]);

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
