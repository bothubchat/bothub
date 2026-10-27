import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { customRender, TestProvider } from '@/ui/tests';
import { MessageProvider } from '../context';
import { MessageMarkdown } from '.';
import { getLoadedMath, loadMath, mayContainMath } from './math-loader';

// The module state is per test file: nothing loads the chunk before these tests.

const Markdown = ({ children }: { children: string }) => (
  <MessageProvider
    variant="assistant"
    color="default"
    typing={false}
  >
    <MessageMarkdown>{children}</MessageMarkdown>
  </MessageProvider>
);

describe('mayContainMath', () => {
  test.each([
    ['inline $x$ formula', true],
    ['$$\nx\n$$', true],
    ['escaped backslash before a dollar \\\\$x$', true],
    ['```math\nx^2\n```', true],
    ['- ~~~ math\n  x\n  ~~~', true],
    ['plain text', false],
    ['escaped currency \\$10 and \\$20', false],
    ['```ts\nconst price = 1;\n```', false],
  ])('%j: %s', (markdown, expected) => {
    expect(mayContainMath(markdown)).toBe(expected);
  });
});

describe('formula chunk', () => {
  afterEach(() => {
    cleanup();
  });

  test('is not loaded for text without formulas', async () => {
    customRender(<Markdown>{'**Bold** text, price \\$10'}</Markdown>);
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });

    expect(getLoadedMath()).toBeNull();
  });

  test('server render keeps the TeX as text', () => {
    const html = renderToString(
      <TestProvider>
        <Markdown>Formula $x^2$</Markdown>
      </TestProvider>,
    );

    expect(html).toContain('$x^2$');
    expect(html).not.toContain('katex');
  });

  test('is loaded once and renders formulas with one more commit', async () => {
    const commits = { math: 0, text: 0 };
    const { container } = customRender(
      <>
        <React.Profiler
          id="math"
          onRender={() => {
            commits.math += 1;
          }}
        >
          <Markdown>Formula $x^2$ here</Markdown>
        </React.Profiler>
        <React.Profiler
          id="text"
          onRender={() => {
            commits.text += 1;
          }}
        >
          <Markdown>No formulas</Markdown>
        </React.Profiler>
      </>,
    );

    expect(container.querySelector('.katex')).toBeNull();
    expect(container.textContent).toContain('$x^2$');
    const mounted = { ...commits };

    await waitFor(() => {
      expect(container.querySelector('.katex')).not.toBeNull();
    });

    expect(commits.math - mounted.math).toBe(1);
    expect(commits.text - mounted.text).toBe(0);
    expect(loadMath()).toBe(loadMath());
    expect(await loadMath()).toBe(getLoadedMath());
  });

  test('renders formulas from the first render once loaded', () => {
    const { container } = customRender(<Markdown>Then $y$</Markdown>);

    expect(container.querySelector('.katex')).not.toBeNull();
  });
});
