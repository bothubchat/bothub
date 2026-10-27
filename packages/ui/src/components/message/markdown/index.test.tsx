import React, { useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { describe, test, expect, afterEach, beforeAll, vi } from 'vitest';
import { act, cleanup, waitFor } from '@testing-library/react';
import { createLongAnswer, customRender } from '@/ui/tests';
import { MessageProvider } from '../context';
import { MessageMarkdown } from '.';
import { getMarkdownBlocks } from './blocks';
import { messageMarkdownComponents } from './markdown-components';
import { getMarkdownPlugins } from './useMarkdownPlugins';
import { loadMath } from './math-loader';
import { normalizeMessageMarkdown } from './utils';

vi.mock('react-markdown', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-markdown')>();
  return { ...actual, default: vi.fn(actual.default) };
});

const markdownRenders = vi.mocked(ReactMarkdown);

// The whole text parsed at once, as before rendering by blocks.
const SingleDocument = ({ text }: { text: string }) => {
  const { remarkPlugins, rehypePlugins } = getMarkdownPlugins(true);
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={messageMarkdownComponents}
    >
      {normalizeMessageMarkdown(text)}
    </ReactMarkdown>
  );
};

// react-markdown puts line breaks between blocks, they are not rendered.
const getMarkup = (element: Element | null | undefined) =>
  element?.innerHTML.replace(/>\n</g, '><');

const renderMarkdown = (text: string, typing = false) =>
  customRender(
    <MessageProvider
      variant="assistant"
      color="default"
      typing={typing}
    >
      <MessageMarkdown>{text}</MessageMarkdown>
    </MessageProvider>,
  );

