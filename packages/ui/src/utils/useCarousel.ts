import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventCallback } from './useEventCallback';

const velocityThreshold = 0.4; // px/ms
const dragThresholdPercent = 0.1; // %

export interface UseCarouselProps {
  defaultIndex?: number | (() => number);
  slidesCount: number;
  enableSwipes?: boolean;
  slidesPerScreen?: number;
  align?: 'center' | 'left';
  onSlideChange?: (index: number) => void;
}

export const useCarousel = ({
  defaultIndex,
  slidesCount,
  enableSwipes = true,
  slidesPerScreen = 1,
  align = 'center',
  onSlideChange,
}: UseCarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  // Drag state is not rendered, so it lives in refs: a swipe does not
  // rerender the slides on pointerdown and pointermove.
  const isDraggingRef = useRef(false);
  const isDraggingNowRef = useRef(false);

  const [activeSlideIndex, setActiveSlideIndex] = useState(defaultIndex ?? 0);
  const activeSlideIndexRef = useRef(activeSlideIndex);

  const isPrevAllowed = activeSlideIndex >= slidesPerScreen;
  const isNextAllowed = activeSlideIndex + slidesPerScreen < slidesCount;

  const handleSlideChange = useEventCallback(onSlideChange);

  const calculateVelocity = useCallback((endX: number, endTime: number) => {
    const deltaX = endX - dragStartXRef.current;
    const deltaTime = endTime - dragStartTimeRef.current;
    return deltaX / deltaTime;
  }, []);

  const slideWidthsRef = useRef<number[]>([]);
  const containerWidthRef = useRef<number>(0);
  const gapRef = useRef<number>(0);

  const measureElements = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    containerWidthRef.current = container.clientWidth;

    slideWidthsRef.current = Array.from(container.children).map(
      (child) => child.clientWidth,
    );

    const containerFullWidth = container.scrollWidth;
    const totalGap =
      containerFullWidth -
      slideWidthsRef.current.reduce((sum, width) => sum + width, 0);
    const gapsCount = slideWidthsRef.current.length - 1;

    // A single slide has no gaps (dividing by zero gave NaN).
    gapRef.current = gapsCount > 0 ? totalGap / gapsCount : 0;
  }, []);

  const updateTransform = useCallback(
    (slideIndex: number, offset = 0) => {
      if (!containerRef.current || !slideWidthsRef.current[slideIndex]) return;

      const slideWidth = slideWidthsRef.current[slideIndex];
      const containerWidth = containerWidthRef.current;
      const gap = gapRef.current;
      const windowWidth = window.innerWidth;

      const groupWidth =
        slideWidth * slidesPerScreen + gap * (slidesPerScreen - 1);
      const currentGroup = Math.floor(slideIndex / slidesPerScreen);
      let slidePosition = currentGroup * (groupWidth + gap);

      if (align === 'center') {
        const centerOffset = (containerWidth - groupWidth) / 2;
        slidePosition = Math.max(0, slidePosition - centerOffset);
      } else {
        // For 'left' alignment, we don't need any additional offset
        // Just ensure we don't overflow at the end
        const maxPosition =
          slideWidthsRef.current.length * slideWidth +
          (slideWidthsRef.current.length - 1) * gap -
          containerWidth;
        slidePosition = Math.max(0, Math.min(slidePosition, maxPosition));
      }

      const slidePositionVW = (slidePosition / windowWidth) * 100;
      const dragOffsetVW = (offset / windowWidth) * 100;

      const transform = -slidePositionVW + dragOffsetVW;
      containerRef.current.style.transform = `translateX(${transform}vw)`;
    },
    [slidesPerScreen, align],
  );

  useEffect(() => {
    if (!enableSwipes) {
      isDraggingRef.current = false;
      isDraggingNowRef.current = false;
    }
  }, [enableSwipes]);

  const goToSlide = useCallback(
    (newIndex: number) => {
      const groupIndex =
        Math.floor(newIndex / slidesPerScreen) * slidesPerScreen;
      const finalIndex = Math.max(0, Math.min(groupIndex, slidesCount - 1));

      activeSlideIndexRef.current = finalIndex;
      setActiveSlideIndex(finalIndex);
      updateTransform(finalIndex);
      handleSlideChange(finalIndex);
      return finalIndex;
    },
    [updateTransform, slidesCount, handleSlideChange, slidesPerScreen],
  );

  const goPrev = useCallback(() => {
    const index = activeSlideIndexRef.current;

    if (index >= slidesPerScreen) {
      return goToSlide(index - slidesPerScreen);
    }
    return index;
  }, [goToSlide, slidesPerScreen]);

  const goNext = useCallback(() => {
    const index = activeSlideIndexRef.current;

    if (index + slidesPerScreen < slidesCount) {
      return goToSlide(index + slidesPerScreen);
    }
    return index;
  }, [goToSlide, slidesPerScreen, slidesCount]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;

    isDraggingRef.current = true;
    isDraggingNowRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartTimeRef.current = Date.now();

    containerRef.current.style.transition = 'none';
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;

      isDraggingNowRef.current = true;
      const delta = e.clientX - dragStartXRef.current;

      updateTransform(activeSlideIndexRef.current, delta);
    },
    [updateTransform],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;

      isDraggingRef.current = false;
      isDraggingNowRef.current = false;

      const index = activeSlideIndexRef.current;
      const velocity = calculateVelocity(e.clientX, Date.now());
      const absVelocity = Math.abs(velocity);
      const currentOffset = e.clientX - dragStartXRef.current;
      const absDragOffset = Math.abs(currentOffset);

      containerRef.current.style.transition = 'transform 0.3s ease-in-out';
      const slideWidth = slideWidthsRef.current[index] ?? 100;

      const dragThreshold = slideWidth * dragThresholdPercent;

      // A long drag or a fast flick changes the slide.
      const shouldNavigate =
        absDragOffset > dragThreshold || absVelocity > velocityThreshold;

      if (shouldNavigate) {
        if (currentOffset > 0 && index >= slidesPerScreen) {
          goToSlide(index - slidesPerScreen);
        } else if (currentOffset < 0 && index + slidesPerScreen < slidesCount) {
          goToSlide(index + slidesPerScreen);
        } else {
          updateTransform(index);
        }
      } else {
        updateTransform(index);
      }
    },
    [
      slidesPerScreen,
      slidesCount,
      goToSlide,
      calculateVelocity,
      updateTransform,
    ],
  );

  // A stable callback ref: it does not run again on every slide change, and
  // the ResizeObserver is created once per mounted container.
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;

      if (!node) return;

      measureElements();
      updateTransform(activeSlideIndexRef.current);

      if (typeof ResizeObserver === 'undefined') return;

      let timeoutId: number | undefined;
      const resizeObserver = new ResizeObserver(() => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          measureElements();
          updateTransform(activeSlideIndexRef.current);
          timeoutId = undefined;
        }, 30);
      });
      resizeObserver.observe(node);

      return () => {
        window.clearTimeout(timeoutId);
        resizeObserver.disconnect();
        containerRef.current = null;
      };
    },
    [measureElements, updateTransform],
  );

  return {
    activeSlideIndex,
    isPrevAllowed,
    isNextAllowed,
    goPrev,
    goNext,
    goToSlide,
    /**
     * @deprecated The drag state is kept in a ref and no longer rerenders the
     * component, so this value is only up to date at render time.
     */
    isDragging: isDraggingRef.current,
    /**
     * @deprecated The drag state is kept in a ref and no longer rerenders the
     * component, so this value is only up to date at render time.
     */
    isDraggingNow: isDraggingNowRef.current,
    carouselProps: {
      ref,
      onPointerDown: enableSwipes ? onPointerDown : undefined,
      onPointerMove: enableSwipes ? onPointerMove : undefined,
      onPointerUp: enableSwipes ? onPointerUp : undefined,
      onPointerLeave: enableSwipes ? onPointerUp : undefined,
      onPointerCancel: enableSwipes ? onPointerUp : undefined,
    },
  };
};
