import { createRef } from 'react';
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Messages, MessagesRef } from '.';

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

describe('Messages', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('exposes the scroll element through the ref', () => {
    const ref = createRef<MessagesRef>();
    customRender(
      <Messages ref={ref}>
        <div>Hello</div>
      </Messages>,
    );

    expect(ref.current?.element?.contains(screen.getByText('Hello'))).toBe(
      true,
    );
  });

  test('scrolls to the bottom through the ref', () => {
    const ref = createRef<MessagesRef>();
    customRender(
      <Messages ref={ref}>
        <div>Hello</div>
      </Messages>,
    );
    const element = ref.current!.element as HTMLElement;
    Object.defineProperty(element, 'scrollHeight', { value: 500 });

    ref.current!.setScroll();

    expect(element.scrollTop).toBe(500);
  });
});
