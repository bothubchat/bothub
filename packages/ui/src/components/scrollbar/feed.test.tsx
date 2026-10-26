import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { Scrollbar } from '.';

let resizeObservers = 0;

class ResizeObserverStub {
  constructor() {
    resizeObservers += 1;
  }

  observe() {}

  unobserve() {}

  disconnect() {}
}

const getScrollbar = () =>
  screen.getAllByText(/Message/)[0].parentElement as HTMLElement;

const scrollTo = (element: HTMLElement, scrollTop: number) => {
  element.scrollTop = scrollTop;
  fireEvent.scroll(element);
};

// В jsdom нет layout: высота окна 100 px, каждое сообщение — 100 px,
// scrollTop ограничен, как в браузере
const mockLayout = (element: HTMLElement) => {
  let scrollTop = 0;
  Object.defineProperties(element, {
    clientHeight: { configurable: true, value: 100 },
    scrollHeight: {
      configurable: true,
      get: () => element.children.length * 100,
    },
    scrollTop: {
      configurable: true,
      get: () => scrollTop,
      set: (value: number) => {
        scrollTop = Math.min(value, element.scrollHeight - 100);
      },
    },
  });
};

const Feed = ({ count }: { count: number }) => (
  <TestProvider>
    <Scrollbar
      withStickyBottom
      defaultStickyBottom
    >
      {Array.from({ length: count }, (_, index) => (
        <p key={index}>Message {index}</p>
      ))}
    </Scrollbar>
  </TestProvider>
);

describe('Scrollbar', () => {
  beforeEach(() => {
    resizeObservers = 0;
    vi.stubGlobal('ResizeObserver', ResizeObserverStub);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('does not re-create its observers on scroll', () => {
    customRender(
      <Scrollbar>
        <p>Message</p>
      </Scrollbar>,
    );
    const scrollbar = getScrollbar();
    const mountedObservers = resizeObservers;

    scrollTo(scrollbar, 100);
    scrollTo(scrollbar, 40);

    expect(resizeObservers).toBe(mountedObservers);
  });

  test('passes the previous scroll position to onScroll', () => {
    const onScroll = vi.fn();
    customRender(
      <Scrollbar onScroll={onScroll}>
        <p>Message</p>
      </Scrollbar>,
    );
    const scrollbar = getScrollbar();

    scrollTo(scrollbar, 100);
    expect(onScroll).toHaveBeenLastCalledWith(
      expect.objectContaining({ previousScrollTop: 0 }),
    );

    scrollTo(scrollbar, 40);
    expect(onScroll).toHaveBeenLastCalledWith(
      expect.objectContaining({ previousScrollTop: 100 }),
    );
  });

  test('follows new content only while it is scrolled to the end', async () => {
    const { rerender } = render(<Feed count={1} />);
    // Первый перерендер пересоздаёт наблюдатели: в их зависимостях
    // scrollbarRef.current меняется с null на элемент
    rerender(<Feed count={1} />);
    const scrollbar = getScrollbar();
    mockLayout(scrollbar);

    await act(async () => {
      rerender(<Feed count={3} />);
    });
    await waitFor(() => expect(scrollbar.scrollTop).toBe(200));
    // Браузер сообщает о докрутке событием scroll
    fireEvent.scroll(scrollbar);

    scrollTo(scrollbar, 50);
    await act(async () => {
      rerender(<Feed count={5} />);
    });
    expect(scrollbar.scrollTop).toBe(50);

    scrollTo(scrollbar, 400);
    await act(async () => {
      rerender(<Feed count={6} />);
    });
    await waitFor(() => expect(scrollbar.scrollTop).toBe(500));
  });
});
