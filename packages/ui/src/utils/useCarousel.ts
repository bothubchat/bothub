import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const velocityThreshold = 0.4; // px/ms
const dragThresholdPercent = 0.15; // %

export interface UseCarouselProps {
  defaultIndex?: number | (() => number);
  slidesCount: number;
  enableSwipes?: boolean;
  onSlideChange?: (index: number) => void;
}

export const useCarousel = ({
  defaultIndex,
  slidesCount,
  enableSwipes = true,
  onSlideChange,
}: UseCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const [activeSlideIndex, setActiveSlideIndex] = useState(defaultIndex ?? 0);

  const isPrevAllowed = activeSlideIndex > 0;
  const isNextAllowed = activeSlideIndex < slidesCount - 1;

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
      (child) => child.clientWidth
    );

    const containerFullWidth = container.scrollWidth;
    const totalGap = containerFullWidth - slideWidthsRef.current.reduce(
      (sum, width) => sum + width,
      0
    );

    gapRef.current = totalGap / (slideWidthsRef.current.length - 1);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    measureElements();

    let timeoutId: number | undefined;
    const update = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        measureElements();
        updateTransform(activeSlideIndex);
        timeoutId = undefined;
      }, 30);
    };

    const resizeObserver = new ResizeObserver(update);

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [measureElements, activeSlideIndex]);

  const updateTransform = useCallback((slideIndex: number, offset = 0) => {
    if (!containerRef.current || !slideWidthsRef.current[slideIndex]) return;

    const slideWidth = slideWidthsRef.current[slideIndex];
    const containerWidth = containerWidthRef.current;
    const gap = gapRef.current;

    const slidePosition = slideIndex * (slideWidth + gap);
    const centerOffset = (containerWidth - slideWidth) / 2;

    const windowWidth = window.innerWidth;
    const slideOffset = (slidePosition / windowWidth) * 100;
    const centeringOffset = (centerOffset / windowWidth) * 100;
    const dragOffset = (offset / windowWidth) * 100;

    const transform = -slideOffset + centeringOffset + dragOffset;
    containerRef.current.style.transform = `translateX(${transform}vw)`;
  }, []);

  const goToSlide = useCallback(
    (newIndex: number) => {
      setActiveSlideIndex(newIndex);
      updateTransform(newIndex);
      onSlideChange?.(newIndex);
      return newIndex;
    },
    [updateTransform]
  );

  const goPrev = useCallback(() => {
    if (isPrevAllowed) {
      return goToSlide(activeSlideIndex - 1);
    }
    return activeSlideIndex;
  }, [isPrevAllowed, activeSlideIndex, goToSlide]);

  const goNext = useCallback(() => {
    if (isNextAllowed) {
      return goToSlide(activeSlideIndex + 1);
    }
    return activeSlideIndex;
  }, [isNextAllowed, activeSlideIndex, goToSlide]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartTimeRef.current = Date.now();

    containerRef.current.style.transition = 'none';
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;

      const delta = e.clientX - dragStartXRef.current;

      updateTransform(activeSlideIndex, delta);
    },
    [isDragging, updateTransform, activeSlideIndex]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !containerRef.current) return;

      const velocity = calculateVelocity(e.clientX, Date.now());
      const absVelocity = Math.abs(velocity);
      const currentOffset = e.clientX - dragStartXRef.current;
      const absDragOffset = Math.abs(currentOffset);

      containerRef.current.style.transition = 'transform 0.3s ease-in-out';

      const dragThreshold = window.innerWidth * dragThresholdPercent;

      const shouldNavigate = absDragOffset > dragThreshold
        || (absDragOffset > dragThreshold * 0.1
          && absVelocity > velocityThreshold);

      if (shouldNavigate) {
        if (currentOffset > 0 && isPrevAllowed) {
          goToSlide(activeSlideIndex - 1);
        } else if (currentOffset < 0 && isNextAllowed) {
          goToSlide(activeSlideIndex + 1);
        } else {
          updateTransform(activeSlideIndex);
        }
      } else {
        updateTransform(activeSlideIndex);
      }

      setIsDragging(false);
    },
    [
      isDragging,
      isPrevAllowed,
      isNextAllowed,
      activeSlideIndex,
      goToSlide,
      calculateVelocity,
      updateTransform,
    ]
  );

  useEffect(() => {
    if (!enableSwipes) {
      setIsDragging(false);
    }
  }, [enableSwipes]);

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as MutableRefObject<HTMLDivElement | null>).current = node;
      measureElements();
      updateTransform(activeSlideIndex);
    },
    []
  );

  return {
    activeSlideIndex,
    isPrevAllowed,
    isNextAllowed,
    goPrev,
    goNext,
    goToSlide,
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
