import { css, styled } from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography } from '@/ui/components/typography';
import { TooltipAlign, TooltipPlacement, TooltipVariant } from './types';
import { Image } from '@/ui/components/image';

export interface TooltipStyledProps {
  $placement: TooltipPlacement;
  $align: TooltipAlign;
  ref: React.RefObject<HTMLDivElement>;
}

export const TooltipStyled: React.FC<HTMLMotionProps<'div'> & TooltipStyledProps> = styled(motion.div)<TooltipStyledProps>`
  display: inline-flex;
  position: absolute;
  top: 0px;
  left: 0px;
  flex-direction: column;
  width: auto;
  pointer-events: none;
  user-select: none;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  ${({ $placement, $align }) => {
    if ($align !== 'auto') {
      switch ($align) {
        case 'left':
          return css`
            align-items: flex-start;
          `;
        case 'center':
          return css`
            align-items: center;
          `;
        case 'right':
          return css`
            align-items: flex-end;
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
    }
  }}
`;

export interface TooltipBlockProps {
  $variant: TooltipVariant;
}

export const TooltipBlock = styled.span<TooltipBlockProps>`
  display: inline-flex;
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
  max-width: 260px;
`;

export const TooltipLabel = styled(Typography).attrs({ variant: 'body-s-medium' })`
  white-space: pre-wrap;
`;

export const TooltipMarkdown = styled(ReactMarkdown)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TooltipLabelBold = styled(Typography).attrs({ variant: 'body-s-semibold' })``;

export const TooltipCode = styled(Typography).attrs({ component: 'code', variant: 'body-s-medium' })`
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
