import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import * as S from './styled';
import { ArrowDownIcon } from '@/ui/icons';

type SliderProps = {
  sliderMultiplier?: number;
} & PropsWithChildren;

export const Slider = ({ sliderMultiplier = 1, children }: SliderProps) => {
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

  const onArrowClick = (slideToRight: boolean) => {
    wrapperRef.current?.scrollBy({
      behavior: 'smooth',
      left: (slideToRight ? 100 : -100) * sliderMultiplier
    });
  };

  return (
    <S.SliderContainer>
      <S.SliderLeftArrow $hidden={!showLeftArrow}>
        <S.SliderIconContainer onClick={() => onArrowClick(false)}>
          <ArrowDownIcon />
        </S.SliderIconContainer>
      </S.SliderLeftArrow>

      <S.SliderWrapper ref={wrapperRef}>{children}</S.SliderWrapper>

      <S.SliderRightArrow $hidden={!showRightArrow}>
        <S.SliderIconContainer onClick={() => onArrowClick(true)}>
          <ArrowDownIcon />
        </S.SliderIconContainer>
      </S.SliderRightArrow>
    </S.SliderContainer>
  );
};
