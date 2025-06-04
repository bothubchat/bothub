import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const ColorPickerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  width: fit-content;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const ColorPickerLabel = styled(Typography).attrs({
  variant: 'body-l-medium'
})`
  color: ${({ theme }) => theme.colors.base.white};
`;

export const ColorPickerHex = styled(Typography).attrs({
  variant: 'body-l-medium'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding-block: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background-color: ${({ theme }) => theme.colors.base.black};
  color: ${({ theme }) => theme.colors.base.white};
`;

export const ColorPickerPreview = styled.div`
  width: 60px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
`;

export interface ColorPickerBottomProps {
  $active?: boolean;
}

export const ColorPickerBottom = styled.button<ColorPickerBottomProps>`
  all: unset;
  display: flex;
  gap: 10px;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  ${({ theme, $active }) =>
    $active &&
    css`
      ${ColorPickerHex} {
        border-color: ${theme.colors.accent.primary};
      }
      ${ColorPickerPreview} {
        border-color: ${theme.colors.accent.primary};
      }
    `}
`;
