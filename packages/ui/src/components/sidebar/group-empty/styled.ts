import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const SidebarEmptyGroupStyled = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const SidebarEmptyGroupText = styled(Typography).attrs({
  variant: 'body-m-medium',
})`
  color: ${({ theme }) => theme.colors.grayScale.gray6};
`;
