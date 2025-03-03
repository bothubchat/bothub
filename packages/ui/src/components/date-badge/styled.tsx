import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const DateBadgeStyled = styled.div`
  display: flex;
  width: fit-content;
  padding: 4px 34px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background-color: ${({ theme }) => `${theme.colors.grayScale.gray4}C0`};
`;

export const DateBadgeText = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
  color: ${({ theme }) => theme.colors.grayScale.gray6};
`;
