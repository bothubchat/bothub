import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingNow, setIsDraggingNow] = useState(false);

  const [activeSlideIndex, setActiveSlideIndex] = useState(defaultIndex ?? 0);

  const isPrevAllowed = activeSlideIndex >= slidesPerScreen;
  const isNextAllowed = activeSlideIndex + slidesPerScreen < slidesCount;

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
    const totalGap = containerFullWidth
      - slideWidthsRef.current.reduce((sum, width) => sum + width, 0);

    gapRef.current = totalGap / (slideWidthsRef.current.length - 1);
  }, []);

  const updateTransform = useCallback(
    (slideIndex: number, offset = 0) => {
      if (!containerRef.current || !slideWidthsRef.current[slideIndex]) return;

      const slideWidth = slideWidthsRef.current[slideIndex];
      const containerWidth = containerWidthRef.current;
      const gap = gapRef.current;
      const windowWidth = window.innerWidth;

      const groupWidth = slideWidth * slidesPerScreen + gap * (slidesPerScreen - 1);
      const currentGroup = Math.floor(slideIndex / slidesPerScreen);
      let slidePosition = currentGroup * (groupWidth + gap);

      if (align === 'center') {
        const centerOffset = (containerWidth - groupWidth) / 2;
        slidePosition = Math.max(0, slidePosition - centerOffset);
      } else {
        // For 'left' alignment, we don't need any additional offset
        // Just ensure we don't overflow at the end
        const maxPosition = (slideWidthsRef.current.length * slideWidth) 
                          + ((slideWidthsRef.current.length - 1) * gap) 
                          - containerWidth;
        slidePosition = Math.max(0, Math.min(slidePosition, maxPosition));
      }

      const slidePositionVW = (slidePosition / windowWidth) * 100;
      const dragOffsetVW = (offset / windowWidth) * 100;

      const transform = -slidePositionVW + dragOffsetVW;
      containerRef.current.style.transform = `translateX(${transform}vw)`;
    },
    [slidesPerScreen, align]
  );

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

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [measureElements, activeSlideIndex]);

  useEffect(() => {
    if (!enableSwipes) {
      setIsDragging(false);
      setIsDraggingNow(false);
    }
  }, [enableSwipes]);

  const goToSlide = useCallback(
    (newIndex: number) => {
      const groupIndex = Math.floor(newIndex / slidesPerScreen) * slidesPerScreen;
      const finalIndex = Math.min(Math.max(0, groupIndex), slidesCount - 1);

      setActiveSlideIndex(finalIndex);
      updateTransform(finalIndex);
      onSlideChange?.(finalIndex);
      return finalIndex;
    },
    [updateTransform, slidesCount, onSlideChange, slidesPerScreen]
  );

  const goPrev = useCallback(() => {
    if (isPrevAllowed) {
      return goToSlide(activeSlideIndex - slidesPerScreen);
    }
    return activeSlideIndex;
  }, [isPrevAllowed, activeSlideIndex, goToSlide, slidesPerScreen]);

  const goNext = useCallback(() => {
    if (isNextAllowed) {
      return goToSlide(activeSlideIndex + slidesPerScreen);
    }
    return activeSlideIndex;
  }, [isNextAllowed, activeSlideIndex, goToSlide, slidesPerScreen]);

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

      setIsDraggingNow(true);
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
      const slideWidth = slideWidthsRef.current[activeSlideIndex] ?? 100;

      const dragThreshold = slideWidth * dragThresholdPercent;

      const shouldNavigate = absDragOffset > dragThreshold
        || (absDragOffset > dragThreshold
          && absVelocity > velocityThreshold);

      if (shouldNavigate) {
        if (currentOffset > 0 && isPrevAllowed) {
          goToSlide(activeSlideIndex - slidesPerScreen);
        } else if (currentOffset < 0 && isNextAllowed) {
          goToSlide(activeSlideIndex + slidesPerScreen);
        } else {
          updateTransform(activeSlideIndex);
        }
      } else {
        updateTransform(activeSlideIndex);
      }

      setIsDragging(false);
      setIsDraggingNow(false);
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

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as MutableRefObject<HTMLDivElement | null>).current = node;
      if (node) {
        measureElements();
        updateTransform(activeSlideIndex);
      }
    },
    [activeSlideIndex, measureElements, updateTransform]
  );

  return {
    activeSlideIndex,
    isPrevAllowed,
    isNextAllowed,
    goPrev,
    goNext,
    goToSlide,
    isDragging,
    isDraggingNow,
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
