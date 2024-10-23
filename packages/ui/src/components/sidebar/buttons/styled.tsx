import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { Plus1Icon } from '@/ui/icons/plus-1';
import { TrashIcon } from '@/ui/icons/trash';

export interface SidebarButtonsStyledProps {
  $open: boolean;
}

export const SidebarButtonsStyled = styled.div<SidebarButtonsStyledProps>`
  display: ${({ $open }) => (
    $open ? 'flex' : 'none'
  )};
  transition: all 0.3s;
  width: 100%;
  gap: 12px;
`;

export const SidebarCreateChatButton = styled(Button).attrs({
  startIcon: <Plus1Icon />,
  fullWidth: true
})`
  white-space: nowrap;
`;

export const SidebarDeleteChatsButton = styled(Button).attrs({
  variant: 'secondary',
  children: <TrashIcon />
})``;
