import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';

export interface TextFieldStyledProps {
  $fullWidth: boolean;
  $disabled: boolean;
}

export const TextFieldStyled = styled.label<TextFieldStyledProps>`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '420px')};
  box-sizing: border-box;
  ${({ $disabled }) => $disabled && css`
    cursor: not-allowed;
  `}
  ${({ $disabled }) => !$disabled && css`
    cursor: default;
  `}
`;

export const TextFieldLabel = styled(Typography).attrs({ variant: 'input-sm' })`
  display: inline-flex;
  margin-bottom: 8px;
  width: 100%;
  cursor: inherit;
`;

export interface TextFieldBlockProps {
  $error: boolean;
  $focus: boolean;
  $hover: boolean;
  $disabled: boolean;
  $skeleton: boolean;
}

export const TextFieldBlock = styled.span<TextFieldBlockProps>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 8px;
  overflow: hidden;
  cursor: ${({ $disabled, $skeleton }) => {
    if ($skeleton) {
      return 'progress';
    }

    return ($disabled ? 'not-allowed' : 'text');
  }};
  padding: 0px 16px;
  ${({
    theme, $error, $hover, $focus, $disabled, $skeleton
  }) => {
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

    return ($hover || $focus) && css`
      border-color: ${theme.colors.accent.primary};
    `;
  }}
  ${({
    theme, $focus, $disabled, $skeleton 
  }) => {
    if ($disabled || $skeleton) {
      return css`
        background: ${theme.colors.grayScale.gray3};
      `;
    }
    if ($focus) {
      return css`
        background: ${theme.colors.grayScale.gray4};
        > svg path {
          fill: ${theme.colors.base.white};
        }
      `;
    }

    return css`
      background: ${theme.colors.grayScale.gray4};
      > svg path {
        fill: ${theme.colors.grayScale.gray1};
      }
    `;
  }}
`;

export const TextFieldInput = styled.input`
  display: inline-flex;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  padding: 14px 0px;
  color: ${({ theme }) => theme.colors.base.white};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  line-height: 18px;
  cursor: inherit;
  &:hover ~ ${TextFieldBlock} {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray1};
  }
  &:focus::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray6};
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
`;

export const TextFieldErrorText = styled(Typography).attrs({ variant: 'input-sm' })`
  display: inline-flex;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.critic};
`;

export const TextFieldSkeleton = styled(Skeleton)`
  width: 100%;
  height: 18px;
  margin: 14px 0px;
`;
