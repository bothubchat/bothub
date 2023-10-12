import { styled } from 'styled-components';
import { Typography } from '../typography';

export const PromptsStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PromptsLabel = styled(Typography).attrs({ component: 'h2', variant: 'h3' })`
  margin-bottom: 34px;
`;

export const PromptList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
