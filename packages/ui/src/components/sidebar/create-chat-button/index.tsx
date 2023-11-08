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
      variants={{
        open: {
          opacity: 1,
          width: 357,
          marginRight: 24
        },
        close: {
          opacity: 0,
          width: 0,
          marginRight: 0
        }
      }}
      initial={isOpen ? 'open' : 'close'}
      animate={isOpen ? 'open' : 'close'}
    >
      <SidebarCreateChatButtonStyled 
        {...props}
      />
    </SidebarCreateChatButtonContainer>
  );
};
