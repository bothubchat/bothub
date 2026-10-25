import { describe, expect, test } from 'vitest';
import { createLongAnswer } from '@/ui/tests/long-answer';
import { MIN_MARKDOWN_BLOCK_LENGTH, splitMarkdownBlocks } from './blocks';

const FILLER = 'а'.repeat(MIN_MARKDOWN_BLOCK_LENGTH);
const FORMULA = `$$\n${FILLER}\n\nвторая часть\n$$`;
const CITE = `<cite>\n\n${FILLER}\n\nвторая часть\n\n</cite>`;

describe('splitMarkdownBlocks', () => {
  test('keeps a short text in one block', () => {
    const text = 'Абзац\n\n- пункт\n\nЕщё абзац';

    expect(splitMarkdownBlocks(text)).toEqual([text]);
  });

  test('splits a long answer on blank lines without losing text', () => {
    const answer = createLongAnswer(20_000);
    const blocks = splitMarkdownBlocks(answer);

    expect(blocks.length).toBeGreaterThan(5);
    expect(blocks.join('')).toBe(answer);
    blocks.slice(0, -1).forEach((block) => {
      expect(block.length).toBeGreaterThanOrEqual(MIN_MARKDOWN_BLOCK_LENGTH);
      expect(block).toMatch(/\n\n$/);
    });
  });

  test('does not change complete blocks while the text grows', () => {
    const answer = createLongAnswer(3000, true);
    let complete: string[] = [];

    // Character by character: a chunk may end anywhere, also in `1. ` of a list.
    for (let length = 1; length <= answer.length; length++) {
      const blocks = splitMarkdownBlocks(answer.slice(0, length));

      expect(blocks.slice(0, complete.length)).toEqual(complete);
      complete = blocks.slice(0, -1);
    }

    expect(complete.length).toBeGreaterThan(1);
  });

  test.each([
    ['a list', `- ${FILLER}\n\n- второй пункт`],
    ['a code block', `\`\`\`\n${FILLER}\n\nвторая часть\n\`\`\``],
    ['a formula', FORMULA],
    ['a formula with a longer fence', `$$$$\n${FILLER}\n\n$$\n$$$$`],
    ['a cite', CITE],
  ])('does not split %s with blank lines inside', (_, element) => {
    expect(splitMarkdownBlocks(`${element}\n\nПосле`)).toEqual([
      `${element}\n\n`,
      'После',
    ]);
  });

  test.each([
    ['`$$` in inline code', 'В bash `$$` — это PID.', FORMULA],
    ['`$$` in code of a list', '- Пример:\n\n  ```bash\n  $$\n  ```', FORMULA],
    ['`</cite>` in inline code', 'Тег `</cite>` закрывает цитату.', CITE],
  ])('does not split a formula or a cite after %s', (_, code, element) => {
    const text = `${code}\n\n${element}\n\n`;

    expect(splitMarkdownBlocks(`${text}После`)).toEqual([text, 'После']);
  });

  // marked sees no list there: a paragraph goes on after `$$`, a table row
  // after a table.
  test.each([
    ['a formula', `$$\n${FILLER}\n$$\n2. Найдём корни.`],
    ['a table', `| a |\n|---|\n| ${FILLER} |\n2. Найдём корни.`],
  ])('does not split a list that starts right after %s', (_, element) => {
    ['3. Проверим ответ.', '   Подставим корни.'].forEach((continuation) => {
      const list = `${element}\n\n${continuation}\n\n`;

      expect(splitMarkdownBlocks(`${list}После`)).toEqual([list, 'После']);
    });
  });

  test.each([
    ['footnotes', 'Текст[^1]', '[^1]: Сноска'],
    ['a footnote with spaces', 'Текст[^1]', '[^1]: Сноска тут'],
    ['reference links', '[Ссылка][site]', '[site]: https://a.b'],
    ['an escaped bracket', '[Ссылка][a\\]b]', '[a\\]b]: https://a.b'],
    ['a label on two lines', '[Ссылка][a\nb]', '[a\nb]: https://a.b'],
    ['a definition in a list', '[Ссылка][a]', '- [a]: https://a.b'],
    ['a definition in a quote', '[Ссылка][a]', '> [a]: https://a.b'],
  ])('keeps text with %s in one block', (_, reference, definition) => {
    const text = `${reference}\n\n${FILLER}\n\n${definition}`;

    expect(splitMarkdownBlocks(text)).toEqual([text]);
  });

  test.each([
    ['a code block', '```ts\ntype Dict = {\n  [key: string]: string;\n};\n```'],
    ['code in a list', '- Тип:\n  ```ts\n  [K in keyof T]: boolean;\n  ```'],
  ])('splits text with %s that looks like a definition', (_, code) => {
    expect(splitMarkdownBlocks(`${code}\n\n${FILLER}\n\nПосле`)).toEqual([
      `${code}\n\n${FILLER}\n\n`,
      'После',
    ]);
  });
});
