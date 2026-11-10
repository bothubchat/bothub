import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { themeVar } from '@/ui/theme';

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
      border: 1px solid
        ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
    `}
`;

export const RadioCircleDot = styled.span`
  display: inline-flex;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  visibility: hidden;
`;

export const RadioLabel = styled(Typography).attrs({
  variant: 'body-m-medium',
})``;

export const RadioInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  margin: 0;
  opacity: 0;
  &:focus-visible:not(:disabled) + ${RadioCircle} {
    border-color: ${({ theme }) => themeVar(theme, 'colors.accent.primary')};
  }
  &:not(:disabled) + ${RadioCircle}:hover {
    border-color: ${({ theme }) => themeVar(theme, 'colors.accent.primary')};
  }
  &:checked:not(:disabled) + ${RadioCircle} {
    border-color: ${({ theme }) => themeVar(theme, 'colors.accent.primary')};
    ${RadioCircleDot} {
      visibility: visible;
      background: ${({ theme }) => themeVar(theme, 'colors.accent.primary')};
    }
  }
  &:disabled + ${RadioCircle} {
    border-color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray1')};
    background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray6')};
  }
`;
