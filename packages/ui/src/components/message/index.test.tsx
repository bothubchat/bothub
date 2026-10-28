/* eslint-disable max-classes-per-file */
import React, { memo, useState } from 'react';
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { getTgMarkdown } from '@/ui/utils';
import { MessageContextValue, MessageProvider, useMessage } from './context';
import { Message, MessageCopyEventHandler } from '.';

const providerRenders = vi.hoisted(() => ({ count: 0 }));

// Every render of Message renders MessageProvider, so it counts Message renders.
vi.mock('./context', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./context')>();
  const MessageProvider: typeof actual.MessageProvider = (props) => {
    providerRenders.count += 1;
    return actual.MessageProvider(props);
  };
  return { ...actual, MessageProvider };
});

class ClipboardItemMock {
  constructor(readonly items: Record<string, Blob | Promise<Blob>>) {}
}

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

// jsdom's Blob has no text()
const readCopied = async (data: unknown, type = 'text/plain') => {
  const blob = await (data as ClipboardItemMock[])[0].items[type];
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsText(blob);
  });
};

describe('MessageProvider', () => {
  afterEach(() => {
    cleanup();
  });

  test('keeps the context value while the props stay the same', () => {
    const values: MessageContextValue[] = [];
    const Consumer = memo(() => {
      values.push(useMessage());
      return null;
    });
    const onCopy = () => {};
    let rerender: () => void = () => {};
    let setTyping: (typing: boolean) => void = () => {};

    const Parent = () => {
      const [, setCount] = useState(0);
      const [typing, set] = useState(false);
      rerender = () => setCount((count) => count + 1);
      setTyping = set;
      return (
        <MessageProvider
          variant="assistant"
          color="default"
          typing={typing}
          onCopy={onCopy}
        >
          <Consumer />
        </MessageProvider>
      );
    };

    customRender(<Parent />);
    act(() => rerender());

    expect(values).toHaveLength(1);

    act(() => setTyping(true));

    expect(values).toHaveLength(2);
    expect(values[1]).toEqual({
      variant: 'assistant',
      color: 'default',
      typing: true,
      onCopy,
      onCodeCopy: undefined,
    });
  });
});

describe('Message', () => {
  let setProps: (props: {
    content: string;
    onCopy: MessageCopyEventHandler;
  }) => void;

  const renderMessage = (content: string, onCopy: MessageCopyEventHandler) => {
    const Parent = () => {
      const [props, set] = useState({ content, onCopy });
      setProps = set;
      return (
        <Message
          variant="assistant"
          content={props.content}
          copyTgText="Copy for Telegram"
          copyTooltipLabel="Copy"
          onCopy={props.onCopy}
        >
          {props.content}
        </Message>
      );
    };

    return customRender(<Parent />);
  };

  beforeEach(() => {
    vi.stubGlobal('ClipboardItem', ClipboardItemMock);
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('does not rerender when the parent rerenders with the same props', () => {
    let rerender: () => void = () => {};
    const onCopy = () => {};

    const Parent = () => {
      const [, setCount] = useState(0);
      rerender = () => setCount((count) => count + 1);
      return (
        <Message
          variant="assistant"
          content="Hello"
          onCopy={onCopy}
        >
          Hello
        </Message>
      );
    };

    customRender(<Parent />);
    const renders = providerRenders.count;
    act(() => rerender());

    expect(providerRenders.count).toBe(renders);
  });

  test('copies the current content for Telegram with the latest onCopy', async () => {
    const firstOnCopy = vi.fn();
    const lastOnCopy = vi.fn();
    const { container } = renderMessage('first', firstOnCopy);

    act(() => setProps({ content: 'second **bold**', onCopy: lastOnCopy }));
    fireEvent.click(container.querySelector('[aria-haspopup="menu"]')!);
    fireEvent.click(screen.getByText('Copy for Telegram'));

    expect(firstOnCopy).not.toHaveBeenCalled();
    expect(lastOnCopy).toHaveBeenCalledTimes(1);
    expect(await readCopied(lastOnCopy.mock.calls[0][0])).toBe(
      getTgMarkdown('second **bold**'),
    );
  });

  test('copies the current content as rich text with the latest onCopy', async () => {
    const firstOnCopy = vi.fn();
    const lastOnCopy = vi.fn();
    renderMessage('first', firstOnCopy);

    act(() => setProps({ content: 'second **bold**', onCopy: lastOnCopy }));
    fireEvent.click(screen.getByLabelText('Copy'));

    // Within the click: Safari does not allow writing after a network wait.
    expect(lastOnCopy).toHaveBeenCalledTimes(1);
    const [data] = lastOnCopy.mock.calls[0];
    expect(firstOnCopy).not.toHaveBeenCalled();
    expect(await readCopied(data)).toBe('second **bold**');
    expect(await readCopied(data, 'text/html')).toContain(
      '<strong>bold</strong>',
    );
  });

  test('builds the rich text HTML synchronously once marked is loaded', async () => {
    const onCopy = vi.fn();
    renderMessage('**first**', onCopy);

    fireEvent.click(screen.getByLabelText('Copy'));
    // Waits for marked if it was not loaded yet.
    await readCopied(onCopy.mock.calls[0][0], 'text/html');

    fireEvent.click(screen.getByLabelText('Copy'));
    const [item] = onCopy.mock.calls[1][0] as ClipboardItemMock[];
    expect(item.items['text/html']).toBeInstanceOf(Blob);
    expect(await readCopied([item], 'text/html')).toContain(
      '<strong>first</strong>',
    );
  });

  test('does not copy the previous content after it was cleared', () => {
    const onCopy = vi.fn();
    const { container } = renderMessage('first', onCopy);

    act(() => setProps({ content: '', onCopy }));
    fireEvent.click(container.querySelector('[aria-haspopup="menu"]')!);
    fireEvent.click(screen.getByText('Copy for Telegram'));

    expect(onCopy).not.toHaveBeenCalled();
  });
});

describe('Message while an answer streams', () => {
  const contextValues: MessageContextValue[] = [];

  const ContextProbe = memo(() => {
    contextValues.push(useMessage());
    return null;
  });

  // The client passes a new `onCopy` with every streamed chunk.
  const renderAnswer = (content: string, onCopy = () => {}) => (
    <Message
      variant="assistant"
      typing
      content={content}
      onCopy={onCopy}
    >
      <ContextProbe />
      {content}
    </Message>
  );

  beforeEach(() => {
    contextValues.length = 0;
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    vi.stubGlobal('ClipboardItem', ClipboardItemMock);
    // jsdom does not implement innerText.
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      configurable: true,
      get(this: HTMLElement) {
        return this.textContent;
      },
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    delete (HTMLElement.prototype as Partial<HTMLElement>).innerText;
  });

  test('keeps the context value', () => {
    const { rerender } = render(renderAnswer('Пер'), {
      wrapper: TestProvider,
    });

    rerender(renderAnswer('Первый чанк'));
    rerender(renderAnswer('Первый чанк и второй'));

    expect(contextValues).toHaveLength(1);
  });

  test('copies plain text with the latest onCopy', () => {
    const firstOnCopy = vi.fn();
    const latestOnCopy = vi.fn();
    const { rerender } = render(renderAnswer('Пер', firstOnCopy), {
      wrapper: TestProvider,
    });

    rerender(renderAnswer('Первый чанк', latestOnCopy));
    act(() => {
      contextValues[0].onCopy?.();
    });

    expect(firstOnCopy).not.toHaveBeenCalled();
    expect(latestOnCopy).toHaveBeenCalledTimes(1);
  });
});
