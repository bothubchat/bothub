import { css, styled } from 'styled-components';
import React from 'react';
import { ButtonCorner, ButtonSize, ButtonVariant } from './types';

export interface ButtonStyledProps {
  ref: React.RefObject<HTMLButtonElement>;
  $icon: boolean;
  $variant: ButtonVariant;
  $size: ButtonSize;
  $corner: ButtonCorner;
  $fullWidth: boolean;
  $iconFill?: string;
  $skeleton: boolean;
  $disabled: boolean;
  $disableHoverColor: boolean;
  $color?: string;
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  cursor: ${({ $disabled, $skeleton, $variant }) => {
    if ($disabled) {
      return 'not-allowed';
    }
    if ($skeleton) {
      return 'progress';
    }
    if ($variant === 'help') {
      return 'help';
    } 

    return 'pointer';
  }};

  ${({
    theme, $disabled, $variant, $skeleton, $color
  }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${$disabled || $skeleton ? ($color ?? theme.default.colors.grayScale.gray2) : ($color ?? theme.colors.accent.primary)};
          box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.40) inset;
          opacity: 1;

          ${!$disabled && !$skeleton && css`
            &:hover {
              background: ${$color ?? theme.colors.accent.strong};
            }
            &:active {
              background: ${$color ?? theme.colors.accent.strongDown};
              transform: translateY(1px);
            }
          `}
        `;
      case 'primary-transparent':
        return css`
          background: ${$disabled || $skeleton ? ($color ?? theme.default.colors.grayScale.gray2) : ($color ?? theme.colors.accent.primary)};
          box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.40) inset;
          opacity: ${$disabled || $skeleton ? 1 : 0.5};

          ${!$disabled && !$skeleton && css`
            &:hover {
              background: ${$color ?? theme.colors.accent.strong};
              opacity: 1;
            }
            &:active {
              background: ${$color ?? theme.colors.accent.strongDown};
              transform: translateY(1px);
            }
          `}
        `;

      case 'primary-outline':
        return css`
          background: ${$disabled || $skeleton ? theme.default.colors.grayScale.gray2 : ($color ?? 'rgba(255, 255, 255, 0)')};
          box-shadow: 0px 0px 0px 1px ${theme.colors.accent.primary} inset;

          ${!$disabled && !$skeleton && css`
            &:hover {
              background: ${$color ?? theme.colors.accent.strong};
              box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.40) inset;
            }
            &:active {
              background: ${$color ?? theme.colors.accent.strongDown};
              transform: translateY(1px);
              box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.40) inset;
            }
          `}
        `;
      case 'secondary':
        return css`
          background: ${$color ?? theme.colors.grayScale.gray4};
          box-shadow: 0px 0px 0px 1px ${theme.colors.grayScale.gray2} inset;

          ${!$disabled && !$skeleton && css`
            &:hover {
              background: ${$color ?? theme.colors.grayScale.gray2};
              box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.40) inset;
            }
            &:active {
              background: ${$color ?? theme.colors.grayScale.gray3};
              transform: translateY(1px);
            }
          `}
        `;
      case 'success':
        return css`
          background: ${$disabled || $skeleton ? ($color ?? theme.colors.grayScale.gray2) : theme.colors.green};
          box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.40) inset;
          opacity: 1;

          ${!$disabled && !$skeleton && css`
            &:hover {
              background: ${theme.colors.accent.strong};
            }
            &:active {
              background: ${theme.colors.accent.strongDown};
              transform: translateY(1px);
            }
          `}
        `;
      case 'text':
      case 'help':
        return css`
          background: rgba(255, 255, 255, 0);
          box-shadow: none;

          ${!$disabled && !$skeleton && css`
            &:active {
              transform: translateY(1px);
            }
          `}
        `;
    }
  }}

  ${({ $variant, $icon, $size }) => {
    switch ($variant) {
      case 'primary':
      case 'primary-transparent':
      case 'primary-outline':
      case 'secondary':
      case 'success':
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
      case 'help':
        return css`
          padding: 0px;
        `;
    }
  }}
  ${({ $variant, $icon, $corner }) => {
    switch ($variant) {
      case 'primary':
      case 'primary-transparent':
      case 'primary-outline':
      case 'secondary':
      case 'success':
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
      case 'help':
        return css``;
    }
  }}
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  ${({
    theme, $variant, $icon, $iconFill, $disabled, $disableHoverColor
  }) => {
    if ($variant !== 'text' || $disabled || $disableHoverColor) {
      return css``;
    }
    if ($icon) {
      return css`
        svg path {
          fill: ${$iconFill ?? theme.colors.grayScale.gray1} !important;
        }
        &:hover {
          svg path {
            fill: ${theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white} !important;
          }
        }
      `;
    }

    return css`
      &:hover {
        ${ButtonText} {
          color: ${theme.colors.accent.primary};
        }
        svg path {
          fill: ${theme.colors.accent.primary} !important;
        }
      }
    `;
  }}
  ${({ theme, $variant }) => $variant === 'help' && css`
    &:hover {
      svg path {
        fill: ${theme.colors.base.white} !important;
      }
    }
  `}
  ${({ theme, $variant }) => $variant === 'primary-outline' && theme.mode === 'light' && css`
    &:hover,
    &:active {
      ${ButtonText} {
        color: ${theme.colors.base.black};
      }
      svg path {
        fill: ${theme.colors.base.black};
      }
    }
  `}

  transition: background 0.3s ease-out, 
              box-shadow 0.2s ease-out, 
              transform 0.3s ease-out;
`;

export interface ButtonTextProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $disabled: boolean;
}

export const ButtonText = styled.span<ButtonTextProps>`
  display: inline-flex;
  width: auto;
  font-weight: 500;
  color: ${({ theme, $variant, $disabled }) => {
    if ($disabled) {
      return theme.colors.grayScale.gray1;
    }

    switch ($variant) {
      case 'primary':
      case 'primary-transparent':
        return theme.default.colors.base.white;
      case 'primary-outline':
        return theme.mode === 'light' 
          ? theme.default.colors.base.black 
          : theme.colors.base.white;
      default:
        return theme.colors.base.white;
    }
  }};
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
`;
