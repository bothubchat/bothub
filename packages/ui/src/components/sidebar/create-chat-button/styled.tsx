import { css, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { Plus1Icon } from '@/ui/icons';

export interface SidebarCreateChatButtonContainerProps {
  $open: boolean;
}

export const SidebarCreateChatButtonContainer = styled.div<SidebarCreateChatButtonContainerProps>`
  display: flex;
  overflow: hidden;
  width: 100%;
  transition: all 0.3s;
  ${({ $open }) => $open && css`
    opacity: 1;
    width: 367px;
    margin-right: 24px;
  `}
  ${({ $open }) => !$open && css`
    opacity: 0;
    width: 0px;
    margin-right: 0px;
  `}
`;

export const SidebarCreateChatButtonStyled = styled(Button).attrs({
  startIcon: <Plus1Icon />,
  fullWidth: true
})`
  margin-right: 24px;
  flex-shrink: 0;
  white-space: nowrap;
`;
