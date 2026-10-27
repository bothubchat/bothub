import React, { useState } from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import hljs from 'highlight.js/lib/core';
import { TestProvider } from '@/ui/tests';
import { MessageMultilineCode } from '../index';
import { Highlight, TYPING_HIGHLIGHT_INTERVAL } from './highlight';
import { HIGHLIGHT_LANGUAGES } from './languages';
import { MessageCodeTypingContext } from './typing';

const tsCode =
  'const value: number = compute(1);\nfunction f(x: number) {\n  return x * 2;\n}';
const htmlCode = '<div class="a">\n  <span>text</span>\n</div>';
const pythonCode =
  'import os\n\ndef main():\n    print("hi")\n\nif __name__ == "__main__":\n    main()\n';

// What `hljs.highlightElement` did with the element before.
const highlightElement = (code: string, className: string) => {
  const pre = document.createElement('pre');
  const element = document.createElement('code');
  pre.appendChild(element);
  element.className = className;
  element.textContent = code;
  hljs.highlightElement(element);
  return element;
};

let setState: (state: { code: string; typing: boolean }) => void = () => {};

const Streaming = ({
  initialCode,
  className,
}: {
  initialCode: string;
  className: string;
}) => {
  const [state, set] = useState({ code: initialCode, typing: true });
  setState = set;
  return (
    <MessageCodeTypingContext.Provider value={state.typing}>
      <Highlight className={className}>{state.code}</Highlight>
    </MessageCodeTypingContext.Provider>
  );
};

const getCode = (container: HTMLElement) =>
  container.querySelector('code') as HTMLElement;

describe('Highlight', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test.each([
    ['labeled', tsCode, 'sc-a b ts'],
    ['language class', pythonCode, 'language-python'],
    ['unlabeled', htmlCode, 'sc-a b'],
    ['unknown language', tsCode, 'language-unknownlang'],
    ['no highlight', tsCode, 'nohighlight'],
  ])(
    'renders the same markup as highlightElement: %s',
    (_, code, className) => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      const expected = highlightElement(code, className);
      const element = getCode(
        render(<Highlight className={className}>{code}</Highlight>).container,
      );

      expect(element.innerHTML).toBe(expected.innerHTML);
      expect(element.className).toBe(expected.className);
    },
  );

  test('does not keep a guessed language for new code', () => {
    const { container, rerender } = render(<Highlight>{htmlCode}</Highlight>);
    expect(getCode(container).className).toBe('hljs language-xml');

    rerender(<Highlight>{pythonCode}</Highlight>);
    const guessed = hljs.highlightAuto(pythonCode).language;
    expect(guessed).not.toBe('xml');
    expect(getCode(container).className).toBe(`hljs language-${guessed}`);
  });

  test('throttles highlighting while the message is typed', () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(hljs, 'highlight');
    const { container } = render(
      <Streaming
        initialCode="const a = 1;"
        className="ts"
      />,
    );
    const callsAfterMount = spy.mock.calls.length;
    const keyword = container.querySelector('.hljs-keyword');
    expect(keyword).not.toBeNull();

    const chunks = Array.from(
      { length: 10 },
      (_, i) => `\nconst b${i} = ${i};`,
    );
    const code = chunks.reduce((typed, chunk) => {
      const next = typed + chunk;
      act(() => setState({ code: next, typing: true }));
      // The new text is shown right away, without waiting for highlighting.
      expect(getCode(container).textContent).toBe(next);
      return next;
    }, 'const a = 1;');
    expect(spy.mock.calls.length).toBe(callsAfterMount);
    // The highlighted part is not parsed again for every chunk.
    expect(container.querySelector('.hljs-keyword')).toBe(keyword);

    act(() => {
      vi.advanceTimersByTime(TYPING_HIGHLIGHT_INTERVAL);
    });
    expect(spy.mock.calls.length).toBe(callsAfterMount + 1);
    expect(getCode(container).textContent).toBe(code);
    expect(getCode(container).querySelectorAll('.hljs-keyword')).toHaveLength(
      11,
    );

    // The last highlight is reused once typing ends.
    act(() => setState({ code, typing: false }));
    expect(spy.mock.calls.length).toBe(callsAfterMount + 1);
  });

  test('does not guess the language of an unlabeled block while typing', () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(hljs, 'highlightAuto');
    const { container } = render(
      <Streaming
        initialCode={htmlCode}
        className=""
      />,
    );

    act(() => setState({ code: `${htmlCode}\n<p>more</p>`, typing: true }));
    act(() => {
      vi.advanceTimersByTime(TYPING_HIGHLIGHT_INTERVAL * 4);
    });
    expect(spy).not.toHaveBeenCalled();
    expect(getCode(container).textContent).toBe(`${htmlCode}\n<p>more</p>`);

    act(() => setState({ code: `${htmlCode}\n<p>more</p>`, typing: false }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(getCode(container).className).toBe('hljs language-xml');
  });

  test('reuses the highlighted code when a block is mounted again', () => {
    const code = `${tsCode}\n// remount`;
    render(<Highlight className="ts">{code}</Highlight>);
    cleanup();

    const spy = vi.spyOn(hljs, 'highlight');
    const { container } = render(<Highlight className="ts">{code}</Highlight>);

    expect(spy).not.toHaveBeenCalled();
    expect(container.querySelector('.hljs-keyword')).not.toBeNull();
  });

  test('keeps the block mounted when the theme changes', async () => {
    const Themed = ({ mode }: { mode: 'dark' | 'light' }) => (
      <TestProvider theme={{ mode }}>
        <MessageMultilineCode className="language-ts">
          {tsCode}
        </MessageMultilineCode>
      </TestProvider>
    );
    const { container, findByText, rerender } = render(<Themed mode="dark" />);
    await findByText('function');
    const element = getCode(container);
    const { className } = element;
    const spy = vi.spyOn(hljs, 'highlight');

    rerender(<Themed mode="light" />);

    expect(getCode(container)).toBe(element);
    expect(element.className).not.toBe(className);
    expect(element.className).toContain('hljs language-typescript');
    expect(spy).not.toHaveBeenCalled();
  });

  test('shows unlabeled code that is still typed as plain text', () => {
    const { container, rerender } = render(
      <MessageCodeTypingContext.Provider value>
        <Highlight>const a</Highlight>
      </MessageCodeTypingContext.Provider>,
    );
    const code = getCode(container);

    rerender(
      <MessageCodeTypingContext.Provider value>
        <Highlight>const a = 1;</Highlight>
      </MessageCodeTypingContext.Provider>,
    );

    expect(code.textContent).toBe('const a = 1;');
    expect(code.children).toHaveLength(0);
    expect(code.classList).toContain('hljs');
  });

  test('highlights code whose start had no recognizable language', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { container, rerender } = render(<Highlight>{'{'}</Highlight>);

    rerender(
      <Highlight>{'{\n  "name": "bothub",\n  "private": true\n}\n'}</Highlight>,
    );

    expect(getCode(container).className).toContain('language-json');
    expect(log).not.toHaveBeenCalled();
  });
});

