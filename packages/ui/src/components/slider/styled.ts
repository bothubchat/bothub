import { styled, css } from 'styled-components';
import { Scrollbar } from '../scrollbar';
import { ArrowsSize } from './types';
import { ThemeMode, themeVar } from '@/ui/theme';

export const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const SliderWrapper = styled(Scrollbar)<{
  $gap: number;
}>`
  display: flex;
  gap: ${({ $gap }) => $gap}px;
  scrollbar-width: none;
`;

export const SliderArrow = styled.div<{
  $hidden: boolean;
  $arrowsSize: ArrowsSize;
  $isLeftArrow?: boolean;
  /** Mode of the current theme: styles may get a theme of CSS variables. */
  $mode: ThemeMode;
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
            themeVar(theme, 'tokens.sliderFadeSmall')};
        `;
      case 'md':
        return css`
          width: 80px;
          background: ${({ theme }) =>
            themeVar(theme, 'tokens.sliderFadeMedium')};
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

    ${({ $mode }) =>
      $mode === 'light' &&
      css`
        path {
          stroke: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray1')};
        }
      `};
  }
`;

export const SliderIconContainer = styled.button`
  all: unset;
  cursor: pointer;
  pointer-events: all;
`;
