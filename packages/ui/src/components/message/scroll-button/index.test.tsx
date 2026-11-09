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

// The button stays mounted to animate: hidden means out of the a11y tree
const isShown = (container: HTMLElement) => {
  const button = getButton(container);
  return button !== null && button.getAttribute('aria-hidden') !== 'true';
};

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

    expect(isShown(container)).toBe(false);
    expect(observer.observed).toEqual([element, content]);

    size.scrollHeight = 300;
    act(() => observer.callback());

    expect(isShown(container)).toBe(true);
  });

  test('hides when scrolled to the bottom', () => {
    const { element, size, scrollbarRef } = createScrollElement();
    size.scrollHeight = 300;
    const { container } = customRender(
      <ScrollButton scrollbarRef={scrollbarRef} />,
    );

    expect(isShown(container)).toBe(true);

    size.scrollTop = 200;
    act(() => {
      element.dispatchEvent(new Event('scroll'));
    });

    expect(isShown(container)).toBe(false);
    expect(getButton(container)?.getAttribute('tabindex')).toBe('-1');
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
