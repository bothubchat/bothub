import { expect, test, describe } from 'vitest';
import { normalizeMessageMarkdown } from './utils';

describe('normalizeMessageMarkdown', () => {
  test('escapes currency dollars so they are not treated as math', () => {
    expect(normalizeMessageMarkdown('Price is $10')).toBe('Price is \\$10');
    expect(normalizeMessageMarkdown('Costs $5 and $20')).toBe(
      'Costs \\$5 and \\$20',
    );
  });

  test('keeps inline math dollars', () => {
    expect(normalizeMessageMarkdown('Value $x$ here')).toBe('Value $x$ here');
  });

  test('keeps display math blocks', () => {
    const input = 'Before\n$$\na + b\n$$\nAfter';
    expect(normalizeMessageMarkdown(input)).toBe(input);
  });

  test('does not escape dollars inside inline code', () => {
    expect(normalizeMessageMarkdown('Use `$10` in code')).toBe(
      'Use `$10` in code',
    );
  });

  test('does not escape dollars inside fenced code', () => {
    const input = '```\nconst price = $10\n```';
    expect(normalizeMessageMarkdown(input)).toBe(input);
  });

  test('converts escaped and latex math delimiters', () => {
    expect(normalizeMessageMarkdown('\\(a + b\\)')).toBe('$a + b$');
    expect(normalizeMessageMarkdown('\\[a + b\\]')).toBe('$$\na + b\n$$');
    expect(normalizeMessageMarkdown('\\$x\\$')).toBe('$x$');
    expect(normalizeMessageMarkdown(['\\$', '$a + b\\$', '$'].join(''))).toBe(
      '$$\na + b\n$$',
    );
  });

  test('does not rewrite latex delimiters inside code', () => {
    const input = '`\\(a + b\\)`';
    expect(normalizeMessageMarkdown(input)).toBe(input);
  });

  test('escapes currency next to escaped dollars correctly', () => {
    expect(normalizeMessageMarkdown('Total: \\$ already and $12 more')).toBe(
      'Total: \\$ already and \\$12 more',
    );
  });

  test('keeps inline math that starts with a digit', () => {
    expect(normalizeMessageMarkdown('$3k^2 = n^2$')).toBe('$3k^2 = n^2$');
    expect(normalizeMessageMarkdown('$3 = \\frac{m^2}{n^2}$')).toBe(
      '$3 = \\frac{m^2}{n^2}$',
    );
    expect(normalizeMessageMarkdown('$2 \\cdot (3n^2)$')).toBe(
      '$2 \\cdot (3n^2)$',
    );
    expect(normalizeMessageMarkdown('$100$')).toBe('$100$');
  });

  test('does not merge adjacent digit-starting math with surrounding text', () => {
    const input = [
      'Разделим обе части на 3:',
      '$3k^2 = n^2$',
      'Или, переписав наоборот:',
      '$n^2 = 3k^2$',
    ].join('\n');

    expect(normalizeMessageMarkdown(input)).toBe(input);
  });

  test('escapes currency before a later math span', () => {
    expect(normalizeMessageMarkdown('Price is $10 and value $x$')).toBe(
      'Price is \\$10 and value $x$',
    );
  });
});
