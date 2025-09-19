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
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(true);

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
    const scrollbar = scrollbarRef.current;

    const onScroll = () => {
      const target = scrollbarRef.current?.element;

      if (!target) return;

      const isContentOverflowing = target.scrollWidth > target.clientWidth;

      if (!isContentOverflowing) {
        setIsLeftDisabled(true);
        setIsRightDisabled(true);
        return;
      }

      if (target.scrollWidth - target.scrollLeft <= target.clientWidth + 1) {
        setIsRightDisabled(true);
      } else {
        setIsRightDisabled(false);
      }

      if (target.scrollLeft <= 0) {
        setIsLeftDisabled(true);
      } else {
        setIsLeftDisabled(false);
      }
    };

    if (!scrollbar || !scrollbar.element) return;

    scrollbar.element.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      if (!scrollbar || !scrollbar.element) return;

      scrollbar.element.removeEventListener('scroll', onScroll);
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
