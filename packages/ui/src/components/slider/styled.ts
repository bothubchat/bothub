import { styled, css } from 'styled-components';
import { Scrollbar } from '../scrollbar';
import { ArrowsSize } from './types';

export const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const SliderWrapper = styled(Scrollbar)<{
  $gap: number;
  $justifyContentSlider?: 'space-between';
}>`
  display: flex;
  gap: ${({ $gap }) => $gap}px;
  scrollbar-width: none;
  ${({ $justifyContentSlider }) =>
    $justifyContentSlider &&
    css`
      justify-content: ${$justifyContentSlider};
    `}
`;

export const SliderArrow = styled.div<{
  $hidden: boolean;
  $arrowsSize: ArrowsSize;
  $isLeftArrow?: boolean;
}>`
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
  transition: opacity 0.2s;
  pointer-events: none;

  ${({ $isLeftArrow = true }) =>
    $isLeftArrow
      ? css`
          left: -1px;
        `
      : css`
          right: -1px;
          transform: rotate(180deg);
        `};

  ${({ $arrowsSize }) => {
    switch ($arrowsSize) {
      case 'sm':
        return css`
          width: 122px;

          background: ${({ theme }) =>
            theme.mode === 'light'
              ? 'linear-gradient(-90deg, #F5F6F700 0%, #F5F6F7 100%)'
              : 'linear-gradient(-90deg, #12182500 0%, #121825 100%)'};
        `;
      case 'md':
        return css`
          width: 80px;
          background: ${({ theme }) =>
            theme.mode === 'light'
              ? 'linear-gradient(-90deg, #F5F6F700 0%, #F5F6F7 100%)'
              : 'linear-gradient(-90deg, #0e0c1500 0%, #0e0c15 100%)'};
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

    ${({ theme }) =>
      theme.mode === 'light' &&
      css`
        path {
          stroke: ${({ theme }) => theme.colors.grayScale.gray1};
        }
      `};
  }
`;

export const SliderIconContainer = styled.button`
  all: unset;
  cursor: pointer;
  pointer-events: all;
`;
