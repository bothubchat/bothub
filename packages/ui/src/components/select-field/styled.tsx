import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { Skeleton } from '@/ui/components/skeleton';
import { SelectFieldPlacement, SelectFieldSize } from './types';
import { Chip } from '@/ui/components/chip';
import { LoaderCircularGradientIcon } from '@/ui/icons/loader-circular-gradient';
import { SearchCircleIcon } from '@/ui/icons/search-circle';
import { Button } from '@/ui/components/button';
import { CloseIcon } from '@/ui/icons/close';
import { ScrollableTabs } from '../scrollable-tabs';
import { TextField } from '../text-field';
import { SearchSimpleIcon } from '@/ui/icons';

export interface SelectFieldStyledProps {
  $fullWidth: boolean;
  $disabled: boolean;
}

export const SelectFieldStyled = styled.div<SelectFieldStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  ${({ $fullWidth }) =>
    !$fullWidth &&
    css`
      max-width: 259px;
    `}
  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}
  ${({ $disabled }) =>
    !$disabled &&
    css`
      cursor: default;
    `}
`;

export const SelectFieldLabel = styled(Typography).attrs({
  variant: 'input-sm'
})`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  cursor: inherit;
  width: 100%;
`;

export interface SelectFieldInputProps {
  $open: boolean;
  $error: boolean;
  $disabled: boolean;
  $skeleton: boolean;
  $blur: boolean;
  $loading: boolean;
  $multiple: boolean;
}

export const SelectFieldInput = styled.div<SelectFieldInputProps>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 12px;
  user-select: none;
  border: 1px solid
    ${({ theme, $disabled, $error, $open, $skeleton }) => {
      if ($disabled || $skeleton) {
        return theme.colors.grayScale.gray5;
      }
      if ($error) {
        return theme.colors.critic;
      }
      if ($open) {
        return theme.colors.accent.primary;
      }

      return theme.colors.grayScale.gray2;
    }};
  border-radius: 10px;
  ${({ $multiple }) => {
    if ($multiple) {
      return css`
        padding: 10px;
        padding-right: 16px;
      `;
    }

    return css`
      padding: 14px 16px;
    `;
  }}
  box-sizing: border-box;
  background: ${({ theme, $disabled, $skeleton, $blur }) => {
    if ($disabled || $skeleton) {
      return theme.colors.grayScale.gray3;
    }
    if ($blur) {
      return theme.mode === 'light'
        ? 'rgba(255, 255, 255, 0.65)'
        : 'rgba(18, 24, 37, 0.75)';
    }

    return theme.mode === 'light'
      ? theme.default.colors.base.white
      : theme.colors.grayScale.gray4;
  }};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  cursor: ${({ $disabled, $skeleton, $loading }) => {
    if ($skeleton || $loading) {
      return 'progress';
    }
    if ($disabled) {
      return 'not-allowed';
    }

    return 'pointer';
  }};
  ${({ theme, $error, $disabled, $skeleton }) =>
    !$error &&
    !$disabled &&
    !$skeleton &&
    css`
      &:hover {
        border-color: ${theme.colors.accent.primary};
      }
    `}
  ${({ $disabled, $open }) => {
    if ($disabled) {
      return css`
        ${SelectFieldClearButton} {
          visibility: hidden;
        }
      `;
    }

    return css`
      ${SelectFieldClearButton} {
        visibility: ${$open ? 'visible' : 'hidden'};
      }
      &:hover {
        ${SelectFieldClearButton} {
          visibility: visible;
        }
      }
    `;
  }}
`;

export const SelectFieldInputSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SelectFieldInputLeftSide = styled(SelectFieldInputSide)`
  width: 100%;
`;

export interface SelectFieldSearchIconProps {
  $focus: boolean;
}

export const SelectFieldSearchIcon = styled(SearchCircleIcon).attrs({
  size: 16
})<SelectFieldSearchIconProps>`
  path {
    fill: ${({ theme, $focus }) => {
      if ($focus) {
        return theme.colors.base.white;
      }

      return theme.colors.grayScale.gray1;
    }};
  }
`;

