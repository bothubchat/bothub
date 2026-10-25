import React, { memo, useState } from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { act, cleanup } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MessageContextValue, MessageProvider, useMessage } from './context';

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
