import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';
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

export const SidebarDeleteChatsButton = styled(Button).attrs({
  variant: 'secondary',
  children: <TrashIcon />
})``;
