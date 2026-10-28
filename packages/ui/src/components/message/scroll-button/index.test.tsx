import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { act, cleanup } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { ScrollbarRef } from '@/ui/components/scrollbar';
import { ScrollButton } from '.';

class ResizeObserverMock {
  static instances: ResizeObserverMock[] = [];

  observed: Element[] = [];

  disconnect = vi.fn();

  constructor(readonly callback: () => void) {
    ResizeObserverMock.instances.push(this);
  }

  observe(element: Element) {
    this.observed.push(element);
  }

  unobserve() {}
}

const createScrollElement = () => {
  const size = { scrollHeight: 100, clientHeight: 100, scrollTop: 0 };
  const element = document.createElement('div');
  const content = document.createElement('div');
  element.append(content);
  (Object.keys(size) as (keyof typeof size)[]).forEach((key) => {
    Object.defineProperty(element, key, { get: () => size[key] });
  });
  const scrollbarRef = {
    current: { element, setScroll: () => {} } as ScrollbarRef,
  };
  return { element, content, size, scrollbarRef };
};

const getButton = (container: HTMLElement) =>
  container.querySelector('[data-test="scroll-button"]');

describe('ScrollButton', () => {
  beforeEach(() => {
    ResizeObserverMock.instances = [];
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('shows up when the content grows without a scroll event', () => {
    const { element, content, size, scrollbarRef } = createScrollElement();
    const { container } = customRender(
      <ScrollButton scrollbarRef={scrollbarRef} />,
    );
    const [observer] = ResizeObserverMock.instances;

    expect(getButton(container)).toBeNull();
    expect(observer.observed).toEqual([element, content]);

    size.scrollHeight = 300;
    act(() => observer.callback());

    expect(getButton(container)).not.toBeNull();
  });

  test('hides when scrolled to the bottom', () => {
    const { element, size, scrollbarRef } = createScrollElement();
    size.scrollHeight = 300;
    const { container } = customRender(
      <ScrollButton scrollbarRef={scrollbarRef} />,
    );

    expect(getButton(container)).not.toBeNull();

    size.scrollTop = 200;
    act(() => {
      element.dispatchEvent(new Event('scroll'));
    });

    expect(getButton(container)).toBeNull();
  });

  test('stops observing on unmount', () => {
    const { scrollbarRef } = createScrollElement();
    const { unmount } = customRender(
      <ScrollButton scrollbarRef={scrollbarRef} />,
    );

    unmount();

    expect(ResizeObserverMock.instances[0].disconnect).toHaveBeenCalled();
  });
});
