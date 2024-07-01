import React, { useCallback, useState } from 'react';
import {
  SidebarBody,
  SidebarBodyContent,
  SidebarBodyScrollbarWrapper,
  SidebarBottom,
  SidebarContent,
  SidebarHead, 
  SidebarHeader, 
  SidebarHeaderMain, 
  SidebarStyled,
  SidebarTop 
} from './styled';
import { SidebarProvider } from './context';

export type SidebarOpenEventHandler = (open: boolean) => unknown;

export interface SidebarProps extends React.PropsWithChildren {
  open?: boolean;
  className?: string;
  id?: string;
  logo?: React.ReactNode;
  menu?: React.ReactNode;
  buttons?: React.ReactNode;
  toggle?: React.ReactNode;
  themeSwitcher?: React.ReactNode;
  lang?: React.ReactNode;
  user?: React.ReactNode;
  onOpen?: SidebarOpenEventHandler;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  open, className, id, user, logo, menu, buttons, toggle, themeSwitcher, lang, children, onOpen
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
            <SidebarHead
              $open={isOpen}
            >
              <SidebarHeader
                $open={isOpen}
              >
                <SidebarHeaderMain
                  $open={isOpen}
                >
                  {logo}
                  {menu}
                  {lang}
                </SidebarHeaderMain>
                {toggle}
              </SidebarHeader>
              {buttons}
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
            {themeSwitcher}
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
export * from './buttons';
export * from './user-info';
export * from './collapse';
export * from './chat';
export * from './group';
export * from './empty';
export * from './theme-switcher';
export * from './menu';
export * from './lang-dropdown';
