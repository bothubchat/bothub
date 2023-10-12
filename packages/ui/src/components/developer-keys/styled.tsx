import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { Plus1Icon } from '@/ui/icons';

export const DeveloperKeysStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const DeveloperKeysTitle = styled(Typography).attrs({ component: 'h3', variant: 'h2' })`
  margin-bottom: 20px;
`;

export const DeveloperKeyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const DeveloperKeysButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

export const AddDeveloperKeyButton = styled(Button).attrs({
  size: 'md',
  startIcon: <Plus1Icon />
})``;
