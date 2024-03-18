import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { ChatIcon } from '@/ui/icons/chat';

export const SidebarEmptyStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const SidebarEmptyIcon = styled(ChatIcon).attrs({ size: 16 })``;

export const SidebarEmptyText = styled(Typography).attrs({ variant: 'body-m-medium' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  cursor: default;
`;
