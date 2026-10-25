import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import { useSlider } from './useSlider';
import { ScrollbarRef } from '../scrollbar';

describe('useSlider', () => {
  let resizeCallback: (() => void) | null = null;

  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          resizeCallback = callback;
        }

        observe() {}

        unobserve() {}

        disconnect() {}
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    resizeCallback = null;
  });

  const createScroller = () => {
    const element = document.createElement('div');
    const sizes = { scrollWidth: 300, clientWidth: 100 };
    Object.defineProperty(element, 'scrollWidth', {
      get: () => sizes.scrollWidth,
    });
    Object.defineProperty(element, 'clientWidth', {
      get: () => sizes.clientWidth,
    });
    return { element, sizes };
  };

  test('updates the arrows on scroll and resize without extra renders', () => {
    const { element, sizes } = createScroller();
    let renders = 0;

    const { result } = renderHook(() => {
      renders += 1;
      const slider = useSlider({});
      if (!slider.scrollbarRef.current) {
        (slider.scrollbarRef as React.MutableRefObject<ScrollbarRef>).current =
          { element } as unknown as ScrollbarRef;
      }
      return slider;
    });

    expect(result.current.isLeftDisabled).toBe(true);
    expect(result.current.isRightDisabled).toBe(false);

    act(() => {
      element.scrollLeft = 50;
      element.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.isLeftDisabled).toBe(false);
    expect(result.current.isRightDisabled).toBe(false);

    const rendersAfterScroll = renders;
    act(() => {
      element.scrollLeft = 60;
      element.dispatchEvent(new Event('scroll'));
    });
    // Nothing changed for the arrows, so nothing rerenders
    expect(renders).toBe(rendersAfterScroll);

    act(() => {
      sizes.scrollWidth = 100;
      resizeCallback?.();
    });
    expect(result.current.isLeftDisabled).toBe(true);
    expect(result.current.isRightDisabled).toBe(true);
  });
});
