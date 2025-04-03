import { PropsWithChildren } from 'react';
import * as S from './styled';
import { ArrowDownIcon } from '@/ui/icons';
import { useSlider } from './useSlider';
import { ArrowsSize } from './types';

type SliderProps = {
  arrowsSize?: ArrowsSize;
  gap?: number;
} & PropsWithChildren;

export const Slider = ({
  arrowsSize = 'md',
  gap = 10,
  children
}: SliderProps) => {
  const {
    isLeftDisabled,
    isRightDisabled,
    onScrollLeft,
    onScrollRight,
    scrollbarRef
  } = useSlider();

  return (
    <S.SliderContainer>
      <S.SliderArrow
        $hidden={isLeftDisabled}
        $arrowsSize={arrowsSize}
      >
        <S.SliderIconContainer onClick={onScrollLeft}>
          <ArrowDownIcon />
        </S.SliderIconContainer>
      </S.SliderArrow>

      <S.SliderWrapper
        ref={scrollbarRef}
        $gap={gap}
      >
        {children}
      </S.SliderWrapper>

      <S.SliderArrow
        $hidden={isRightDisabled}
        $arrowsSize={arrowsSize}
        $isLeftArrow={false}
      >
        <S.SliderIconContainer onClick={onScrollRight}>
          <ArrowDownIcon />
        </S.SliderIconContainer>
      </S.SliderArrow>
    </S.SliderContainer>
  );
};

export * from './useSlider';
