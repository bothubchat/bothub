import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons';
import { Skeleton } from '@/ui/components/skeleton';

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
  ${({ $fullWidth }) => !$fullWidth && css`
    max-width: 259px;
  `}
  ${({ $disabled }) => $disabled && css`
    cursor: not-allowed; 
  `}
  ${({ $disabled }) => !$disabled && css`
    cursor: default;
  `}
`;

export const SelectFieldLabel = styled(Typography).attrs({ variant: 'input-sm' })`
  margin-bottom: 8px;
  cursor: inherit;
`;

export const SelectFieldSelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export interface SelectFieldHeadProps {
  $open: boolean;
  $error: boolean;
  $disabled: boolean;
  $skeleton: boolean;
}

export const SelectFieldHead = styled.div<SelectFieldHeadProps>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  user-select: none;
  border: 1px solid ${({
    theme, $disabled, $error, $open, $skeleton 
  }) => {
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
  padding: 14px 16px;
  box-sizing: border-box;
  background: ${({ theme, $disabled, $skeleton }) => {
    if ($disabled || $skeleton) {
      return theme.colors.grayScale.gray3;
    }

    return theme.colors.grayScale.gray4;
  }};
  cursor: ${({ $disabled, $skeleton }) => {
    if ($skeleton) {
      return 'progress';
    }
    if ($disabled) {
      return 'not-allowed';
    }

    return 'pointer';
  }};
  ${({
    theme, $error, $disabled, $skeleton 
  }) => (!$error && !$disabled && !$skeleton) && css`
    &:hover {
      border-color: ${theme.colors.accent.primary};
    }
  `}
`;

export const SelectFieldBody = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

export const SelectFieldBodyBackgroundWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.select};
  top: 10px;
  width: inherit;
  box-sizing: border-box;
  padding: 6px 8px;
  padding-right: 4px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
`;

export const SelectFieldScrollbarWrapper = styled.div`
  display: flex;
  width: inherit;
  max-height: 185px;
  overflow: auto;
  padding-right: 4px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent.primary};
    border-radius: 2px;
  }
`;

export const SelectFieldBodyContent = styled.div`
  display: flex;
  width: inherit;
`;

export const SelectFieldValue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const SelectFieldValueText = styled(Typography).attrs({ variant: 'input-sm' })``;

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

export const SelectFieldColorValueText = styled(Typography).attrs({ variant: 'input-sm' })`
  color: ${({ theme }) => theme.colors.base.white};
`;

export interface SelectFieldPlaceholderProps {
  $open: boolean;
}

export const SelectFieldPlaceholder = styled(Typography).attrs({ variant: 'input-sm' })<SelectFieldPlaceholderProps>`
  color: ${({ $open, theme }) => {
    if ($open) {
      return theme.colors.grayScale.gray6;
    }

    return theme.colors.grayScale.gray1;
  }};
`;

export const SelectFieldArrow = styled(ArrowDownIcon).attrs({ size: 16 })``;

export const SelectFieldOptionList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4px;
`;

export interface SelectFieldOptionProps {
  $selected: boolean;
}

export const SelectFieldOption = styled.div<SelectFieldOptionProps>`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  gap: 8px;
  ${({ theme, $selected }) => {
    if ($selected) {
      return css`
        cursor: default;
        background: ${({ theme }) => theme.colors.accent.primary};
      `;
    }

    return css`
      cursor: pointer;
      &:hover {
        background: ${theme.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
      }
    `;
  }}
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

export interface SelectFieldOptionTextProps {
  $selected: boolean;
}

export const SelectFieldOptionText = styled(Typography).attrs({ variant: 'input-sm' })<SelectFieldOptionTextProps>`
  color: ${({ theme, $selected }) => ($selected ? theme.default.colors.base.white : theme.colors.base.white)};
`;

export interface SelectFieldColorOptionTextProps {
  $selected: boolean;
}

export const SelectFieldColorOptionText = styled(Typography).attrs({ variant: 'input-sm' })<SelectFieldColorOptionTextProps>`
  color: ${({ theme, $selected }) => ($selected ? theme.default.colors.base.white : theme.colors.base.white)};
`;

export const SelectFieldErrorText = styled(Typography).attrs({ variant: 'input-sm' })`
  display: inline-flex;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.critic};
`;

export const SelectFieldSkeleton = styled(Skeleton)`
  width: 100%;
  height: 18px;
`;
