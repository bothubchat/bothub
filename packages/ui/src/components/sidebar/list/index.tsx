import { PropsWithChildren } from 'react';
import { SidebarListChatsStyled } from './styled';
import { useSidebar } from '../context';

export const SidebarListChats: React.FC<PropsWithChildren> = ({ children }) => {
  const { isOpen: sidebarOpen } = useSidebar();
  return (
    <SidebarListChatsStyled $isSidebarOpen={sidebarOpen}>
      {children}
    </SidebarListChatsStyled>
  );
};
