import { AnimationProps, motion } from 'framer-motion';
import React from 'react';
import { styled, css } from 'styled-components';

export interface ProgressStyledProps {
  $fullWidth: boolean;
}

export const ProgressStyled = styled.div<ProgressStyledProps>`
  display: inline-flex;
  width: 100%;
  ${({ $fullWidth }) => !$fullWidth && css`
    max-width: 294px;
  `}
`;

export interface ProgressLineProps {
  $skeleton: boolean;
}

export const ProgressLine = styled.div<ProgressLineProps>`
  display: inline-flex;
  width: 100%;
  height: 5px;
  border-radius: 10px;
  ${({ $skeleton }) => !$skeleton && css`
    background: ${({ theme }) => theme.colors.grayScale.gray3};
  `}
`;

export const ProgressLineFilled: React.FC<AnimationProps> = styled(motion.div)`
  display: inline-flex;
  width: 50%;
  background: ${({ theme }) => theme.colors.accent.primary};
  border-radius: 10px;
`; 
