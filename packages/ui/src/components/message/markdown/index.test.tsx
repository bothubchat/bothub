import React, { useState } from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { act, cleanup } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MessageProvider } from '../context';
import { MessageMarkdown } from '.';

const renderMarkdown = (text: string) =>
  customRender(
    <MessageProvider
      variant="assistant"
      color="default"
      typing={false}
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
});
