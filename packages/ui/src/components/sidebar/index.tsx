import React, { useCallback, useState } from 'react';
import {
  SidebarBody,
  SidebarBodyContent,
  SidebarBodyScrollbarWrapper,
  SidebarBottom,
  SidebarContent,
  SidebarHead, 
  SidebarStyled,
  SidebarTop 
} from './styled';
import { SidebarProvider } from './context';

export type SidebarOpenEventHandler = (open: boolean) => unknown;

export interface SidebarProps extends React.PropsWithChildren {
  open?: boolean;
  className?: string;
  id?: string;
  createChat?: React.ReactNode;
  toggle?: React.ReactNode;
  user?: React.ReactNode;
  onOpen?: SidebarOpenEventHandler;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  open, className, id, user, createChat, toggle, children, onOpen
}) => {
  const initialIsOpen = open;
  const setInitialIsOpen = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((open) => {
    if (typeof open === 'boolean') {
      onOpen?.(open);
    }
  }, [onOpen]);
  const [isOpen, setIsOpen] = typeof initialIsOpen === 'boolean' ? [initialIsOpen, setInitialIsOpen] : useState(true);

  return (
    <SidebarProvider
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <SidebarStyled
        $open={isOpen}
        className={className}
        id={id}
      >
        <SidebarContent>
          <SidebarTop>
            <SidebarHead>
              {createChat}
              {toggle}
            </SidebarHead>
            <SidebarBody>
              <SidebarBodyScrollbarWrapper
                disabled={!isOpen}
              >
                <SidebarBodyContent>
                  {children}
                </SidebarBodyContent>
              </SidebarBodyScrollbarWrapper>
            </SidebarBody>
          </SidebarTop>
          <SidebarBottom>
            {user}
          </SidebarBottom>
        </SidebarContent>
      </SidebarStyled>
    </SidebarProvider>
  );  
};

export * from './styled';
export * from './context';
export * from './toggle-button';
export * from './create-chat-button';
export * from './user-info';
export * from './collapse';
export * from './chat';
export * from './group';
export * from './empty';
