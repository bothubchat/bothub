import { styled, css } from 'styled-components';
import { TooltipPlacement } from '../types';

export interface TooltipArrowStyledProps {
  $placement: TooltipPlacement;
}

export const TooltipArrowStyled = styled.svg<TooltipArrowStyledProps>`
  display: inline-flex;
  position: relative;
  top: -1.5px;
  ${({ $placement }) => {
    switch ($placement) {
      case 'top-left':
        return css`
          margin-left: 10px;
        `;
      case 'top':
        return css``;
    }
  }}
`;
