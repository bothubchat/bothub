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

  test('escapes currency when a later formula contains operators', () => {
    expect(normalizeMessageMarkdown('Цена $50 и формула $x = y$ тут')).toBe(
      'Цена \\$50 и формула $x = y$ тут',
    );
  });

  test('converts single-variable latex inline math', () => {
    expect(normalizeMessageMarkdown('где \\( x \\) — число')).toBe(
      'где $x$ — число',
    );
  });

  test('keeps escaped currency pairs as text', () => {
    const input = 'От \\$5 - \\$10';
    expect(normalizeMessageMarkdown(input)).toBe(input);
  });

  test('does not escape inline math converted from latex delimiters', () => {
    expect(normalizeMessageMarkdown('\\(3 + x\\)')).toBe('$3 + x$');
  });

  test('does not touch tilde and long backtick fences', () => {
    const tilde = '~~~php\n$a = $5;\n~~~';
    expect(normalizeMessageMarkdown(tilde)).toBe(tilde);

    const long = '````md\n```\n$10\n```\n$20\n````';
    expect(normalizeMessageMarkdown(long)).toBe(long);
  });

  test('does not touch unclosed fenced code while streaming', () => {
    const input = 'Код:\n```bash\nx=`date` echo $10 \\(\\d+\\)\n';
    expect(normalizeMessageMarkdown(input)).toBe(input);
  });

  test('does not touch fenced code inside list items', () => {
    const input = '1. Шаг\n   ```bash\n   echo $10\n   ```\n2. Цена $5';
    expect(normalizeMessageMarkdown(input)).toBe(
      '1. Шаг\n   ```bash\n   echo $10\n   ```\n2. Цена \\$5',
    );
  });

  test('handles multi-backtick inline code', () => {
    const input = 'Код ``a ` $10`` и цена $5';
    expect(normalizeMessageMarkdown(input)).toBe('Код ``a ` $10`` и цена \\$5');
  });

  test('keeps display math inside list items indented', () => {
    expect(
      normalizeMessageMarkdown('1. Шаг:\n   \\[\n   x^2 = 1\n   \\]\n2. Далее'),
    ).toBe('1. Шаг:\n   $$\n   x^2 = 1\n   $$\n2. Далее');
    expect(normalizeMessageMarkdown('- \\[x^2 = 1\\]')).toBe(
      '- $$\n  x^2 = 1\n  $$',
    );
    expect(normalizeMessageMarkdown('> \\[x^2 = 1\\]')).toBe(
      '> $$\n> x^2 = 1\n> $$',
    );
  });

  test('renders mid-line display math inline', () => {
    expect(
      normalizeMessageMarkdown('Формула: \\[x^2 + 1\\] и дальше\n\nАбзац'),
    ).toBe('Формула: $\\displaystyle x^2 + 1$ и дальше\n\nАбзац');
    expect(normalizeMessageMarkdown('\\[x^2 + 1\\] — формула')).toBe(
      '$\\displaystyle x^2 + 1$ — формула',
    );
  });

  test('keeps escaped brackets that are not math', () => {
    const input = 'Ссылка \\[1\\] и \\[примечание\\]';
    expect(normalizeMessageMarkdown(input)).toBe(input);
  });
});

describe('normalizeMessageMarkdown while typing', () => {
  const typing = (content: string) =>
    normalizeMessageMarkdown(content, { typing: true });

  test('hides an unclosed display math block', () => {
    expect(typing('Текст\n\n$$\n\\frac{a}{b} + \\left(')).toBe('Текст\n\n');
  });

  test('hides unclosed explicit delimiters', () => {
    expect(typing('Формула:\n\\[\n\\frac{a}{')).toBe('Формула:\n');
    expect(typing('Формула \\(\\frac{1}{')).toBe('Формула ');
    expect(typing('Формула \\$$\\frac{1}{')).toBe('Формула ');
  });

  test('hides unclosed inline math', () => {
    expect(typing('Значит $x^{2')).toBe('Значит ');
    expect(typing('Значит $')).toBe('Значит ');
  });

  test('hides a trailing backslash that may start a delimiter', () => {
    expect(typing('Значит \\')).toBe('Значит ');
  });

  test('keeps closed formulas and text after them', () => {
    const input = 'Готово $x^2$ и $$\na + b\n$$\nдальше \\(y\\) текст';
    expect(typing(input)).toBe(normalizeMessageMarkdown(input));
  });

  test('keeps currency', () => {
    expect(typing('Цена $10')).toBe('Цена \\$10');
    expect(typing('От \\$5 до')).toBe('От \\$5 до');
  });

  test('limits a stray inline dollar to its line', () => {
    expect(typing('Переменная $HOME\nи дальше')).toBe(
      'Переменная $HOME\nи дальше',
    );
  });

  test('keeps escaped brackets that are not math', () => {
    expect(typing('Ссылка \\[1\\] и текст')).toBe('Ссылка \\[1\\] и текст');
  });

  test('ignores dollars inside code', () => {
    expect(typing('Код `$x` и\n```bash\necho $HOME\n')).toBe(
      'Код `$x` и\n```bash\necho $HOME\n',
    );
  });

  test('does not trim anything once the message is complete', () => {
    const input = 'Текст\n\n$$\n\\frac{a}{b';
    expect(normalizeMessageMarkdown(input)).toBe(input);
  });
});
