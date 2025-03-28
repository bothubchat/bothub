'use client';

import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as S from './styled';
import { ArrowDownIcon } from '@/ui/icons';

type ScrollProps = {
  scrollMultiplier?: number;
} & PropsWithChildren;

export const Scroll = ({ scrollMultiplier = 1, children }: ScrollProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkArrowsVisibility = () => {
    if (!wrapperRef.current) return;
    const { scrollWidth, clientWidth, scrollLeft } = wrapperRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    checkArrowsVisibility();

    window.addEventListener('resize', checkArrowsVisibility);
    return () => window.removeEventListener('resize', checkArrowsVisibility);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkArrowsVisibility);
    return () => el.removeEventListener('scroll', checkArrowsVisibility);
  }, []);

  const onArrowClick = (scrollToRight: boolean) => {
    wrapperRef.current?.scrollBy({
      behavior: 'smooth',
      left: (scrollToRight ? 100 : -100) * scrollMultiplier
    });
  };

  return (
    <S.ScrollContainer>
      <S.ScrollLeftArrow $hidden={!showLeftArrow}>
        <S.ScrollIconContainer onClick={() => onArrowClick(false)}>
          <ArrowDownIcon />
        </S.ScrollIconContainer>
      </S.ScrollLeftArrow>

      <S.ScrollWrapper ref={wrapperRef}>{children}</S.ScrollWrapper>

      <S.ScrollRightArrow $hidden={!showRightArrow}>
        <S.ScrollIconContainer onClick={() => onArrowClick(true)}>
          <ArrowDownIcon />
        </S.ScrollIconContainer>
      </S.ScrollRightArrow>
    </S.ScrollContainer>
  );
};
