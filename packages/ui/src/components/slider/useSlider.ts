import { useEffect, useRef, useState } from 'react';
import { ScrollbarRef } from '../scrollbar';

export interface UseSliderProps {
  options?: ScrollIntoViewOptions;
}

export const useSlider = ({
  options = {
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  },
}: UseSliderProps) => {
  const [arrows, setArrows] = useState({
    isLeftDisabled: true,
    isRightDisabled: true,
  });
  const arrowsRef = useRef(arrows);
  const { isLeftDisabled, isRightDisabled } = arrows;

  const scrollbarRef = useRef<ScrollbarRef>(null);

  const onScrollLeft = () => {
    const scrollbar = scrollbarRef.current?.element;
    const children = scrollbar?.children;

    if (!children || !scrollbar) return;

    const parentRect = scrollbar.getBoundingClientRect();
    let isNearFirstPosition = 0;
    let isMinMinusX = -9999;

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      const rect = child.getBoundingClientRect();
      const relativeX = rect.left - parentRect.left;

      if (relativeX + 1 < 0 && relativeX > isMinMinusX) {
        isMinMinusX = Math.floor(relativeX);
        isNearFirstPosition = i;
      }
    }

    if (isMinMinusX === -9999 && isNearFirstPosition === 0) return;

    children[isNearFirstPosition].scrollIntoView(options);
  };

  const onScrollRight = () => {
    const scrollbar = scrollbarRef.current?.element;
    const children = scrollbar?.children;

    if (!children || !scrollbar) return;

    const parentRect = scrollbar.getBoundingClientRect();
    let isNearFirstPosition = 0;
    let isMaxPlusX = 9999;
    const isMaxWidth = scrollbar.clientWidth;

    if (!isMaxWidth) return;

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      const rect = child.getBoundingClientRect();
      const relativeRight = rect.right - parentRect.left;

      if (relativeRight - 1 > isMaxWidth && relativeRight < isMaxPlusX) {
        isMaxPlusX = Math.floor(relativeRight);
        isNearFirstPosition = i;
      }
    }

    if (isMaxPlusX === 9999 && isNearFirstPosition === 0) return;

    children[isNearFirstPosition].scrollIntoView(options);
  };

  useEffect(() => {
    const target = scrollbarRef.current?.element;
    if (!target) return;

    const updateArrows = () => {
      const isContentOverflowing = target.scrollWidth > target.clientWidth;
      const next = isContentOverflowing
        ? {
            isLeftDisabled: target.scrollLeft <= 0,
            isRightDisabled:
              target.scrollWidth - target.scrollLeft <= target.clientWidth + 1,
          }
        : { isLeftDisabled: true, isRightDisabled: true };

      // One state update, and none while scrolling between the edges
      const prev = arrowsRef.current;
      if (
        prev.isLeftDisabled === next.isLeftDisabled &&
        prev.isRightDisabled === next.isRightDisabled
      ) {
        return;
      }

      arrowsRef.current = next;
      setArrows(next);
    };

    target.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();

    // The arrows also depend on the sizes, which change without scrolling
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateArrows);
      resizeObserver.observe(target);
      Array.from(target.children).forEach((child) => {
        resizeObserver?.observe(child);
      });
    }

    return () => {
      target.removeEventListener('scroll', updateArrows);
      resizeObserver?.disconnect();
    };
  }, []);

  return {
    isLeftDisabled,
    isRightDisabled,
    onScrollLeft,
    onScrollRight,
    scrollbarRef,
  };
};
