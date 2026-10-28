import { createRef, Profiler } from 'react';
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Scrollbar, ScrollbarRef, ScrollbarShadow } from '.';

interface Metrics {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
}

const mockMetrics = (el: Element, initial: Partial<Metrics> = {}) => {
  const metrics: Metrics = {
    scrollTop: 0,
    scrollHeight: 2000,
    clientHeight: 500,
    scrollLeft: 0,
    scrollWidth: 500,
    clientWidth: 500,
    ...initial,
  };
  const clamp = (key: 'scrollTop' | 'scrollLeft', value: number) =>
    key === 'scrollTop'
      ? Math.max(
          0,
          Math.min(value, metrics.scrollHeight - metrics.clientHeight),
        )
      : Math.max(0, Math.min(value, metrics.scrollWidth - metrics.clientWidth));

  (Object.keys(metrics) as (keyof Metrics)[]).forEach((key) => {
    Object.defineProperty(el, key, {
      configurable: true,
      get: () => metrics[key],
      set: (value: number) => {
        metrics[key] =
          key === 'scrollTop' || key === 'scrollLeft'
            ? clamp(key, value)
            : value;
      },
    });
  });

  return metrics;
};

const scrollTo = (el: Element, metrics: Metrics, scrollTop: number) => {
  metrics.scrollTop = scrollTop;
  fireEvent.scroll(el);
};

describe('scrollbar', () => {
  const observers = { resize: 0, mutation: 0 };

  beforeEach(() => {
    observers.resize = 0;
    observers.mutation = 0;
    // A function, not an arrow: vitest 4 mocks of arrows cannot be constructed
    function ResizeObserverMock() {
      observers.resize++;

      return { observe() {}, unobserve() {}, disconnect() {} };
    }
    vi.stubGlobal('ResizeObserver', vi.fn(ResizeObserverMock));
    const OriginalMutationObserver = MutationObserver;
    vi.stubGlobal(
      'MutationObserver',
      class extends OriginalMutationObserver {
        constructor(callback: MutationCallback) {
          super(callback);
          observers.mutation++;
        }
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test('subscribes once and calls onScroll once per scroll event', () => {
    const onScroll = vi.fn();
    let commits = 0;
    const { container } = customRender(
      <Profiler
        id="scrollbar"
        onRender={() => {
          commits++;
        }}
      >
        <Scrollbar
          withStickyBottom
          defaultStickyBottom
          onScroll={onScroll}
        >
          <div>content</div>
        </Scrollbar>
      </Profiler>,
    );
    const el = container.firstElementChild as HTMLElement;
    const metrics = mockMetrics(el);
    const resizeObservers = observers.resize;
    const mutationObservers = observers.mutation;
    const windowAdd = vi.spyOn(window, 'addEventListener');
    onScroll.mockClear();
    commits = 0;

    for (let index = 1; index <= 20; index++) {
      act(() => scrollTo(el, metrics, index * 10));
    }

    expect(observers.resize).toBe(resizeObservers);
    expect(observers.mutation).toBe(mutationObservers);
    expect(windowAdd).not.toHaveBeenCalled();
    expect(onScroll).toHaveBeenCalledTimes(20);
    expect(onScroll).toHaveBeenLastCalledWith({
      isTop: true,
      isBottom: true,
      previousScrollTop: 190,
    });
    expect(commits).toBe(0);
  });

  test('rerenders with shadows only when an edge changes', () => {
    let commits = 0;
    const { container } = customRender(
      <Profiler
        id="scrollbar"
        onRender={() => {
          commits++;
        }}
      >
        <Scrollbar
          scrollShadows={{
            top: <ScrollbarShadow side="top" />,
            bottom: <ScrollbarShadow side="bottom" />,
          }}
        >
          <div>content</div>
        </Scrollbar>
      </Profiler>,
    );
    const el = container.firstElementChild?.firstElementChild as HTMLElement;
    const metrics = mockMetrics(el);
    commits = 0;

    act(() => scrollTo(el, metrics, 10));
    const afterFirstScroll = commits;
    for (let index = 2; index <= 20; index++) {
      act(() => scrollTo(el, metrics, index * 10));
    }

    expect(afterFirstScroll).toBeGreaterThan(0);
    expect(commits).toBe(afterFirstScroll);
  });

  test('keeps the bottom sticky until the user scrolls up', async () => {
    const { container } = customRender(
      <Scrollbar
        withStickyBottom
        defaultStickyBottom
      >
        <div>content</div>
      </Scrollbar>,
    );
    const el = container.firstElementChild as HTMLElement;
    const metrics = mockMetrics(el);
    const appendContent = async () => {
      await act(async () => {
        el.appendChild(document.createElement('div'));
      });
    };

    await appendContent();
    expect(metrics.scrollTop).toBe(1500);
    act(() => fireEvent.scroll(el));

    act(() => scrollTo(el, metrics, 1000));
    metrics.scrollHeight = 3000;
    await appendContent();
    expect(metrics.scrollTop).toBe(1000);

    act(() => scrollTo(el, metrics, 2500));
    metrics.scrollHeight = 4000;
    await appendContent();
    expect(metrics.scrollTop).toBe(3500);
  });

  test('turns the vertical wheel into horizontal scroll', () => {
    const { container } = customRender(
      <Scrollbar isHorizontalScrollbar>
        <div>content</div>
      </Scrollbar>,
    );
    const el = container.firstElementChild as HTMLElement;
    const metrics = mockMetrics(el, { scrollWidth: 1000 });

    const notPrevented = el.dispatchEvent(
      new WheelEvent('wheel', { deltaY: 100, cancelable: true }),
    );
    expect(notPrevented).toBe(false);
    expect(metrics.scrollLeft).toBe(100);

    metrics.scrollWidth = 500;
    expect(
      el.dispatchEvent(
        new WheelEvent('wheel', { deltaY: 100, cancelable: true }),
      ),
    ).toBe(true);
  });

  test('exposes the element and setScroll through the ref', () => {
    const ref = createRef<ScrollbarRef>();
    const { container } = customRender(
      <Scrollbar ref={ref}>
        <div>content</div>
      </Scrollbar>,
    );
    const el = container.firstElementChild as HTMLElement;
    const metrics = mockMetrics(el);

    expect(ref.current?.element).toBe(el);
    act(() => ref.current?.setScroll({ side: 'bottom' }));
    expect(metrics.scrollTop).toBe(1500);
  });
});
