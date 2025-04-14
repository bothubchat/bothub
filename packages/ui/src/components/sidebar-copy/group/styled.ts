import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';

export const SidebarGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SidebarGroupBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
`;

export const SidebarGroupList = styled(animated.div)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SidebarGroupName = styled(Typography).attrs({
  variant: 'body-l-medium',
  component: 'p'
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const SidebarGroupsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
