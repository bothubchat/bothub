import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { themeVar } from '@/ui/theme';

/** Плашка даты из макета: пилюля на поверхности карточек */
export const DateBadgeStyled = styled.div`
  display: flex;
  width: fit-content;
  padding: 3px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray3')};
  background-color: ${({ theme }) => themeVar(theme, 'tokens.surfaceRaised')};
  pointer-events: none; // allow to select text in message under this badge
`;

export const DateBadgeText = styled(Typography).attrs({
  variant: 'body-m-medium',
})`
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: ${({ theme }) => themeVar(theme, 'tokens.textSecondary')};
`;
