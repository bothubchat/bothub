import { styled, css } from 'styled-components';
import { AnimationProps, motion } from 'framer-motion';
import React from 'react';
import { ScrollbarShadowSide } from './types';

export interface ScrollbarShadowStyledProps {
  $side: ScrollbarShadowSide;
  $size: number;
  $scrollbarSize: number;
}

export const ScrollbarShadowStyled = styled.span<ScrollbarShadowStyledProps>`
  display: inline-flex;
  position: absolute;
  pointer-events: none;
  overflow: hidden;
  ${({ $side }) => {
    switch ($side) {
      case 'left':
        return css`
          top: 0px;
          left: 0px;
        `;
      case 'right':
        return css`
          top: 0px;
          right: 0px;
        `;
      case 'top':
        return css`
          top: 0px;
          left: 0px;
        `;
      case 'bottom':
        return css`
          bottom: 0px;
          left: 0px;
        `;
    }
  }}
  ${({ $side, $size, $scrollbarSize }) => {
    switch ($side) {
      case 'left':
      case 'right':
        return css`
          width: ${$size}px;
          height: calc(100% - ${$scrollbarSize}px);
        `;
      case 'top':
      case 'bottom':
        return css`
          width: calc(100% - ${$scrollbarSize}px);
          height: ${$size}px;
        `;
    }
  }}
`;

export const ScrollbarShadowContent: React.FC<AnimationProps> = styled(motion.span)`
  display: inline-flex;
  position: relative;
  width: 100%;
  height: 100%;
`;
