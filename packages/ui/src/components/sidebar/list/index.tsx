import { PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SidebarListChatsStyled } from './styled';
import { useSidebar } from '../context';

export const SidebarListChats: React.FC<
  PropsWithChildren & { id?: string }
> = ({ children, id = '' }) => {
  const { isOpen: sidebarOpen } = useSidebar();
  const { setNodeRef, isOver } = useDroppable({
    id: id || 'chats',
    data: {
      accepts: ['chat'],
      type: 'group',
    },
  });

  return (
    <SidebarListChatsStyled
      ref={setNodeRef}
      $isOver={isOver}
      $isSidebarOpen={sidebarOpen}
    >
      {children}
    </SidebarListChatsStyled>
  );
};
