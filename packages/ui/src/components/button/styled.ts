import { motion, HTMLMotionProps } from 'framer-motion';
import { css, styled } from 'styled-components';
import { ButtonCorner, ButtonSize } from './types';

export interface ButtonStyledProps extends HTMLMotionProps<'button'> {
  $icon: boolean;
  $size: ButtonSize;
  $corner: ButtonCorner;
  $fullWidth: boolean;
}

export const ButtonStyled: React.FC<ButtonStyledProps> = styled(motion.button)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${({ theme, disabled }) => (disabled ? theme.colors.grayScale.gray2 : theme.colors.accent.primary)};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  color: ${({ theme, disabled }) => (disabled ? theme.colors.grayScale.gray1 : theme.colors.base.white)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.40) inset;
  gap: 10px;
  ${({ $icon, $size }) => {
    switch ($size) {
      case 'md':
        if ($icon) {
          return css`
            padding: 14px;
          `;
        }
        return css`
          padding: 14px 24px;
        `;
      default:
        if ($icon) {
          return css`
            padding: 10px;
          `;
        } 
        return css`
          padding: 10px 18px;
        `;
    }
  }}
  ${({ $icon, $corner }) => {
    if ($icon) {
      switch ($corner) {
        case 'rounded':
          return css`
            border-radius: 50%;
          `;
        default:
          return css`
            border-radius: 8px;
          `;
      }
    } else {
      return css`
        border-radius: 8px;
      `;
    }
  }}
  ${({ $size }) => {
    switch ($size) {
      case 'md':
        return css`
          font-size: 18px;
        `;
      default:
        return css`
          font-size: 15px;
        `;
    }
  }}
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
`;
