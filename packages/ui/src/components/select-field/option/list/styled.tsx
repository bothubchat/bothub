import { styled, css } from 'styled-components';
import { SelectFieldSize } from '@/ui/components/select-field/types';
import { Typography } from '@/ui/components/typography';

export interface SelectFieldOptionsStyledProps {
  $size: SelectFieldSize;
}

export const SelectFieldOptionsStyled = styled.div<SelectFieldOptionsStyledProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 4;
      case 'md':
        return 6;
    }
  }}px;
`;

export const SelectFieldDivider = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
`;

export interface SelectFieldEmptyProps {
  $size: SelectFieldSize;
}

export const SelectFieldEmpty = styled.div<SelectFieldEmptyProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 8;
      case 'md':
        return 12;
    }
  }}px;
`;

export const SelectFieldEmptyText = styled(Typography).attrs({
  variant: 'input-sm'
})`
  text-align: center;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export interface SelectFieldOptionProps {
  $selected: boolean;
  $disabled: boolean;
  $size: SelectFieldSize;
  $backgroundHoverColor?: 'gradient' | 'primary';
}

export interface SelectFieldOptionTextProps {
  $selected: boolean;
  $bold?: boolean;
}

export const SelectFieldOptionText = styled(Typography).attrs({
  variant: 'input-sm'
})<SelectFieldOptionTextProps>`
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
  variant: 'input-sm'
})<SelectFieldColorOptionTextProps>`
  color: ${({ theme, $selected }) =>
    $selected ? theme.default.colors.base.white : theme.colors.base.white};
`;
export const SelectFieldOption = styled.div<SelectFieldOptionProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 8;
      case 'md':
        return 12;
    }
  }}px;
  border-radius: 6px;
  gap: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 8;
      case 'md':
        return 10;
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

  ${({ theme, $selected, $disabled, $backgroundHoverColor }) => {
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
            left: 0;
            top: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
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
          &:hover::before {
            background: ${theme.colors.accent.primary};
            content: '';
            opacity: 0.2;
            border: inherit;
            left: 0;
            top: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            position: absolute;
          }
        `;
      default:
        return css`
          ${!$selected &&
          `
            cursor: pointer;
            &:hover {
              background: ${theme.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
            }
          `}
          ${$selected &&
          `
            background: ${theme.colors.accent.primary};
            cursor: default;
          `}
        `;
    }
  }}
`;

export const SelectFieldOptionSide = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SelectFieldOptionLabel = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  padding-right: 8px;
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
