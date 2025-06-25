import { css, keyframes, styled } from 'styled-components';
import React from 'react';
import { ButtonCorner, ButtonSize, ButtonVariant } from './types';
import { isBright } from '@/ui/utils/colors';

const boxShadowAnimation = (initialColor: string) => keyframes`
  0% {
    box-shadow: 0px 0px 0px 1px ${initialColor} inset;
  }
  10% {
    box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.4) inset;
  }
  80% {
    box-shadow: 0px 0.9px 0px 0px rgba(255, 255, 255, 0.4) inset;
  }
  100% {
    box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.4) inset;
  }
`;

const reverseBoxShadowAnimation = (initialColor: string) => keyframes`
  0% {
    box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.4) inset;
  }
  10% {
    box-shadow: 0px 0.9px 0px 0px rgba(255, 255, 255, 0.4) inset;
  }
  50% {
    box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.4) inset;
  }
  100% {
    box-shadow: 0px 0px 0px 1px ${initialColor} inset;
  }
`;

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

  ${({ theme, $disabled, $variant, $skeleton, $color }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${$color ??
          ($disabled || $skeleton
            ? theme.colors.grayScale.gray3
            : theme.colors.accent.primary)};
          box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.4) inset;
          opacity: 1;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${$color ?? theme.colors.accent.strong};
            }
            &:active {
              background: ${$color ?? theme.colors.accent.strongDown};
            }
          `}
        `;
      case 'primary-transparent':
        return css`
          background: ${$color ??
          ($disabled || $skeleton
            ? theme.colors.grayScale.gray3
            : theme.colors.accent.primary)};
          box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.4) inset;
          opacity: ${$disabled || $skeleton ? 1 : 0.5};

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              opacity: 1;
            }
          `}
        `;

      case 'primary-outline':
        return css`
          background: ${$disabled || $skeleton
            ? theme.colors.grayScale.gray3
            : 'rgba(255, 255, 255, 0)'};

          box-shadow: ${$disabled || $skeleton
            ? 'box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.0) inset;'
            : `0px 0px 0px 1px ${theme.colors.accent.primary} inset`};
          animation: ${reverseBoxShadowAnimation(theme.colors.accent.primary)}
            0.3s linear forwards;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${$color ?? theme.colors.accent.primary};
              animation: ${boxShadowAnimation(theme.colors.accent.primary)} 0.3s
                linear forwards;
            }
            &:active {
              background: ${$color ?? theme.colors.accent.strongDown};
              transform: translateY(1px);
              box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0) inset;
            }
          `}
        `;
      case 'secondary':
        return css`
          background: ${$color ?? theme.colors.grayScale.gray4};
          box-shadow: 0px 0px 0px 1px ${theme.colors.grayScale.gray2} inset;
          animation: ${reverseBoxShadowAnimation(theme.colors.grayScale.gray2)}
            0.3s linear forwards;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${$color ?? theme.colors.grayScale.gray2};
              animation: ${boxShadowAnimation(theme.colors.grayScale.gray2)}
                0.3s linear forwards;
            }
            &:active {
              background: ${$color ?? theme.colors.grayScale.gray3};
            }
          `}
        `;
      case 'gradient':
        return css`
          background: ${$color ?? theme.colors.gradient.elite20};
          box-shadow: 0px 0px 0px 1px ${theme.colors.gradient.elite20} inset;
          animation: ${reverseBoxShadowAnimation(theme.colors.gradient.elite20)}
            0.3s linear forwards;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${$color ?? theme.colors.gradient.elite20};
              animation: ${boxShadowAnimation(theme.colors.gradient.elite20)}
                0.3s linear forwards;
            }
            &:active {
              background: ${$color ?? theme.colors.gradient.elite20};
            }
          `}
        `;
      case 'success':
        return css`
          background: ${$disabled || $skeleton
            ? ($color ?? theme.colors.grayScale.gray2)
            : theme.colors.green};
          box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.4) inset;
          opacity: 1;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${theme.colors.accent.strong};
            }
            &:active {
              background: ${theme.colors.accent.strongDown};
            }
          `}
        `;
      case 'text':
      case 'help':
        return css`
          background: rgba(255, 255, 255, 0);
          box-shadow: none;
        `;
    }
  }}
  ${({ $disabled, $skeleton }) =>
    !$disabled &&
    !$skeleton &&
    css`
      &:active {
        transform: translateY(1px);
      }
    `}

  ${({ $variant, $icon, $size }) => {
    switch ($variant) {
      case 'primary':
      case 'primary-transparent':
      case 'gradient':
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
      case 'gradient':
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
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  ${({ theme, $variant, $icon, $iconFill, $disabled, $disableHoverColor }) => {
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
            fill: ${theme.mode === 'light'
              ? theme.default.colors.accent.primary
              : theme.colors.base.white} !important;
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
  ${({ theme, $variant }) =>
    $variant === 'help' &&
    css`
      &:hover {
        svg path {
          fill: ${theme.colors.base.white} !important;
        }
      }
    `}
  ${({ theme, $variant }) =>
    $variant === 'primary-outline' &&
    theme.mode === 'light' &&
    css`
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

  transition: background-color 0.3s ease-out, 
              opacity 0.3s ease-out,
              box-shadow 0.2s ease-in-out, 
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
  transition: color 0.3s ease-out;
  color: ${({ theme, $variant, $disabled }) => {
    if ($disabled) {
      return theme.colors.grayScale.gray1;
    }

    switch ($variant) {
      case 'primary':
      case 'primary-transparent':
        if (theme.scheme === 'custom') {
          if (theme.bright) {
            return isBright(theme.colors.custom.interface.text)
              ? theme.mode === 'dark'
                ? theme.colors.base.black
                : theme.default.colors.base.black
              : theme.colors.custom.interface.text;
          }

          return isBright(theme.colors.custom.interface.text)
            ? theme.colors.custom.interface.text
            : theme.default.colors.base.white;
        }

        if (theme.bright) {
          return theme.mode === 'dark'
            ? theme.colors.base.black
            : theme.colors.base.white;
        }
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
