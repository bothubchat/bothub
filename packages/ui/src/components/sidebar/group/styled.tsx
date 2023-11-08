import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const SidebarGroups = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18px;
  gap: 18px;
  width: 100%;
`;

export const SidebarGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const SidebarGroupName = styled(Typography).attrs({ variant: 'body-xs-regular', component: 'span' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  cursor: default;
`;

export const SidebarChatList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 100%;
  gap: 8px;
`;
