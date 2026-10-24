import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, waitFor } from '@testing-library/react';
import { createLongAnswer, customRender } from '@/ui/tests';
import { MessageProvider } from '../context';
import { MessageMarkdown } from '.';
import { splitMarkdownBlocks } from './blocks';
import { messageMarkdownComponents } from './markdown-components';
import { useMarkdownPlugins } from './useMarkdownPlugins';
import { normalizeMessageMarkdown } from './utils';

vi.mock('react-markdown', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-markdown')>();
  return { ...actual, default: vi.fn(actual.default) };
});

const markdownRenders = vi.mocked(ReactMarkdown);

// The whole text parsed at once, as before rendering by blocks.
const SingleDocument = ({ text }: { text: string }) => {
  const { remarkPlugins, rehypePlugins } = useMarkdownPlugins();
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

  test('renders a long message by blocks the same as one document', () => {
    const answer = createLongAnswer(6000, true);
    const { container } = renderMarkdown(answer);
    const { container: expected } = customRender(
      <MessageProvider
        variant="assistant"
        color="default"
        typing={false}
      >
        <div>
          <SingleDocument text={answer} />
        </div>
      </MessageProvider>,
    );

    expect(container.querySelectorAll('h2')).toHaveLength(
      expected.querySelectorAll('h2').length,
    );
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

    const blocks = splitMarkdownBlocks(answer);
    expect(blocks.length).toBeGreaterThan(3);
    expect(markdownRenders).toHaveBeenCalledTimes(1);
    expect(markdownRenders.mock.calls[0][0].children).toBe(
      blocks[blocks.length - 1],
    );
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

  test('highlights streamed code once its fence is closed', async () => {
    let setText: (text: string) => void = () => {};

    const Streaming = () => {
      const [text, set] = useState('Пример:\n\n```ts\nconst a = 1;');
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

    expect(container.querySelector('.hljs-keyword')).toBeNull();

    act(() => setText('Пример:\n\n```ts\nconst a = 1;\n```'));

    expect(container.querySelector('.hljs-keyword')?.textContent).toBe('const');
  });
});
