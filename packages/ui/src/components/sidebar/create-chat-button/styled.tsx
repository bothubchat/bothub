import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { Plus1Icon } from '@/ui/icons';

export const SidebarCreateChatButton = styled(Button).attrs({
  startIcon: <Plus1Icon />,
  fullWidth: true,
  children: 'Создать чат'
})`
  margin-right: 24px;
`;
