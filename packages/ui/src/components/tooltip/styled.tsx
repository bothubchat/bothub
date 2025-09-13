import { css, styled } from 'styled-components';
import React from 'react';
import { animated } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { TooltipAlign, TooltipPlacement, TooltipVariant } from './types';
import { Image } from '@/ui/components/image';

export interface TooltipStyledProps {
  $placement: TooltipPlacement;
  $align: TooltipAlign;
  $inverted?: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

export const TooltipStyled = styled(animated.div)<TooltipStyledProps>`
  display: inline-flex;
  position: absolute;
  top: 0px;
  left: 0px;
  width: auto;
  pointer-events: none;
  user-select: none;
  ${({ $placement, $inverted }) => {
    switch ($placement) {
      case 'center-left':
        return css`
          ${$inverted
            ? css`
                flex-direction: row-reverse;
              `
            : css`
                flex-direction: row;
              `}
        `;
      case 'center-right':
        return css`
          ${$inverted
            ? css`
                flex-direction: row;
              `
            : css`
                flex-direction: row-reverse;
              `}
        `;
      default:
        return css`
          flex-direction: column;
        `;
    }
  }}
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  ${({ $placement, $align }) => {
    if ($align !== 'auto') {
      switch ($align) {
        case 'left':
          if ($placement !== 'center-right' && $placement !== 'center-left') {
            return css`
              align-items: flex-start;
            `;
          }
          return css`
            align-items: center;
          `;
        case 'center':
          return css`
            align-items: center;
          `;
        case 'right':
          if ($placement !== 'center-right' && $placement !== 'center-left') {
            return css`
              align-items: flex-end;
            `;
          }
          return css`
            align-items: center;
          `;
      }
    }

    switch ($placement) {
      case 'top-left':
        return css`
          align-items: flex-start;
        `;
      case 'top':
        return css`
          align-items: center;
        `;
      case 'top-right':
        return css`
          align-items: flex-end;
        `;
      case 'center-left':
        return css`
          align-items: center;
        `;
      case 'center-right':
        return css`
          align-items: center;
        `;
    }
  }}
`;

export interface TooltipBlockProps {
  $variant: TooltipVariant;
}

export const TooltipBlock = styled.span<TooltipBlockProps>`
  display: inline-flex;
  width: max-content;
  max-width: 260px;
  padding: 8px;
  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'primary':
        return theme.colors.grayScale.gray2;
      case 'secondary':
        return theme.colors.grayScale.gray3;
    }
  }};
  overflow: hidden;
  border-radius: 6px;
  box-sizing: border-box;
`;

export const TooltipLabel = styled(Typography).attrs({
  variant: 'body-s-medium',
})`
  white-space: pre-wrap;
`;

export const TooltipMarkdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TooltipLabelBold = styled(Typography).attrs({
  variant: 'body-s-semibold',
})``;

export const TooltipCode = styled(Typography).attrs({
  component: 'code',
  variant: 'body-s-medium',
})`
  display: inline-flex;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
`;

export const TooltipColumn = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const TooltipImage = styled(Image)`
  border-radius: 4px;
`;
