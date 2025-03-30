import { useEffect, useRef, useState } from 'react';
import { ScrollbarRef } from '../scrollbar';

export const useSlider = () => {
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const scrollbarRef = useRef<ScrollbarRef>(null);

  const onScrollLeft = () => {
    const children = scrollbarRef.current?.element?.children;

    if (!children) return;

    let isNearFirstPosition = 0;
    let isMinMinusX = -9999;

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      const rect = child.getBoundingClientRect();

      if (rect.x + 1 < 0 && rect.x > isMinMinusX) {
        isMinMinusX = Math.floor(rect.x);
        isNearFirstPosition = i;
      }
    }

    if (isMinMinusX === -9999 && isNearFirstPosition === 0) return;

    children[isNearFirstPosition].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  const onScrollRight = () => {
    const children = scrollbarRef.current?.element?.children;

    if (!children) return;

    let isNearFirstPosition = 0;
    let isMaxPlusX = 9999;
    const isMaxWidth =
      scrollbarRef.current?.element?.getBoundingClientRect().width;

    if (!isMaxWidth) return;

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      const rect = child.getBoundingClientRect();

      if (rect.right - 1 > isMaxWidth && rect.right < isMaxPlusX) {
        isMaxPlusX = Math.floor(rect.right);

        isNearFirstPosition = i;
      }
    }

    if (isMaxPlusX === 9999 && isNearFirstPosition === 0) return;

    children[isNearFirstPosition].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  useEffect(() => {
    const scrollbar = scrollbarRef.current;

    const onScroll = () => {
      const target = scrollbarRef.current?.element;

      if (!target) return;

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
    scrollbarRef
  };
};
