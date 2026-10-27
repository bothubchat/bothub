import React from 'react';
import { describe, test, expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import type { Root } from 'hast';
import { customRender } from '@/ui/tests';
import { MessageProvider } from '../context';
import { splitMarkdownBlocks } from './blocks';
import { MarkdownBlocks } from './markdown-blocks';
import {
  MessageMarkdownComponentsProvider,
  messageMarkdownComponents,
} from './markdown-components';
import { getMarkdownPlugins } from './useMarkdownPlugins';
import { loadMath } from './math-loader';
import { normalizeMessageMarkdown } from './utils';

const remarkRehypeOptions = { clobberPrefix: 'test-' };

const Markdown = ({ blocks }: { blocks: string[] }) => {
  const { remarkPlugins, rehypePlugins } = getMarkdownPlugins(true);
  return (
    <MarkdownBlocks
      blocks={blocks}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      remarkRehypeOptions={remarkRehypeOptions}
      components={messageMarkdownComponents}
    />
  );
};

const renderHtml = (blocks: string[], typing: boolean) => {
  const { container, unmount } = customRender(
    <MessageProvider
      variant="assistant"
      color="default"
      typing={typing}
    >
      <MessageMarkdownComponentsProvider value={{}}>
        <Markdown blocks={blocks} />
      </MessageMarkdownComponentsProvider>
    </MessageProvider>,
  );
  const html = container.innerHTML;
  unmount();
  return html;
};

const expectSameMarkup = (text: string, typing = false) => {
  const markdown = normalizeMessageMarkdown(text, { typing });
  const blocks = splitMarkdownBlocks(markdown);

  expect(blocks.join('')).toBe(markdown);
  expect(renderHtml(blocks, typing), markdown).toBe(
    renderHtml([markdown], typing),
  );
};

const corpus = [
  '# Заголовок\n\nАбзац с **жирным**, *курсивом*, `кодом` и [ссылкой](https://bothub.chat).\n\n## Второй\n\nЕщё абзац\nс мягким переносом.',
  '- один\n- два\n  - вложенный\n\n    продолжение\n- три\n\nТекст после списка\n\n1. первый\n2. второй\n\n3. третий после пустой строки\n\n10. другой номер',
  'Вступление\n\n1. шаг\n\n   описание шага\n\n2. шаг\n\n- маркер\n\n* другой маркер\n\nКонец',
  '| a | b |\n|:-|-:|\n| 1 | 2<br>3 |\n| x | y |\n\nПосле таблицы\n\n| c |\n|---|\n| z |',
  'Код:\n\n```ts\nconst a = 1;\n\n\nfunction f() {}\n```\n\nПосле кода\n\n~~~\ntilde\n\n~~~\n\nТекст',
  'Начало\n\n```python\ndef f():\n\n    return 1\n\nprint(f())',
  'Формула\n\n$$\n\\frac{a}{b}\n\n= c\n$$\n\nИ ещё $x^2$ inline\n\n$$\ny = 2\n$$',
  '> цитата\n> продолжение\n\n> вторая цитата\n\nlazy\n> третья\nленивая строка',
  '<cite>\nИсточник\n</cite>\n\nТекст\n\n<cite>\n\nАбзац внутри\n\n</cite>\n\nПосле',
  'Строка<br>перенос\n\n<br>\n\nАбзац\n\n<div>\nблок\n</div>\n\nПосле html\n\n<!-- комментарий\n\nс пустой строкой -->\n\nКонец',
  '<div>в начале</div>\n\nТекст',
  'Текст\n\n<div>в конце</div>',
  'Текст со сноской[^1]\n\nАбзац\n\n[^1]: Сноска',
  'Ссылка [на сайт][site]\n\nАбзац\n\n[site]: https://bothub.chat',
  '    отступ\n\n    код\n\nтекст\n\n---\n\nSetext\n===\n\n***\n\n* * *\n\nконец',
  '- [ ] задача\n- [x] сделано\n\nТекст ~~зачёркнут~~ и https://bothub.chat',
  'Документ:\n\n```doc\n# Заголовок\n\nТекст $10\n```\n\nХвост',
  '1. пункт\n   ```js\n   code\n\n   more\n   ```\n\nтекст\n\n```\nfence\n```',
  '1. пункт\n   ```js\n   незакрытый\n\nтекст\n\n```\nвнутри\n\nещё\n```\n\nконец',
  '<pre>\n\nraw\n\n</pre>\n\nТекст\n\n<script>\n\n</script>\n\nКонец',
  'Цена $10 и $20\n\n$x = \\frac{1}{2}$\n\n\\[\na^2\n\\]\n\nКонец',
  'Абзац\n\n- список\n\nабзац\n\n- новый список\n\n  1. вложенный\n\nконец',
  'Картинка\n\n![alt](https://example.com/a.png)\n\nПосле',
  '\n\n\nПустые строки в начале\n\n\n\nи в середине\n\n\n',
  'Заголовок\n\n> - список в цитате\n\n- список\n\n> цитата',
];

// Parts of random documents: constructs with blank lines inside, list items
// that may continue, raw HTML, fences inside list items and so on.
const randomParts = [
  '# Заголовок',
  'Абзац текста',
  'Абзац\nс переносом',
  '- пункт',
  '- пункт\n- второй',
  '  - вложенный',
  '1. номер',
  '2) номер',
  '1.',
  '   продолжение',
  '    отступ',
  '\tтаб',
  '```js\ncode\n\nmore\n```',
  '~~~\nx\n~~~',
  '``` a`b',
  '  ```\n  code\n\n  ```',
  '    ```',
  '$$\na\n\nb\n$$',
  '$$ x\ny\n$$',
  'a $x$ b',
  '> цитата',
  '> цитата\n>\n> ещё',
  '> ```\n> x',
  '| a | b |\n|---|---|\n| 1 | 2 |',
  '---',
  '* * *',
  'Setext\n===',
  '<div>\nблок\n</div>',
  '<span>x</span>',
  '<!--\n\n-->',
  '<pre>\n\n</pre>',
  '<cite>',
  '</cite>',
  '<br>',
  'Цена $5',
  '\\[\nx^2\n\\]',
  '- [ ] task',
  '- ```\n  y\n\n  z\n  ```',
  '1. a\n   ```\n   x\n    ```',
  '1. a\n\n    ```\n\n    y',
  '- a\n  - b\n    ```\n    c\n    ```',
  '1. a\n   $$\n   x\n   $$',
  '- <!--\n\n  -->',
  '1. a\n\n   b\n\n2. c',
];
// Rare: they leave a construct open until the end of the text.
const unclosedParts = ['```', '<!--', '$$', '1. пункт\n   ```\n   код'];
const separators = ['\n', '\n\n', '\n\n', '\n\n\n', '\n  \n'];

// Seeded, so a failure is reproducible.
const createRandomDocuments = (count: number, seed: number): string[] => {
  let state = seed;
  const random = () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
  const pick = (items: string[]) => items[Math.floor(random() * items.length)];

  return Array.from({ length: count }, () => {
    const length = 2 + Math.floor(random() * 10);
    let text = pick(randomParts);
    for (let i = 1; i < length; i++) {
      text +=
        pick(separators) +
        (random() < 0.05 ? pick(unclosedParts) : pick(randomParts));
    }
    return text;
  });
};

describe('splitMarkdownBlocks', () => {
  // Blocks with formulas render the same as the whole text.
  beforeAll(async () => {
    await loadMath();
  });

  afterEach(() => {
    cleanup();
  });

  test('splits at blank lines before unindented blocks', () => {
    // Blank lines start the next block: finished blocks do not change when
    // they are typed.
    expect(splitMarkdownBlocks('# a\n\nb\nc\n\n- d\n- e\n\n\nf')).toEqual([
      '# a\n',
      '\nb\nc\n',
      '\n- d\n- e\n',
      '\n\nf',
    ]);
  });

  test('keeps fences, math and html blocks with blank lines together', () => {
    expect(splitMarkdownBlocks('```\na\n\nb\n```\n\nc')).toEqual([
      '```\na\n\nb\n```\n',
      '\nc',
    ]);
    expect(splitMarkdownBlocks('$$\na\n\nb\n$$\n\nc')).toEqual([
      '$$\na\n\nb\n$$\n',
      '\nc',
    ]);
    expect(splitMarkdownBlocks('a\n\n<!--\n\n-->\n\nc')).toEqual([
      'a\n\n<!--\n\n-->\n',
      '\nc',
    ]);
  });

  test('keeps list items separated by blank lines together', () => {
    expect(splitMarkdownBlocks('1. a\n\n2. b\n\nc')).toEqual([
      '1. a\n\n2. b\n',
      '\nc',
    ]);
  });

  test('keeps the rest together when a list item may end a fence', () => {
    const text = 'a\n\n1. b\n   ```\n   c\n\n```\nd\n\ne';
    expect(splitMarkdownBlocks(text)).toEqual([
      'a\n',
      '\n1. b\n   ```\n   c\n\n```\nd\n\ne',
    ]);
  });

  test('does not split text with definitions', () => {
    const text = 'a [b]\n\nc\n\n[b]: https://bothub.chat';
    expect(splitMarkdownBlocks(text)).toEqual([text]);
  });

  test.each(corpus)('renders the same markup in blocks: %j', (text) => {
    expectSameMarkup(text);
    expectSameMarkup(text, true);
  });

  test('renders the same markup for every streamed prefix', () => {
    const text = corpus.slice(0, 12).join('\n\n');

    for (let length = 1; length <= text.length; length += 37) {
      expectSameMarkup(text.slice(0, length), true);
    }
  }, 60000);

  test('renders the same markup for random documents', () => {
    createRandomDocuments(200, 7).forEach((text, index) => {
      expectSameMarkup(text, index % 2 === 0);
    });
  }, 60000);

  // The same check on the syntax tree is much faster than rendering.
  test('builds the same tree for many random documents', () => {
    const { remarkPlugins, rehypePlugins } = getMarkdownPlugins(true);
    const processor = unified()
      .use(remarkParse)
      .use(remarkPlugins)
      .use(remarkRehype, remarkRehypeOptions)
      .use(rehypePlugins)
      .freeze();

    const toTree = (markdown: string) =>
      JSON.stringify(
        (processor.runSync(processor.parse(markdown)) as Root).children,
        (key, value) => (key === 'position' ? undefined : value),
      );

    createRandomDocuments(1500, 13).forEach((text, index) => {
      const markdown = normalizeMessageMarkdown(text, {
        typing: index % 2 === 0,
      });
      const blocks = splitMarkdownBlocks(markdown);
      const joined = blocks
        .map((block) => toTree(block).slice(1, -1))
        .filter(Boolean)
        .join(',{"type":"text","value":"\\n"},');

      expect(blocks.join('')).toBe(markdown);
      expect(`[${joined}]`, markdown).toBe(toTree(markdown));
    });
  }, 120000);
});
