import { css, styled } from 'styled-components';
import { SelectFieldSize } from '../../types';
import { SelectFieldOptionSide } from '../list/styled';
import { Typography, TypographyProps } from '@/ui/components/typography';
import { colorToRgba } from '@/ui/utils';

export interface SelectFieldOptionTextProps {
  $selected: boolean;
  $bold?: boolean;
}

export const SelectFieldOptionText = styled(Typography).attrs<
  SelectFieldOptionTextProps & { $size: SelectFieldSize }
>(({ $size }) => {
  const variant: TypographyProps['variant'] =
    $size === 'small'
      ? 'input-sm'
      : $size === 'md'
        ? 'button-sm'
        : 'body-m-semibold';

  return { variant };
})`
  color: ${({ theme, $selected }) =>
    $selected ? theme.default.colors.base.white : theme.colors.base.white};

  ${({ $bold }) =>
    $bold &&
    css`
      font-weight: 500;
    `}
`;

export interface SelectFieldColorOptionTextProps {
  $selected: boolean;
}

export const SelectFieldColorOptionText = styled(Typography).attrs({
  variant: 'input-sm',
})<SelectFieldColorOptionTextProps>`
  color: ${({ theme, $selected }) =>
    $selected ? theme.default.colors.base.white : theme.colors.base.white};
`;

export interface SelectFieldOptionColorProps {
  $color: string;
}

export const SelectFieldOptionColor = styled.span<SelectFieldOptionColorProps>`
  display: inline-flex;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  ${({ $color }) => css`
    background: ${$color};
  `}
`;

export interface SelectFieldOptionStyledProps {
  $selected: boolean;
  $disabled: boolean;
  $size: SelectFieldSize;
  $selectedColor?: string;
  $backgroundHoverColor?: 'gradient' | 'primary';
}

export const SelectFieldOptionStyled = styled.div<SelectFieldOptionStyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return '8px';
      case 'md':
        return '12px';
      case 'large':
        return '8px 10px';
    }
  }};
  border-radius: 6px;
  gap: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 8;
      case 'md':
        return 10;
      case 'large':
        return 8;
    }
  }}px;

  &:active {
    background-color: ${({ theme }) => theme.colors.accent.primary} !important;
    ${SelectFieldOptionText}, ${SelectFieldColorOptionText} {
      color: ${({ theme }) => theme.default.colors.base.white};
    }
    svg[d='fill'] path,
    svg[d='all'] path {
      fill: ${({ theme }) => theme.default.colors.base.white} !important;
    }
    svg[d='stroke'] path,
    svg[d='all'] path {
      stroke: ${({ theme }) => theme.default.colors.base.white} !important;
    }
    transition: all 0.2s ease-out;
  }

  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;

  ${({
    theme,
    $selected,
    $disabled,
    $selectedColor,
    $backgroundHoverColor,
  }) => {
    if ($disabled) {
      return css`
        cursor: not-allowed;
        &:hover {
          background: ${theme.mode === 'light'
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.05)'};
        }
        > ${SelectFieldOptionSide}:first-child {
          opacity: 0.5;
        }
      `;
    }
    switch ($backgroundHoverColor) {
      case 'gradient':
        return css`
          cursor: pointer;
          position: relative;
          overflow: hidden;
          justify-content: center;
          padding-top: 12px;
          padding-bottom: 12px;
          &:hover::before {
            background: ${theme.colors.premiumGradient};
            content: '';
            opacity: 0.2;
            border: inherit;
            inset: 0;
            z-index: -1;
            position: absolute;
          }
        `;
      case 'primary':
        return css`
          cursor: pointer;
          position: relative;
          overflow: hidden;
          justify-content: center;
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: center;
          &:hover {
            background: ${colorToRgba(theme.colors.accent.primary, 0.2)};
          }
        `;
      default:
        return $selected
          ? css`
              background: ${$selectedColor || theme.colors.accent.primary};
              cursor: default;
            `
          : css`
              cursor: pointer;
              &:hover {
                background: ${theme.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.05)'
                  : 'rgba(255, 255, 255, 0.05)'};
              }
            `;
    }
  }}
`;
