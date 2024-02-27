import { styled } from 'styled-components';
import { CheckCircleIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';

export const TariffCardModelStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const TariffCardModelIcon = styled(CheckCircleIcon)``;

export const TariffCardModelInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TariffCardModelName = styled(Typography).attrs({ variant: 'body-s-medium' })``;

export const TariffCardModelTokens = styled(Typography).attrs({ variant: 'body-s-medium' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  margin-top: 6px;
`;
