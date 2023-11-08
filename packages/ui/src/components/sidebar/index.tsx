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
import { useTheme } from '@/ui/theme';

export type SidebarChangeEventHandler = (open: boolean) => unknown;

export interface SidebarProps extends React.PropsWithChildren {
  open?: boolean;
  className?: string;
  id?: string;
  createChat?: React.ReactNode;
  toggle?: React.ReactNode;
  user?: React.ReactNode;
  onChange?: SidebarChangeEventHandler;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  open: initialIsOpen, className, id, user, createChat, toggle, children, onChange
}) => {
  const theme = useTheme();

  const setInitialIsOpen = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((open) => {
    if (typeof open === 'boolean') {
      onChange?.(open);
    }
  }, [onChange]);
  const [isOpen, setIsOpen] = typeof initialIsOpen === 'boolean' ? [initialIsOpen, setInitialIsOpen] : useState(true);

  return (
    <SidebarProvider
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <SidebarStyled
        className={className}
        id={id}
        variants={{
          open: {
            minWidth: theme.sidebar.width,
            maxWidth: theme.sidebar.width
          },
          close: {
            minWidth: theme.sidebar.minimizedWidth,
            maxWidth: theme.sidebar.minimizedWidth
          }
        }}
        initial={isOpen ? 'open' : 'close'}
        animate={isOpen ? 'open' : 'close'}
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