describe('Highlight languages', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('loads only the languages of the list', () => {
    expect(hljs.listLanguages().sort()).toEqual(
      Object.keys(HIGHLIGHT_LANGUAGES).sort(),
    );
  });

  test.each([
    ['js', 'javascript'],
    ['jsx', 'javascript'],
    ['ts', 'typescript'],
    ['tsx', 'typescript'],
    ['py', 'python'],
    ['sh', 'bash'],
    ['zsh', 'bash'],
    ['console', 'shell'],
    ['html', 'xml'],
    ['svg', 'xml'],
    ['h', 'c'],
    ['hpp', 'cpp'],
    ['cs', 'csharp'],
    ['golang', 'go'],
    ['rs', 'rust'],
    ['rb', 'ruby'],
    ['kt', 'kotlin'],
    ['yml', 'yaml'],
    ['md', 'markdown'],
    ['docker', 'dockerfile'],
    ['patch', 'diff'],
    ['text', 'plaintext'],
  ])('highlights %s as %s', (alias, language) => {
    const { container } = render(
      <Highlight className={`language-${alias}`}>x = 1</Highlight>,
    );

    expect(getCode(container).className).toBe(
      `language-${alias} hljs language-${language}`,
    );
  });

  test.each(['lua', 'perl', 'not-a-language'])(
    'shows %s code as plain text',
    (language) => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      const code = 'local a = "<b>" -- comment';
      const { container } = render(
        <Highlight className={`language-${language}`}>{code}</Highlight>,
      );
      const element = getCode(container);

      expect(element.textContent).toBe(code);
      expect(element.children).toHaveLength(0);
      expect(element.className).toBe(`language-${language}`);
      expect(warn).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
    },
  );
});
