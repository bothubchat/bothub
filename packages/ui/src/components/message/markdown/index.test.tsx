import React, { useState } from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, waitFor } from '@testing-library/react';
import type { Components } from 'react-markdown';
import { customRender } from '@/ui/tests';
import { MessageProvider } from '../context';
import { MessageMarkdown } from '.';

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

  // Small blocks are joined into parts of at least 1000 characters.
  const longParagraph = 'Длинный абзац текста. '.repeat(50);

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

  test('highlights code of a finished block while typing', async () => {
    const code = `\`\`\`\n${'<div class="a">\n  <span>text</span>\n</div>\n'.repeat(30)}\`\`\``;
    const getCode = (container: HTMLElement) =>
      container.querySelector('[data-codeblock] code');

    const last = renderMarkdown(code, true).container;
    await waitFor(() => expect(getCode(last)?.className).toContain('hljs'));
    // The block may still change: its language is not guessed yet.
    expect(getCode(last)?.className).not.toContain('language-');
    cleanup();

    const finished = renderMarkdown(`${code}\n\nТекст`, true).container;
    await waitFor(() =>
      expect(getCode(finished)?.className).toContain('language-xml'),
    );
  });
});
