import { styled, css } from 'styled-components';
import { animated } from '@react-spring/web';
import { ScrollbarShadowSide } from './types';
import { adaptive } from '@/ui/adaptive';

export interface ScrollbarShadowStyledProps {
  $side: ScrollbarShadowSide;
  $scrollbarSize: number;
  $disabled: boolean;
}

export const ScrollbarShadowStyled = styled.span<ScrollbarShadowStyledProps>`
  display: inline-flex;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.scrollbarShadow};
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
  ${({ $side, $scrollbarSize, $disabled }) => {
    if ($disabled) {
      switch ($side) {
        case 'left':
        case 'right':
          return css`
            height: 100%;
          `;
        case 'top':
        case 'bottom':
          return css`
            width: 100%;
          `;
      }
    }

    switch ($side) {
      case 'left':
      case 'right':
        return css`
          height: calc(100% - ${$scrollbarSize}px);
        `;
      case 'top':
      case 'bottom':
        return css`
          width: calc(100% - ${$scrollbarSize}px);
        `;
    }
  }}
  ${adaptive(({ $side }) => {
    switch ($side) {
      case 'left':
      case 'right':
        return {
          touch: css`
            height: 100%;
          `,
        };
      case 'top':
      case 'bottom':
        return {
          touch: css`
            width: 100%;
          `,
        };
    }
  })}
`;

export const ScrollbarShadowContent = styled(animated.span)`
  display: inline-flex;
  position: relative;
  width: 100%;
  height: 100%;
`;
