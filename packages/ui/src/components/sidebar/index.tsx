import React, { useCallback, useState } from 'react';
import {
  SidebarArrowDownButton,
  SidebarArrowUpButton,
  SidebarBody,
  SidebarBodyContent,
  SidebarBodyScrollbarWrapper,
  SidebarBottom,
  SidebarContent,
  SidebarGlobalStyle,
  SidebarHead,
  SidebarHeader,
  SidebarHeaderMain,
  SidebarStyled,
  SidebarToolbar,
  SidebarTop
} from './styled';
import { SidebarProvider } from './context';
import { ScrollbarRef } from '../scrollbar';

export type SidebarOpenEventHandler = (open: boolean) => unknown;

export interface SidebarProps extends React.PropsWithChildren {
  open?: boolean;
  defaultOpen?: boolean;
  className?: string;
  id?: string;
  logo?: React.ReactNode;
  menu?: React.ReactNode;
  buttons?: React.ReactNode;
  toggle?: React.ReactNode;
  user?: React.ReactNode;
  onOpen?: SidebarOpenEventHandler;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open, defaultOpen = true,
  className, id, user, logo, menu, buttons, toggle,
  children, onOpen
}) => {
  const initialIsOpen = open;
  const setInitialIsOpen = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((open) => {
    if (typeof open === 'boolean') {
      onOpen?.(open);
    }
  }, [onOpen]);
  const [isOpen, setIsOpen] = typeof initialIsOpen === 'boolean' ? [initialIsOpen, setInitialIsOpen] : useState(defaultOpen);

  const handleOpen = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((open) => {
    setIsOpen(open);

    if (typeof open === 'boolean' && !initialIsOpen && onOpen) {
      onOpen(open);
    }
  }, [setIsOpen, initialIsOpen, onOpen]);

  return (
    <SidebarProvider
      isOpen={isOpen}
      setIsOpen={handleOpen}
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
                  {isOpen && menu}
                </SidebarHeaderMain>
              </SidebarHeader>
              <SidebarToolbar>
                {buttons}
                {!isOpen && menu}
                {toggle}
              </SidebarToolbar>
            </SidebarHead>
            <SidebarBody>
              <SidebarBodyScrollbarWrapper size={!isOpen ? 0 : 6} >
                <SidebarArrowUpButton $hidden={isOpen} />
                <SidebarBodyContent>
                  {children}
                </SidebarBodyContent>
                <SidebarArrowDownButton $hidden={isOpen} />
              </SidebarBodyScrollbarWrapper>
            </SidebarBody>
          </SidebarTop>
          <SidebarBottom>
            {user}
          </SidebarBottom>
        </SidebarContent>
      </SidebarStyled>
      <SidebarGlobalStyle
        $open={isOpen}
      />
    </SidebarProvider>
  );
};

export * from './styled';
export * from './context';
export * from './toggle-button';
export * from './buttons';
export * from './user-info';
export * from './chat';
export * from './group';
export * from './empty';
export * from './theme-switcher';
export * from './menu';
export * from './lang-dropdown';