describe('MessageMarkdown', () => {
  // Formulas render from the first render once their chunk is loaded.
  beforeAll(async () => {
    await loadMath();
  });

  afterEach(() => {
    cleanup();
  });

  test('keeps rendered nodes between streaming updates', () => {
    let setText: (text: string) => void = () => {};

    const Streaming = () => {
      const [text, set] = useState('Первый абзац\n\nВторой');
      setText = set;
      return (
        <MessageProvider
          variant="assistant"
          color="default"
          typing
        >
          <MessageMarkdown components={{}}>{text}</MessageMarkdown>
        </MessageProvider>
      );
    };

    const { container } = customRender(<Streaming />);
    const paragraph = container.querySelector('p');

    act(() => setText('Первый абзац\n\nВторой абзац растёт'));

    expect(container.querySelector('p')).toBe(paragraph);
  });

  // The first block may end on the blank line inside the list.
  const listAfter = (element: string) =>
    `${'а'.repeat(1480)}\n\n${element}\n2. Найдём корни.\n\n3. Проверим ответ.\n\nКонец.`;

  test.each([
    ['a long message', createLongAnswer(6000, true)],
    ['a list right after a formula', listAfter('$$\nD = b^2 - 4ac\n$$')],
    ['a list right after a table', listAfter('| a |\n|---|\n| 1 |')],
  ])('renders %s by blocks the same as one document', (_, text) => {
    const { container } = renderMarkdown(text);
    const { container: expected } = customRender(
      <MessageProvider
        variant="assistant"
        color="default"
        typing={false}
      >
        <div>
          <SingleDocument text={text} />
        </div>
      </MessageProvider>,
    );

    expect(
      getMarkdownBlocks(normalizeMessageMarkdown(text)).length,
    ).toBeGreaterThan(1);
    expect(getMarkup(container.firstElementChild?.firstElementChild)).toBe(
      getMarkup(expected.firstElementChild),
    );
  });

  test('parses only the last block of a long message on a new chunk', () => {
    const answer = createLongAnswer(10_000);
    let setText: (text: string) => void = () => {};

    const Streaming = () => {
      const [text, set] = useState(answer.slice(0, -60));
      setText = set;
      return (
        <MessageProvider
          variant="assistant"
          color="default"
          typing
        >
          <MessageMarkdown>{text}</MessageMarkdown>
        </MessageProvider>
      );
    };

    customRender(<Streaming />);
    markdownRenders.mockClear();

    act(() => setText(answer));

    const blocks = getMarkdownBlocks(answer);
    expect(blocks.length).toBeGreaterThan(3);
    expect(markdownRenders).toHaveBeenCalledTimes(1);
    expect(markdownRenders.mock.calls[0][0].children).toBe(
      blocks[blocks.length - 1],
    );
  });

  test('does not render complete blocks again for equal components', () => {
    const buttons = vi.fn(() => null);
    const text = `![Схема](https://bothub.chat/a.png)\n\n${'а'.repeat(1500)}\n\nЕщё`;
    let setText: (text: string) => void = () => {};

    const Streaming = () => {
      const [value, set] = useState(text);
      setText = set;
      return (
        <MessageProvider
          variant="assistant"
          color="default"
          typing
        >
          {/* A new object on every render, as callers usually pass it. */}
          <MessageMarkdown components={{ image: { buttons } }}>
            {value}
          </MessageMarkdown>
        </MessageProvider>
      );
    };

    customRender(<Streaming />);
    buttons.mockClear();

    act(() => setText(`${text} один абзац`));

    expect(getMarkdownBlocks(text)).toHaveLength(2);
    expect(buttons).not.toHaveBeenCalled();
  });

  test('renders <br> inside table cells as line breaks', () => {
    const { container } = renderMarkdown('| a |\n|---|\n| 1<br>2 |');

    expect(container.querySelector('td br')).not.toBeNull();
    expect(container.textContent).not.toContain('<br>');
  });

  test('keeps table column alignment', () => {
    const { container } = renderMarkdown('| a |\n|:-:|\n| 1 |');

    expect(container.querySelector('td')?.style.textAlign).toBe('center');
  });

  test('renders block-level cite tags', () => {
    const { container } = renderMarkdown('<cite>\nИсточник\n</cite>');

    expect(container.querySelector('cite')?.textContent).toBe('Источник');
    expect(container.textContent).not.toContain('<cite>');
  });

  test('opens external links safely and keeps anchor links in place', () => {
    const { container } = renderMarkdown(
      '[site](https://bothub.chat) и [^1]\n\n[^1]: сноска',
    );
    const [external, footnote] = Array.from(container.querySelectorAll('a'));

    expect(external.getAttribute('target')).toBe('_blank');
    expect(external.getAttribute('rel')).toBe('noopener noreferrer');
    expect(footnote.getAttribute('target')).toBeNull();
    expect(container.textContent).not.toContain('Footnotes');
  });

  test('does not render currency in document blocks as math', () => {
    const { container } = renderMarkdown('```doc\nЦена $10, скидка $5\n```');

    expect(container.querySelector('.katex')).toBeNull();
    expect(container.textContent).toContain('Цена $10, скидка $5');
  });

  const unfinishedFormula = 'Текст\n\n$$\n\\frac{a}{b} + \\left(';

  test('hides an unfinished formula while typing', () => {
    const { container } = renderMarkdown(unfinishedFormula, true);

    expect(container.querySelector('.katex-error')).toBeNull();
    expect(container.textContent).not.toContain('\\left(');
  });

  test('renders the formula as is once typing is finished', () => {
    const { container } = renderMarkdown(unfinishedFormula);

    expect(container.querySelector('.katex-error')).not.toBeNull();
  });

  // Small blocks are joined into parts of at least 1500 characters.
  const longParagraph = 'Длинный абзац текста. '.repeat(70);

  test('does not render finished blocks again while typing', () => {
    const renderHeading = vi.fn(({ children }) => <h1>{children}</h1>);
    const componentsOverride: Components = { h1: renderHeading };
    const finished = `# Заголовок\n\n${longParagraph}`;
    let setText: (text: string) => void = () => {};

    const Streaming = () => {
      const [text, set] = useState(`${finished}\n\nВторой абзац`);
      setText = set;
      return (
        <MessageProvider
          variant="assistant"
          color="default"
          typing
        >
          <MessageMarkdown componentsOverride={componentsOverride}>
            {text}
          </MessageMarkdown>
        </MessageProvider>
      );
    };

    const { container } = customRender(<Streaming />);
    act(() => setText(`${finished}\n\nВторой абзац растёт`));
    act(() => setText(`${finished}\n\nВторой абзац растёт\n\nТретий`));

    expect(renderHeading).toHaveBeenCalledTimes(1);
    expect(container.querySelectorAll('p')).toHaveLength(3);
  });

  test('highlights code as complete once its fence is closed', async () => {
    const code = `\`\`\`\n${'<div class="a">\n  <span>text</span>\n</div>\n'.repeat(30)}`;
    const getCode = (container: HTMLElement) =>
      container.querySelector('[data-codeblock] code');

    const typed = renderMarkdown(code, true).container;
    await waitFor(() => expect(getCode(typed)?.className).toContain('hljs'));
    // The code may still change: its language is not guessed yet.
    expect(getCode(typed)?.className).not.toContain('language-');
    cleanup();

    const closed = renderMarkdown(`${code}\`\`\``, true).container;
    await waitFor(() =>
      expect(getCode(closed)?.className).toContain('language-xml'),
    );
  });

  // Unlabeled code: code with a language is highlighted while it is typed.
  test('highlights streamed code once its fence is closed', async () => {
    let setText: (text: string) => void = () => {};

    const Streaming = () => {
      const [text, set] = useState('Пример:\n\n```\nconst a = 1;');
      setText = set;
      return (
        <MessageProvider
          variant="assistant"
          color="default"
          typing
        >
          <MessageMarkdown>{text}</MessageMarkdown>
        </MessageProvider>
      );
    };

    const { container } = customRender(<Streaming />);
    // Highlighting is a lazy chunk.
    await waitFor(() => {
      expect(container.querySelector('code.hljs')).not.toBeNull();
    });

    expect(container.querySelector('[class^="hljs-"]')).toBeNull();

    act(() => setText('Пример:\n\n```\nconst a = 1;\n```'));

    expect(container.querySelector('[class^="hljs-"]')).not.toBeNull();
  });

  const nextCodeTyped =
    'Шаг 1:\n\n```\nconst a = 1;\n```\n\nШаг 2:\n\n```\nconst b';

  test('highlights closed code while the next code is typed', async () => {
    let setText: (text: string) => void = () => {};

    const Streaming = () => {
      const [text, set] = useState('Шаг 1:\n\n```\nconst a = 1;');
      setText = set;
      return (
        <MessageProvider
          variant="assistant"
          color="default"
          typing
        >
          <MessageMarkdown>{text}</MessageMarkdown>
        </MessageProvider>
      );
    };

    const { container } = customRender(<Streaming />);
    await waitFor(() => {
      expect(container.querySelector('code.hljs')).not.toBeNull();
    });

    // One update closes the first code and opens the next one.
    act(() => setText(nextCodeTyped));

    const [closed, typed] = container.querySelectorAll('code.hljs');
    expect(closed.querySelector('[class^="hljs-"]')).not.toBeNull();
    expect(typed.querySelector('[class^="hljs-"]')).toBeNull();
  });

  test('highlights closed code of a message opened while it is typed', async () => {
    const { container } = renderMarkdown(nextCodeTyped, true);

    await waitFor(() => {
      expect(container.querySelectorAll('code.hljs')).toHaveLength(2);
    });

    const [closed, typed] = container.querySelectorAll('code.hljs');
    expect(closed.querySelector('[class^="hljs-"]')).not.toBeNull();
    expect(typed.querySelector('[class^="hljs-"]')).toBeNull();
  });
});
