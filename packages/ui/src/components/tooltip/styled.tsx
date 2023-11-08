import { css, styled } from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { Typography } from '@/ui/components/typography';
import { TooltipPlacement, TooltipVariant } from './types';

export interface TooltipStyledProps {
  $placement: TooltipPlacement;
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
  ${({ $placement }) => {
    switch ($placement) {
      case 'top-left':
        return css`
          align-items: flex-start;
        `;
      case 'top':
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
