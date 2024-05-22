import { styled, css } from 'styled-components';
import { ScrollbarOverflow, ScrollbarVariant } from './types';
import { adaptive } from '@/ui/adaptive';

export interface ScrollbarStyledProps {
  $overflow: ScrollbarOverflow;
}

export const ScrollbarStyled = styled.div<ScrollbarStyledProps>`
  position: relative;
  width: inherit;
  height: inherit;
  overflow: ${({ $overflow }) => {
    switch ($overflow) {
      case 'auto':
        return 'hidden';
      case 'visible':
        return 'visible';
    }
  }};
`;

export interface ScrollbarContentProps {
  $variant: ScrollbarVariant;
  $size: number;
  $disabled: boolean;
  $overflow: ScrollbarOverflow;
}

export const ScrollbarContent = styled.div<ScrollbarContentProps>`
  position: relative;
  width: inherit;
  height: inherit;
  overflow: ${({ $overflow }) => {
    switch ($overflow) {
      case 'auto':
        return 'auto';
      case 'visible':
        return 'visible';
    }
  }};
  ${({
    theme, $disabled, $size, $variant 
  }) => {
    if ($disabled) {
      return css`
        &::-webkit-scrollbar {
          display: none;
        }
      `;
    }

    return css`
      &::-webkit-scrollbar {
        width: ${`${$size}px`};
        height: ${`${$size}px`};
        background: ${theme.colors.grayScale.gray4};
        ${$variant === 'secondary' && css`
          border-radius: ${`${$size / 2}px`};
        `}
      }
      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.accent.primaryLight};
        ${$variant === 'secondary' && css`
          border-radius: ${`${$size / 2}px`};
        `}
      }
      &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.grayScale.gray5};
        ${$variant === 'secondary' && css`
          border-radius: ${`${$size / 2}px`};
        `}
      }
      &::-webkit-scrollbar-corner {
        display: none;
      }
      ${adaptive(() => ({
    touch: css`
          &::-webkit-scrollbar {
            display: none; 
          }
        `
  }))}
    `;
  }}
`;

export const ScrollbarShadows = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
`;
