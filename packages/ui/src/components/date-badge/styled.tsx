import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { themeVar } from '@/ui/theme';

export const DateBadgeStyled = styled.div`
  display: flex;
  width: fit-content;
  padding: 4px 34px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  background-color: ${({ theme }) => themeVar(theme, 'tokens.gray4Alpha75')};
  pointer-events: none; // allow to select text in message under this badge
`;

export const DateBadgeText = styled(Typography).attrs({
  variant: 'body-m-medium',
})`
  color: ${({ theme }) => themeVar(theme, 'tokens.textSecondary')};
`;
