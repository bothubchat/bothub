import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export interface RadioStyledProps {
  $disabled: boolean;
}

export const RadioStyled = styled.label<RadioStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
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

export interface RadioCircleProps {
  $skeleton: boolean;
}

export const RadioCircle = styled.span<RadioCircleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 8px;
  box-sizing: border-box;
  ${({ $skeleton }) =>
    !$skeleton &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
    `}
`;

export const RadioCircleDot = styled.span`
  display: inline-flex;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  visibility: hidden;
`;

export const RadioLabel = styled(Typography).attrs({
  variant: 'body-m-medium',
})``;

export const RadioInput = styled.input`
  display: none;
  &:not(:disabled) + ${RadioCircle}:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
  &:checked:not(:disabled) + ${RadioCircle} {
    border-color: ${({ theme }) => theme.colors.accent.primary};
    ${RadioCircleDot} {
      visibility: visible;
      background: ${({ theme }) => theme.colors.accent.primary};
    }
  }
  &:disabled + ${RadioCircle} {
    border-color: ${({ theme }) => theme.colors.grayScale.gray1};
    background: ${({ theme }) => theme.colors.grayScale.gray6};
  }
`;
