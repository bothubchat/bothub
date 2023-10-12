import { styled, css } from 'styled-components';
import { ScrollbarVariant } from './types';

export interface ScrollbarStyledProps {
  $disableOverflowHidden: boolean;
  $disabled: boolean;
}

export const ScrollbarStyled = styled.div<ScrollbarStyledProps>`
  ${({ $disabled, $disableOverflowHidden }) => {
    if ($disabled) {
      return css`
        overflow: visible !important;
        width: inherit;
        height: inherit;
      `;
    }

    return css`
      position: relative;
      width: inherit;
      height: inherit;
      ${!$disableOverflowHidden && css`
        overflow: hidden;
      `}
    `;
  }}
`;

export interface ScrollbarContentProps {
  $variant: ScrollbarVariant;
  $size: number;
  $disabled: boolean;
}

export const ScrollbarContent = styled.div<ScrollbarContentProps>`
  ${({
    theme, $variant, $size, $disabled 
  }) => {
    if ($disabled) {
      return css`
        overflow: visible !important;
        width: inherit;
        height: inherit;
      `;
    }

    return css`
      position: relative;
      width: inherit;
      height: inherit;
      &::-webkit-scrollbar {
        width: ${`${$size}px`};
        height: ${`${$size}px`};
        background: ${theme.colors.grayScale.gray4};
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
