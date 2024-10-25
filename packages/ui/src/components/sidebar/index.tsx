import React, { forwardRef, useCallback, useState } from 'react';
import {
  SidebarArrowDownButton,
  SidebarArrowUpButton,
  SidebarBody,
  SidebarBodyContent,
  SidebarBodyScrollbarWrapper,
  SidebarBottom,
  SidebarContent,
  SidebarContentNav,
  SidebarContentNavContainer,
  SidebarContentNavMenuWrapper,
  SidebarDivider,
  SidebarGlobalStyle,
  SidebarHeader,
  SidebarHeaderRight,
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
  lang?: React.ReactNode;
  logo?: React.ReactNode;
  menu?: React.ReactNode;
  buttons?: React.ReactNode;
  toggle?: React.ReactNode;
  user?: React.ReactNode;
  search?: React.ReactNode;
  onOpen?: SidebarOpenEventHandler;
  deleteButton?: React.ReactNode;
}

export const Sidebar = forwardRef<ScrollbarRef, SidebarProps>(({
  open, defaultOpen = true,
  className, id, user, logo, menu, buttons, toggle,
  deleteButton,
  search, lang,
  children, onOpen
}, ref) => {
  const initialIsOpen = open;
  const setInitialIsOpen = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((open) => {
    if (typeof open === 'boolean') {
      onOpen?.(open);
    }
  }, [onOpen]);
  const [isOpen, setIsOpen] = typeof initialIsOpen === 'boolean' ? [initialIsOpen, setInitialIsOpen] : useState(defaultOpen);
  const [isBottom, setIsBottom] = useState<boolean>(false);
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
    if (ref && typeof ref !== 'function' && ref.current?.element) {
      ref.current.element.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [ref]);

  const handleScrollBottom = useCallback(() => {
    if (ref && typeof ref !== 'function' && ref.current?.element) {
      ref.current.element.scrollTo({
        top: ref.current.element.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [ref]);

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
        <SidebarContent $open={isOpen}>
          <SidebarHeader $open={isOpen}>
            {logo}
            <SidebarHeaderRight>
              {lang}
              {isOpen &&
                <SidebarMenu>
                  {menu}
                </SidebarMenu>
              }
            </SidebarHeaderRight>
          </SidebarHeader>
          <SidebarToolbar $open={isOpen}>
            {buttons}
            {!isOpen && (
              <SidebarMenu>
                {menu}
              </SidebarMenu>
            )}
            {toggle}
          </SidebarToolbar>
          {search}
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
                ref={ref}
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
          {deleteButton}
          <SidebarBottom>
            {user}
          </SidebarBottom>
        </SidebarContent>
        <SidebarContentNav $open={isOpen}>
          <SidebarContentNavContainer $open={isOpen}>
            <SidebarMobileToggle>
              {toggle}
            </SidebarMobileToggle>
            <SidebarContentNavMenuWrapper>
              {menu}
            </SidebarContentNavMenuWrapper>
          </SidebarContentNavContainer>
          {user}
        </SidebarContentNav>
      </SidebarStyled>
      <SidebarGlobalStyle
        $open={isOpen}
      />
    </SidebarProvider>
  );
});

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
export * from './lang';

