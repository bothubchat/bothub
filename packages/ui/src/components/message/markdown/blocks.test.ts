import { describe, expect, test } from 'vitest';
import { createLongAnswer } from '@/ui/tests/long-answer';
import { MIN_MARKDOWN_BLOCK_LENGTH, splitMarkdownBlocks } from './blocks';

const FILLER = 'а'.repeat(MIN_MARKDOWN_BLOCK_LENGTH);

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
    const answer = createLongAnswer(10_000, true);
    const blocks = splitMarkdownBlocks(answer);

    for (let length = 60; length < answer.length; length += 60) {
      const complete = splitMarkdownBlocks(answer.slice(0, length)).slice(
        0,
        -1,
      );

      expect(complete).toEqual(blocks.slice(0, complete.length));
    }
  });

  test.each([
    ['a list', `- ${FILLER}\n\n- второй пункт`],
    ['a code block', `\`\`\`\n${FILLER}\n\nвторая часть\n\`\`\``],
    ['a formula', `$$\n${FILLER}\n\nвторая часть\n$$`],
    ['a cite', `<cite>\n${FILLER}\n\nвторая часть\n</cite>`],
  ])('does not split %s with blank lines inside', (_, element) => {
    expect(splitMarkdownBlocks(`${element}\n\nПосле`)).toEqual([
      `${element}\n\n`,
      'После',
    ]);
  });

  test.each([
    ['footnotes', `Текст[^1]\n\n${FILLER}\n\n[^1]: Сноска`],
    ['reference links', `[Ссылка][site]\n\n${FILLER}\n\n[site]: https://a.b`],
  ])('keeps text with %s in one block', (_, text) => {
    expect(splitMarkdownBlocks(text)).toEqual([text]);
  });
});