export const SelectFieldInputNative = styled.input`
  display: inline-flex;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.base.white};
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  padding: 0px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray1};
  }
  &:focus::placeholder {
    color: ${({ theme }) =>
      theme.mode === 'light'
        ? theme.colors.grayScale.gray1
        : theme.colors.grayScale.gray6};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.base.white};
    box-shadow: 0 0 0 100px ${({ theme }) => theme.colors.grayScale.gray4} inset !important;
  }
  &:-webkit-autofill:focus {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.base.white};
    box-shadow: 0 0 0 100px ${({ theme }) => theme.colors.grayScale.gray4} inset !important;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`;

export const SelectFieldClearButton = styled(Button).attrs({
  variant: 'text',
  iconSize: 12,
  children: <CloseIcon />
})``;

export const SelectFieldValue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const SelectFieldValueText = styled(Typography).attrs({
  variant: 'input-sm'
})``;

export interface SelectFieldValueColorProps {
  $color: string;
}

export const SelectFieldValueColor = styled.span<SelectFieldValueColorProps>`
  display: inline-flex;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
  border-radius: 4px;
`;

export const SelectFieldColorValueText = styled(Typography).attrs({
  variant: 'input-sm'
})`
  color: ${({ theme }) => theme.colors.base.white};
`;

export const SelectFieldValues = styled.div`
  display: flex;
  width: 100%;
`;

export const SelectFieldValueList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
`;

export const SelectFieldValueListItem = styled(Chip)``;

export interface SelectFieldPlaceholderProps {
  $open: boolean;
}

export const SelectFieldPlaceholder = styled(Typography).attrs({
  variant: 'input-sm'
})<SelectFieldPlaceholderProps>`
  color: ${({ $open, theme }) => {
    if ($open) {
      return theme.colors.grayScale.gray6;
    }

    return theme.colors.grayScale.gray1;
  }};
`;

export const SelectFieldLoader = styled(LoaderCircularGradientIcon)``;

export const SelectFieldArrow = styled(ArrowDownIcon).attrs({ size: 16 })`
  transition: transform 0.2s ease-in-out;
`;

export interface SelectFieldBlockProps {
  $contentWidth?: number;
}

export const SelectFieldBlock = styled.div<SelectFieldBlockProps>`
  display: flex;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.select};
  width: ${({ $contentWidth }) => $contentWidth}px;
  min-width: 200px;
  width: 100%;
  box-sizing: border-box;
`;

export interface SelectFieldBlockPositionWrapperProps {
  $blur: boolean;
  $placement: SelectFieldPlacement;
}

export const SelectFieldBlockPositionWrapper = styled.div<SelectFieldBlockPositionWrapperProps>`
  display: flex;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding: 6px 0 6px 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 10px;
  background: ${({ theme, $blur }) => {
    if ($blur) {
      return theme.mode === 'light'
        ? 'rgba(255, 255, 255, 0.65)'
        : 'rgba(18, 24, 37, 0.75)';
    }

    return theme.mode === 'light'
      ? theme.default.colors.base.white
      : theme.colors.grayScale.gray4;
  }};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  ${({ $placement }) => {
    switch ($placement) {
      case 'bottom-left':
        return css`
          top: 0px;
          margin-top: 10px;
        `;
      case 'top-left':
      case 'top-right':
        return css`
          bottom: 0px;
          margin-bottom: 10px;
        `;
    }
  }}
`;

export const SelectFieldBlockContent = styled.div`
  display: flex;
  width: 100%;
`;

export const SelectFieldErrorText = styled(Typography).attrs({
  variant: 'input-sm'
})`
  display: inline-flex;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.critic};
`;

export const SelectFieldSkeleton = styled(Skeleton)`
  width: 100%;
  height: 18px;
`;

export interface SelectFieldGroupsProps {
  $size: SelectFieldSize;
}

export const SelectFieldGroups = styled.div<SelectFieldGroupsProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 4;
      case 'md':
        return 6;
      case 'large':
        return 8;
    }
  }}px;
`;

export const SelectFieldTabsContainer = styled.div`
  width: 100%;
  padding-right: 8px;
`;

export const SelectFieldTabs = styled(ScrollableTabs).attrs({
  variant: 'secondary'
})``;

export const SelectFieldSearch = styled(TextField).attrs({
  fullWidth: true,
  startIcon: <SearchSimpleIcon />,
  variant: 'secondary'
})`
  padding-right: 8px;
`;
