import React, { memo } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { TestProvider } from '@/ui/tests';
import { Message, MessageContextValue, useMessage } from '.';

class ResizeObserverStub {
  observe() {}

  unobserve() {}

  disconnect() {}
}

const ClipboardItemStub = vi.fn();

describe('Message', () => {
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
    vi.stubGlobal('ResizeObserver', ResizeObserverStub);
    vi.stubGlobal('ClipboardItem', ClipboardItemStub);
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

  test('keeps the context value while an answer streams', () => {
    const { rerender } = render(renderAnswer('Пер'), {
      wrapper: TestProvider,
    });

    rerender(renderAnswer('Первый чанк'));
    rerender(renderAnswer('Первый чанк и второй'));

    expect(contextValues).toHaveLength(1);
  });

  test('copies with the latest onCopy', () => {
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
