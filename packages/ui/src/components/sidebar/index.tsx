import React, { useCallback, useState } from 'react';
import {
  SidebarArrowDownButton,
  SidebarArrowUpButton,
  SidebarBody,
  SidebarBodyContent,
  SidebarBodyScrollbarWrapper,
  SidebarBottom,
  SidebarContent,
  SidebarContentNav,
  SidebarDivider,
  SidebarGlobalStyle,
  SidebarHeader,
  SidebarMobileToggle,
  SidebarStyled,
  SidebarToolbar,
  SidebarWrapper
} from './styled';
import { SidebarProvider } from './context';
import { SidebarMenu } from './menu';
import { ScrollbarRef, ScrollbarScrollEventHandler } from '../scrollbar';

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
  deleteButton?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open, defaultOpen = true,
  className, id, user, logo, menu, buttons, toggle,
  deleteButton,
  children, onOpen
}) => {
  const initialIsOpen = open;
  const setInitialIsOpen = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((open) => {
    if (typeof open === 'boolean') {
      onOpen?.(open);
    }
  }, [onOpen]);
  const [isOpen, setIsOpen] = typeof initialIsOpen === 'boolean' ? [initialIsOpen, setInitialIsOpen] : useState(defaultOpen);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const scrollbarRef = React.useRef<ScrollbarRef>(null);
  const handleOpen = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((open) => {
    setIsOpen(open);

    if (typeof open === 'boolean' && !initialIsOpen && onOpen) {
      onOpen(open);
    }
  }, [setIsOpen, initialIsOpen, onOpen]);

  const handleScroll = useCallback<ScrollbarScrollEventHandler>(({ isBottom }) => {
    setIsBottom(isBottom);
  }, [setIsBottom]);

  const handleScrollTop = useCallback(() => {
    scrollbarRef.current?.element?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleScrollBottom = useCallback(() => {
    scrollbarRef.current?.element?.scrollTo({
      top: scrollbarRef.current?.element?.scrollHeight + 999 || 0,
      behavior: 'smooth',
    });
  }, []);
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
          <SidebarHeader $open={isOpen}>
            {logo}
            {isOpen && (
              <SidebarMenu>
                {menu}
              </SidebarMenu>
            )}
          </SidebarHeader>
          <SidebarToolbar>
            {buttons}
            {!isOpen && (
              <SidebarMenu>
                {menu}
              </SidebarMenu>
            )}
            {toggle}
          </SidebarToolbar>
          <SidebarDivider />
          <SidebarBody>
            {!isOpen
              && (
                <SidebarArrowUpButton
                  $hidden={isBottom && !isOpen}
                  onClick={handleScrollTop}
                />
              )}
            <SidebarWrapper>
              <SidebarBodyScrollbarWrapper
                ref={scrollbarRef}
                size={!isOpen ? 0 : 6}
                onScroll={handleScroll}
              >
                <SidebarBodyContent>
                  {children}
                </SidebarBodyContent>
              </SidebarBodyScrollbarWrapper>
            </SidebarWrapper>
            {!isOpen && (
              <SidebarArrowDownButton
                $hidden={!isBottom}
                onClick={handleScrollBottom}
              />
            )}
          </SidebarBody>
          <SidebarBottom>
            {deleteButton}
            {user}
          </SidebarBottom>
        </SidebarContent>
        <SidebarContentNav>
          <div>
            <SidebarMobileToggle>
              {toggle}
            </SidebarMobileToggle>
            {menu}
          </div>
          {user}
        </SidebarContentNav>
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
export * from './dropdown';
export * from './group-empty';
