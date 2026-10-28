import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { useCarousel, UseCarouselProps } from './useCarousel';

type Carousel = ReturnType<typeof useCarousel>;

const SLIDE_WIDTH = 1000;

const mockLayout = (slidesCount: number) => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(
    SLIDE_WIDTH,
  );
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(
    SLIDE_WIDTH * slidesCount,
  );
  vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(SLIDE_WIDTH);
};

const renderCarousel = (props: UseCarouselProps) => {
  const result: { current: Carousel | null; renders: number } = {
    current: null,
    renders: 0,
  };

  const Host = () => {
    const carousel = useCarousel(props);
    result.current = carousel;
    result.renders += 1;

    return (
      <div
        data-testid="container"
        ref={carousel.carouselProps.ref}
      >
        {Array.from({ length: props.slidesCount }, (_, index) => (
          <div key={index} />
        ))}
      </div>
    );
  };

  const view = render(<Host />);

  return { result, container: view.getByTestId('container') };
};

const pointer = (clientX: number) => ({ clientX }) as React.PointerEvent;

describe('useCarousel', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('dragging does not rerender until the slide changes', () => {
    mockLayout(3);
    const { result } = renderCarousel({ slidesCount: 3 });
    const rendersBefore = result.renders;

    act(() => {
      result.current!.carouselProps.onPointerDown!(pointer(500));
      result.current!.carouselProps.onPointerMove!(pointer(450));
      result.current!.carouselProps.onPointerMove!(pointer(400));
    });

    expect(result.renders).toBe(rendersBefore);

    act(() => {
      result.current!.carouselProps.onPointerUp!(pointer(300));
    });

    expect(result.current!.activeSlideIndex).toBe(1);
    expect(result.renders).toBe(rendersBefore + 1);
  });

  test('a fast flick shorter than the drag threshold changes the slide', () => {
    vi.useFakeTimers();
    mockLayout(3);
    const { result } = renderCarousel({ slidesCount: 3 });

    act(() => {
      result.current!.carouselProps.onPointerDown!(pointer(500));
    });
    vi.advanceTimersByTime(50);
    act(() => {
      // 50px in 50ms: below 10% of the slide, but 1 px/ms.
      result.current!.carouselProps.onPointerUp!(pointer(450));
    });

    expect(result.current!.activeSlideIndex).toBe(1);
  });

  test('a slow short drag keeps the slide', () => {
    vi.useFakeTimers();
    mockLayout(3);
    const { result } = renderCarousel({ slidesCount: 3 });

    act(() => {
      result.current!.carouselProps.onPointerDown!(pointer(500));
    });
    vi.advanceTimersByTime(1000);
    act(() => {
      result.current!.carouselProps.onPointerUp!(pointer(450));
    });

    expect(result.current!.activeSlideIndex).toBe(0);
  });

  test('a single slide gets a valid transform', () => {
    mockLayout(1);
    const { container } = renderCarousel({ slidesCount: 1 });

    expect(container.style.transform).not.toContain('NaN');
  });

  test('changing the slide does not create a new ResizeObserver', () => {
    const observers: unknown[] = [];
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor() {
          observers.push(this);
        }

        observe() {}

        disconnect() {}
      },
    );
    mockLayout(3);
    const { result } = renderCarousel({ slidesCount: 3 });

    act(() => {
      result.current!.goNext();
    });
    act(() => {
      result.current!.goNext();
    });

    expect(result.current!.activeSlideIndex).toBe(2);
    expect(observers).toHaveLength(1);
    vi.unstubAllGlobals();
  });
});
