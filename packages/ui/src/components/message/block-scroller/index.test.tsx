import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { TestProvider } from '@/ui/tests';
import { MessageBlockScroller } from '.';

class ResizeObserverStub {
  static instances: ResizeObserverStub[] = [];

  callback: ResizeObserverCallback;

  observed: Element[] = [];

  disconnected = false;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    ResizeObserverStub.instances.push(this);
  }

  observe(element: Element) {
    this.observed.push(element);
  }

  unobserve() {}

  disconnect() {
    this.disconnected = true;
  }

  // Браузер вызывает колбэк после layout, если размер изменился
  notify() {
    act(() => {
      this.callback([], this as unknown as ResizeObserver);
    });
  }
}

const renderScroller = (children = <p>Wide table</p>) =>
  render(
    <MessageBlockScroller color="#000000">{children}</MessageBlockScroller>,
    { wrapper: TestProvider },
  );

const getScroller = () =>
  screen.getByText('Wide table').parentElement as HTMLElement;

// В jsdom нет layout: ширина пузыря 300 px, ширину содержимого задаёт тест
const setLayout = (
  scroller: HTMLElement,
  { scrollWidth, scrollLeft = 0 }: { scrollWidth: number; scrollLeft?: number },
) => {
  Object.defineProperties(scroller, {
    clientWidth: { configurable: true, value: 300 },
    scrollWidth: { configurable: true, value: scrollWidth },
  });
  scroller.scrollLeft = scrollLeft;
};

// Тени — соседний со скроллером блок, в нём только видимые тени
const getShadows = (scroller: HTMLElement) => scroller.nextElementSibling;

describe('MessageBlockScroller', () => {
  beforeEach(() => {
    ResizeObserverStub.instances = [];
    vi.stubGlobal('ResizeObserver', ResizeObserverStub);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('mounts the shadows only while the content overflows', () => {
    renderScroller();
    const scroller = getScroller();
    const [resizeObserver] = ResizeObserverStub.instances;

    setLayout(scroller, { scrollWidth: 300 });
    resizeObserver.notify();
    expect(getShadows(scroller)).toBeNull();

    setLayout(scroller, { scrollWidth: 600 });
    resizeObserver.notify();
    expect(getShadows(scroller)?.childElementCount).toBe(1);

    setLayout(scroller, { scrollWidth: 600, scrollLeft: 150 });
    fireEvent.scroll(scroller);
    expect(getShadows(scroller)?.childElementCount).toBe(2);

    setLayout(scroller, { scrollWidth: 300 });
    resizeObserver.notify();
    expect(getShadows(scroller)).toBeNull();
  });

  test('keeps the content mounted when it starts to overflow', () => {
    renderScroller();
    const content = screen.getByText('Wide table');

    setLayout(getScroller(), { scrollWidth: 600 });
    ResizeObserverStub.instances[0].notify();

    expect(screen.getByText('Wide table')).toBe(content);
  });

  test('observes the scroller with one ResizeObserver until unmount', () => {
    const { rerender, unmount } = renderScroller();
    rerender(
      <MessageBlockScroller color="#000000">
        <p>Wide table</p>
        <p>Next row</p>
      </MessageBlockScroller>,
    );

    expect(ResizeObserverStub.instances).toHaveLength(1);
    const [resizeObserver] = ResizeObserverStub.instances;
    expect(resizeObserver.observed).toEqual([getScroller()]);

    unmount();
    expect(resizeObserver.disconnected).toBe(true);
  });
});
