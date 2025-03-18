import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { colorToRgba } from '@/ui/utils/colorToRgba';

export const DateBadgeStyled = styled.div`
  display: flex;
  width: fit-content;
  padding: 4px 34px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background-color: ${({ theme }) =>
    colorToRgba(theme.colors.grayScale.gray4, 0.75)};
`;

export const DateBadgeText = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  color: ${({ theme }) =>
    theme.mode === 'light'
      ? theme.default.colors.base.black
      : theme.colors.grayScale.gray6};
`;
