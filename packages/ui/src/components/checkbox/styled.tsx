import { css, styled } from 'styled-components';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';

export interface CheckboxStyledProps {
  $disabled: boolean;
  $fullWidth: boolean;
  $rowReverse?: boolean;
  $displayFlex?: boolean;
}

export const CheckboxStyled = styled.label<CheckboxStyledProps>`
  display: ${({ $displayFlex }) => ($displayFlex ? 'flex' : 'inline-flex')};
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  ${({ $disabled }) => {
    if ($disabled) {
      return css`
        cursor: not-allowed;
      `;
    }

    return css`
      cursor: pointer;
    `;
  }}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  ${({ $rowReverse }) =>
    $rowReverse &&
    css`
      flex-direction: row-reverse;
    `}
`;

export const CheckboxBlock = styled.span<{ $size: number }>`
  display: inline-flex;
  ${({ $size }) => css`
    width: ${`${$size}px`};
    height: ${`${$size}px`};
  `}
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray1};
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  box-sizing: border-box;
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const CheckboxBlockSkeleton = styled(Skeleton)<{ $size: number }>`
  ${({ $size }) => css`
    width: ${`${$size}px`};
    height: ${`${$size}px`};
  `}
  border-radius: 2px;
`;

export const CheckboxLabel = styled(Typography).attrs({ variant: 'input-sm' })`
  display: inline-flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  cursor: inherit;
`;

export const CheckboxCheckedIcon = styled(CheckSmallIcon)`
  visibility: hidden;
`;
export const CheckboxHalfCheckedSquare = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.accent.primary};
`;

export const CheckboxInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  &:checked + ${CheckboxBlock} {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    background: ${({ theme }) => theme.colors.accent.primary};
    ${CheckboxCheckedIcon} {
      visibility: visible;
    }
    ${CheckboxHalfCheckedSquare} {
      visibility: hidden;
    }
  }
  &:checked:not(:disabled) + ${CheckboxBlock}:hover {
    border-color: ${({ theme }) => theme.colors.accent.strong};
    background: ${({ theme }) => theme.colors.accent.strong};
  }
  &:disabled + ${CheckboxBlock} {
    border-color: ${({ theme }) => theme.colors.grayScale.gray1};
    background: ${({ theme }) => theme.colors.grayScale.gray1};
    cursor: not-allowed;
    ${CheckboxCheckedIcon} {
      path {
        fill: ${({ theme }) => theme.colors.grayScale.gray6};
      }
    }
  }
  &:focus-visible + ${CheckboxBlock} {
    border-color: ${({ theme }) => theme.colors.base.white};
  }
`;
