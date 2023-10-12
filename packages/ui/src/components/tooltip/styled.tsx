import { styled } from 'styled-components';
import { AnimationProps, motion } from 'framer-motion';
import React from 'react';
import { Typography } from '@/ui/components/typography';
import { TooltipVariant } from './types';

export const TooltipStyled: React.FC<React.ComponentProps<'div'> & AnimationProps> = styled(motion.div)`
  display: inline-flex;
  position: absolute;
  top: 0px;
  left: 0px;
  flex-direction: column;
  align-items: center;
  width: auto;
  pointer-events: none;
  user-select: none;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
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
