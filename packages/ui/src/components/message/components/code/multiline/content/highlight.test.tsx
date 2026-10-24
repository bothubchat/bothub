import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { Highlight } from './highlight';
import { MessageCodeTypingContext } from './typing';

const renderCode = (code: string, typing = false) => (
  <MessageCodeTypingContext.Provider value={typing}>
    <Highlight className="ts">{code}</Highlight>
  </MessageCodeTypingContext.Provider>
);

describe('Highlight', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('shows code that is still typed as plain text', () => {
    const { container, rerender } = render(renderCode('const a', true));
    const code = container.querySelector('code');

    rerender(renderCode('const a = 1;', true));

    expect(code?.textContent).toBe('const a = 1;');
    expect(code?.children).toHaveLength(0);
    expect(code?.classList).toContain('hljs');
  });

  test('highlights code once it is complete', () => {
    const { container, rerender } = render(renderCode('const a = 1;', true));

    rerender(renderCode('const a = 1;'));

    expect(container.querySelector('.hljs-keyword')?.textContent).toBe('const');
  });

  test('keeps highlighted code while other code is typed', () => {
    const { container, rerender } = render(renderCode('const a = 1;'));
    const keyword = container.querySelector('.hljs-keyword');

    rerender(renderCode('const a = 1;', true));

    expect(container.querySelector('.hljs-keyword')).toBe(keyword);
  });

  // Code without a language: hljs guesses it from the code it gets.
  test('does not keep the language guessed from previous code', () => {
    const { container, rerender } = render(<Highlight>x</Highlight>);

    rerender(
      <Highlight>{'def total(items):\n    return sum(items) + 1\n'}</Highlight>,
    );

    const { className } = container.querySelector('code') ?? {};
    expect(className).toContain('language-python');
    expect(className).not.toContain('language-css');
  });

  test('highlights code whose start had no recognizable language', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { container, rerender } = render(<Highlight>{'{'}</Highlight>);

    rerender(
      <Highlight>{'{\n  "name": "bothub",\n  "private": true\n}\n'}</Highlight>,
    );

    expect(container.querySelector('code')?.className).toContain(
      'language-json',
    );
    expect(log).not.toHaveBeenCalled();
  });
});
