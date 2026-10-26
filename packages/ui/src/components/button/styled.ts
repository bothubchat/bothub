import { css, keyframes, styled } from 'styled-components';
import React from 'react';
import { ButtonCorner, ButtonSize, ButtonVariant } from './types';
import { ThemeMode, themeVar } from '@/ui/theme';

type Keyframes = ReturnType<typeof keyframes>;

// Keyframes depend only on the theme color, so build them once per color
// instead of on every render.
const boxShadowAnimations = new Map<string, Keyframes>();
const reverseBoxShadowAnimations = new Map<string, Keyframes>();

const boxShadowAnimation = (initialColor: string): Keyframes => {
  let animation = boxShadowAnimations.get(initialColor);
  if (!animation) {
    animation = keyframes`
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
    boxShadowAnimations.set(initialColor, animation);
  }

  return animation;
};

const reverseBoxShadowAnimation = (initialColor: string): Keyframes => {
  let animation = reverseBoxShadowAnimations.get(initialColor);
  if (!animation) {
    animation = keyframes`
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
    reverseBoxShadowAnimations.set(initialColor, animation);
  }

  return animation;
};

const buttonColorProperty = '--bothub-button-color';

export interface ButtonStyledProps {
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
  /** Mode of the current theme: styles may get a theme of CSS variables. */
  $mode: ThemeMode;
}

// `$color` goes through a CSS custom property, so arbitrary colors share one
// generated class instead of adding a rule per color.
export const ButtonStyled = styled.button.attrs<ButtonStyledProps>(
  ({ $color, style }) =>
    $color
      ? {
          style: {
            ...style,
            [buttonColorProperty]: $color,
          } as React.CSSProperties,
        }
      : {},
)`
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

  svg path {
    transition: fill 0.2s;
  }

  ${({ theme, $disabled, $variant, $skeleton, $color }) => {
    const color = $color ? `var(${buttonColorProperty})` : undefined;

    switch ($variant) {
      case 'primary': {
        let backgroundColor: string;

        if (color) {
          backgroundColor = color;
        } else if ($disabled || $skeleton) {
          backgroundColor = themeVar(theme, 'colors.grayScale.gray3');
        } else {
          backgroundColor = themeVar(theme, 'tokens.buttonPrimaryBackground');
        }

        return css`
          background: ${backgroundColor};
          box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.4) inset;
          opacity: 1;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${color ?? themeVar(theme, 'colors.accent.strong')};
            }
            &:active {
              background: ${color ??
              themeVar(theme, 'colors.accent.strongDown')};
            }
          `}
        `;
      }
      case 'primary-transparent':
        return css`
          background: ${color ??
          ($disabled || $skeleton
            ? themeVar(theme, 'colors.grayScale.gray3')
            : themeVar(theme, 'colors.accent.primary'))};
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
            ? themeVar(theme, 'colors.grayScale.gray3')
            : 'rgba(255, 255, 255, 0)'};

          box-shadow: ${$disabled || $skeleton
            ? 'box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.0) inset;'
            : `0px 0px 0px 1px ${themeVar(theme, 'colors.accent.primary')} inset`};
          animation: ${reverseBoxShadowAnimation(
              themeVar(theme, 'colors.accent.primary'),
            )}
            0.3s linear forwards;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${color ?? themeVar(theme, 'colors.accent.primary')};
              animation: ${boxShadowAnimation(
                  themeVar(theme, 'colors.accent.primary'),
                )}
                0.3s linear forwards;
            }
            &:active {
              background: ${color ??
              themeVar(theme, 'colors.accent.strongDown')};
              transform: translateY(1px);
              box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0) inset;
            }
          `}
        `;
      case 'secondary':
        return css`
          background: ${color ?? themeVar(theme, 'colors.grayScale.gray4')};
          box-shadow: 0px 0px 0px 1px
            ${themeVar(theme, 'colors.grayScale.gray2')} inset;
          animation: ${reverseBoxShadowAnimation(
              themeVar(theme, 'colors.grayScale.gray2'),
            )}
            0.3s linear forwards;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${color ?? themeVar(theme, 'colors.grayScale.gray2')};
              animation: ${boxShadowAnimation(
                  themeVar(theme, 'colors.grayScale.gray2'),
                )}
                0.3s linear forwards;
            }
            &:active {
              background: ${color ?? themeVar(theme, 'colors.grayScale.gray3')};
            }
          `}
        `;
      case 'gradient':
        return css`
          background: ${color ?? themeVar(theme, 'colors.gradient.elite20')};
          box-shadow: 0px 0px 0px 1px
            ${themeVar(theme, 'colors.gradient.elite20')} inset;
          animation: ${reverseBoxShadowAnimation(
              themeVar(theme, 'colors.gradient.elite20'),
            )}
            0.3s linear forwards;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${color ??
              themeVar(theme, 'colors.gradient.elite20')};
              animation: ${boxShadowAnimation(
                  themeVar(theme, 'colors.gradient.elite20'),
                )}
                0.3s linear forwards;
            }
            &:active {
              background: ${color ??
              themeVar(theme, 'colors.gradient.elite20')};
            }
          `}
        `;
      case 'success':
        return css`
          background: ${$disabled || $skeleton
            ? (color ?? themeVar(theme, 'colors.grayScale.gray2'))
            : themeVar(theme, 'colors.green')};
          box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.4) inset;
          opacity: 1;

          ${!$disabled &&
          !$skeleton &&
          css`
            &:hover {
              background: ${themeVar(theme, 'colors.accent.strong')};
            }
            &:active {
              background: ${themeVar(theme, 'colors.accent.strongDown')};
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
          fill: ${$iconFill ??
          themeVar(theme, 'colors.grayScale.gray1')} !important;
        }
        &:hover {
          svg path {
            fill: ${themeVar(theme, 'tokens.accentContrast')} !important;
          }
        }
      `;
    }

    return css`
      &:hover {
        ${ButtonText} {
          color: ${themeVar(theme, 'colors.accent.primary')};
        }
        svg path {
          fill: ${themeVar(theme, 'colors.accent.primary')} !important;
        }
      }
    `;
  }}
  ${({ theme, $variant }) =>
    $variant === 'help' &&
    css`
      &:hover {
        svg path {
          fill: ${themeVar(theme, 'colors.base.white')} !important;
        }
      }
    `}
  ${({ theme, $variant, $mode }) =>
    $variant === 'primary-outline' &&
    $mode === 'light' &&
    css`
      &:hover,
      &:active {
        ${ButtonText} {
          color: ${themeVar(theme, 'colors.base.black')};
        }
        svg path {
          fill: ${themeVar(theme, 'colors.base.black')};
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
      return themeVar(theme, 'colors.grayScale.gray1');
    }

    switch ($variant) {
      case 'primary':
      case 'primary-transparent':
        return themeVar(theme, 'tokens.buttonPrimaryText');
      case 'primary-outline':
        return themeVar(theme, 'tokens.textStrong');
      default:
        return themeVar(theme, 'colors.base.white');
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
