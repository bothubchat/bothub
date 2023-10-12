import { css, styled } from 'styled-components';
import { CheckSmallIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';

export interface CheckboxStyledProps {
  $disabled: boolean;
}

export const CheckboxStyled = styled.label<CheckboxStyledProps>`
  display: inline-flex;
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
`;

export const CheckboxBlock = styled.span`
  display: inline-flex;
  width: 20px;
  height: 20px;
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

export const CheckboxLabel = styled(Typography).attrs({ variant: 'body-m-medium' })``;

export const CheckboxCheckedIcon = styled(CheckSmallIcon).attrs({ size: 20 })`
  visibility: hidden;
`;

export const CheckboxInput = styled.input`
  display: none;
  &:checked + ${CheckboxBlock} {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    background: ${({ theme }) => theme.colors.accent.primary};
    ${CheckboxCheckedIcon} {
      visibility: visible;
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
`;
