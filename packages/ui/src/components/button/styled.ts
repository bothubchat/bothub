import { motion, HTMLMotionProps } from 'framer-motion';
import { css, styled } from 'styled-components';
import React from 'react';
import { ButtonCorner, ButtonSize, ButtonVariant } from './types';

export interface ButtonStyledProps extends HTMLMotionProps<'button'> {
  ref: React.RefObject<HTMLButtonElement>;
  $icon: boolean;
  $variant: ButtonVariant;
  $size: ButtonSize;
  $corner: ButtonCorner;
  $fullWidth: boolean;
  $iconFill?: string;
  $skeleton: boolean;
}

export const ButtonStyled: React.FC<ButtonStyledProps> = styled(motion.button)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  color: ${({ theme, disabled }) => (disabled ? theme.colors.grayScale.gray1 : theme.colors.base.white)};
  cursor: ${({ disabled, $skeleton }) => {
    if (disabled) {
      return 'not-allowed';
    }
    if ($skeleton) {
      return 'progress';
    }

    return 'pointer';
  }};
  gap: 10px;
  ${({
    theme, disabled, $variant, $skeleton 
  }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${disabled || $skeleton ? theme.colors.grayScale.gray2 : theme.colors.accent.primary};
          box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.40) inset;
        `;
      case 'secondary':
        return css`
          background: ${theme.colors.grayScale.gray4};
          box-shadow: 0px 0px 0px 1px ${theme.colors.grayScale.gray2} inset;
        `;
      case 'text':
        return css`
          background: none;
        `;
    }
  }}
  ${({ $variant, $icon, $size }) => {
    switch ($variant) {
      case 'primary':
      case 'secondary':
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
      case 'text':
        return css`
          padding: 0px;
        `;
    }
  }}
  ${({ $variant, $icon, $corner }) => {
    switch ($variant) {
      case 'primary':
      case 'secondary':
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
      case 'text':
        return css``;
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
  ${({
    theme, $variant, $icon, $iconFill, disabled 
  }) => {
    if ($variant !== 'text' || disabled) {
      return css``;
    }
    if ($icon) {
      return css`
        svg path {
          fill: ${$iconFill ?? theme.colors.grayScale.gray1} !important;
        }
        &:hover {
          svg path {
            fill: ${theme.colors.base.white} !important;
          }
        }
      `;
    }

    return css`
      &:hover {
        color: ${theme.colors.accent.primary};
        svg path {
          fill: ${theme.colors.accent.primary} !important;
        }
      }
    `;
  }}
`;
