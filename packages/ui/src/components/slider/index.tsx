import { PropsWithChildren } from 'react';
import * as S from './styled';
import { ArrowDownIcon } from '@/ui/icons';
import { useSlider } from './useSlider';

type SliderProps = {
  gap?: number;
} & PropsWithChildren;

export const Slider = ({ gap, children }: SliderProps) => {
  const {
    isLeftDisabled,
    isRightDisabled,
    onScrollLeft,
    onScrollRight,
    scrollbarRef
  } = useSlider();

  return (
    <S.SliderContainer>
      <S.SliderLeftArrow $hidden={isLeftDisabled}>
        <S.SliderIconContainer onClick={onScrollLeft}>
          <ArrowDownIcon />
        </S.SliderIconContainer>
      </S.SliderLeftArrow>

      <S.SliderWrapper
        ref={scrollbarRef}
        $gap={gap}
      >
        {children}
      </S.SliderWrapper>

      <S.SliderRightArrow $hidden={isRightDisabled}>
        <S.SliderIconContainer onClick={onScrollRight}>
          <ArrowDownIcon />
        </S.SliderIconContainer>
      </S.SliderRightArrow>
    </S.SliderContainer>
  );
};

export * from './useSlider';
