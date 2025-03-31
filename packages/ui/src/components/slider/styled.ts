import { styled, css } from 'styled-components';
import { Scrollbar } from '../scrollbar';
import { ArrowsSize } from './types';

export const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const SliderWrapper = styled(Scrollbar)<{ $gap: number }>`
  display: flex;
  gap: ${({ $gap }) => $gap}px;
  scrollbar-width: none;
`;

export const SliderLeftArrow = styled.div<{
  $hidden: boolean;
  $arrowsSize: ArrowsSize;
}>`
  height: 100%;

  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  transition: opacity 0.2s;

  ${({ $arrowsSize }) => {
    switch ($arrowsSize) {
      case 'sm':
        return css`
          width: 40px;
          background: linear-gradient(-90deg, #12182500 0%, #121825 100%);
        `;
      case 'md':
        return css`
          width: 80px;
          background: linear-gradient(
            -90deg,
            rgba(14, 12, 21, 0) 0%,
            rgba(14, 12, 21, 1) 100%
          );
        `;
    }
  }};

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0;
      pointer-events: none;
    `};

  svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%) rotate(90deg);

    ${({ $arrowsSize }) => {
      switch ($arrowsSize) {
        case 'sm':
          return css`
            width: 18px;
            height: 18px;
          `;
        case 'md':
          return css`
            width: 24px;
            height: 24px;
          `;
      }
    }};
  }
`;

export const SliderRightArrow = styled(SliderLeftArrow)`
  left: unset;
  right: 0;
  transform: rotate(180deg);
`;

export const SliderIconContainer = styled.button`
  all: unset;
  cursor: pointer;
`;
