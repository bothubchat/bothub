import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';
import { Button } from '@/ui/components/button';
import { CloseIcon } from '@/ui/icons/close';
import { Variant } from './types';

export interface VariantProps {
  $variant: Variant;
}

export interface TextFieldStyledProps {
  $fullWidth: boolean;
  $disabled: boolean;
}

export const TextFieldStyled = styled.div<TextFieldStyledProps>`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '420px')};
  box-sizing: border-box;
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

export const TextFieldLabel = styled(Typography).attrs({ variant: 'input-sm' })`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  width: 100%;
  cursor: inherit;
`;

export interface TextFieldBlockProps extends VariantProps {
  $error: boolean;
  $focus: boolean;
  $hover: boolean;
  $disabled: boolean;
  $skeleton: boolean;
}

export const TextFieldBlock = styled.label<TextFieldBlockProps>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  cursor: ${({ $disabled, $skeleton }) => {
    if ($skeleton) {
      return 'progress';
    }

    return $disabled ? 'not-allowed' : 'text';
  }};
  padding: 0px ${({ $variant }) => ($variant === 'primary' ? 16 : 10)}px;
  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
    `};

  ${({ theme, $error, $hover, $focus, $disabled, $skeleton }) => {
    if ($disabled || $skeleton) {
      return css`
        border-color: ${({ theme }) => theme.colors.grayScale.gray2};
      `;
    }
    if ($error) {
      return css`
        border-color: ${theme.colors.critic};
      `;
    }

    return (
      ($hover || $focus) &&
      css`
        border-color: ${theme.colors.accent.primary};
      `
    );
  }}
  ${({ theme, $focus, $disabled, $skeleton, $variant }) => {
    if ($disabled || $skeleton) {
      return css`
        background: ${theme.colors.grayScale.gray3};
      `;
    }

    if ($focus) {
      if (theme.scheme === 'custom') {
        return css`
        background: ${theme.colors.grayScale.gray2};
        > svg path {
          fill: ${theme.colors.accent.primary};
      `;
      }

      return css`
        background: ${theme.mode === 'light'
          ? $variant === 'primary'
            ? theme.default.colors.base.white
            : theme.colors.grayScale.gray7
          : $variant === 'primary'
            ? theme.colors.grayScale.gray4
            : theme.colors.grayScale.gray7};
        > svg path {
          fill: ${theme.mode === 'light'
            ? theme.default.colors.accent.primary
            : theme.colors.base.white};
        }
      `;
    }

    if (theme.scheme === 'custom') {
      return css`
        background: ${theme.colors.grayScale.gray7};
        > svg path {
          fill: ${theme.colors.grayScale.gray1};
      `;
    }

    return css`
      background: ${theme.mode === 'light'
        ? $variant === 'primary'
          ? theme.default.colors.base.white
          : theme.colors.grayScale.gray7
        : $variant === 'primary'
          ? theme.colors.grayScale.gray4
          : theme.colors.grayScale.gray7};
      > svg path {
        fill: ${theme.colors.grayScale.gray1};
      }
    `;
  }}
  ${({ $focus, $disabled }) => {
    if ($disabled) {
      return css`
        ${TextFieldClearButton} {
          visibility: hidden;
        }
      `;
    }

    return css`
      ${TextFieldClearButton} {
        visibility: ${$focus ? 'visible' : 'hidden'};
      }
      &:hover {
        ${TextFieldClearButton} {
          visibility: visible;
        }
      }
    `;
  }}
`;

export const TextFieldInput = styled.input<VariantProps>`
  display: ${({ type }) => (type === 'color' ? 'none' : 'inline-flex')};
  width: 100%;
  background: none;
  border: none;
  outline: none;
  padding: ${({ $variant }) => ($variant === 'primary' ? 14 : 8)}px 0px;
  color: ${({ theme }) => theme.colors.base.white};
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  cursor: inherit;
  &:hover ~ ${TextFieldBlock} {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
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
    caret-color: ${({ theme }) => theme.colors.base.white};
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.base.white};
    box-shadow: 0 0 0 100px ${({ theme }) => theme.colors.grayScale.gray4} inset !important;
  }
  &:-webkit-autofill:focus {
    caret-color: ${({ theme }) => theme.colors.base.white};
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
`;

export const TextFieldColor = styled.label`
  display: inline-flex;
  cursor: pointer;
`;

export const TextFieldColorInput = styled.input.attrs({ type: 'color' })`
  display: none;
`;

export interface TextFieldColorPreviewProps {
  $color: string;
}

export const TextFieldColorPreview = styled.span<TextFieldColorPreviewProps>`
  display: inline-flex;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
  border-radius: 4px;
`;

export interface TextFieldClearButtonProps {
  $big: boolean;
}

export const TextFieldClearButton = styled(
  Button
).attrs<TextFieldClearButtonProps>(({ $big }) => ({
  variant: 'text',
  iconSize: $big ? 16 : 12,
  children: <CloseIcon />
}))``;

export const TextFieldErrorText = styled(Typography).attrs({
  variant: 'input-sm'
})`
  display: inline-flex;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.critic};
`;

export const TextFieldSkeleton = styled(Skeleton)`
  width: 100%;
  height: 18px;
  margin: 14px 0px;
`;
