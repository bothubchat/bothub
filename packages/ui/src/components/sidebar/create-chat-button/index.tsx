import React from 'react';
import { SidebarCreateChatButtonContainer, SidebarCreateChatButtonStyled } from './styled';
import { useSidebar } from '../context';

export type SidebarCreateChatButtonProps 
  = React.ComponentProps<typeof SidebarCreateChatButtonStyled>;

export const SidebarCreateChatButton: React.FC<SidebarCreateChatButtonProps> = ({
  ...props
}) => {
  const { isOpen } = useSidebar();

  return (
    <SidebarCreateChatButtonContainer
      $open={isOpen}
    >
      <SidebarCreateChatButtonStyled 
        {...props}
      />
    </SidebarCreateChatButtonContainer>
  );
};
