import { css, styled } from 'styled-components';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';

export type CheckedColor = { $checkedColor?: string };

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

export const CheckboxBlock = styled.span<CheckedColor>`
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
    border-color: ${({ theme, $checkedColor }) =>
      $checkedColor || theme.colors.accent.primary};
  }

  svg {
    visibility: hidden;
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

export const CheckboxCheckedIcon = styled(CheckSmallIcon).attrs({ size: 20 })``;

export const CheckboxInput = styled.input<CheckedColor>`
  width: 0;
  height: 0;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  &:checked + span {
    ${({ theme, $checkedColor }) => {
      const color = $checkedColor || theme.colors.accent.primary;
      return css`
        border-color: ${color};
        background: ${color};
      `;
    }}
    svg {
      visibility: visible;
    }
    ${CheckboxHalfCheckedSquare} {
      visibility: hidden;
    }
  }
  &:checked:not(:disabled) + ${CheckboxBlock}:hover {
    ${({ theme, $checkedColor }) => {
      const color = $checkedColor || theme.colors.accent.strong;
      return css`
        border-color: ${color};
        background: ${color};
      `;
    }}
  }
  &:disabled + ${CheckboxBlock} {
    border-color: ${({ theme }) => theme.colors.grayScale.gray1};
    background: ${({ theme }) => theme.colors.grayScale.gray1};
    cursor: not-allowed;
    svg {
      path {
        fill: ${({ theme }) => theme.colors.grayScale.gray6};
      }
    }
  }
  &:focus-visible + ${CheckboxBlock} {
    border-color: ${({ theme }) => theme.colors.base.white};
  }
`;
