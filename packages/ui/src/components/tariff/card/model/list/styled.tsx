import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const TariffCardModelsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const TariffCardModelsLabel = styled(Typography).attrs({
  variant: 'body-xs-regular'
})`
  margin-bottom: 16px;
`;

export const TariffCardModelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
