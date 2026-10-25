/* eslint-disable max-classes-per-file */
import React, { memo, useState } from 'react';
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { getTgMarkdown } from '@/ui/utils';
import { MessageContextValue, MessageProvider, useMessage } from './context';
import { Message, MessageCopyEventHandler } from '.';

class ClipboardItemMock {
  constructor(readonly items: Record<string, Blob>) {}
}

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

// jsdom's Blob has no text()
const readCopied = (data: unknown, type = 'text/plain') =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsText((data as ClipboardItemMock[])[0].items[type]);
  });

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

    await waitFor(() => expect(lastOnCopy).toHaveBeenCalledTimes(1));
    const [data] = lastOnCopy.mock.calls[0];
    expect(firstOnCopy).not.toHaveBeenCalled();
    expect(await readCopied(data)).toBe('second **bold**');
    expect(await readCopied(data, 'text/html')).toContain(
      '<strong>bold</strong>',
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
