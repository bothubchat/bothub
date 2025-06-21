import React, {
  forwardRef,
  StyleHTMLAttributes,
  useCallback,
  useState
} from 'react';
import {
  SidebarArrowDownButton,
  SidebarArrowUpButton,
  SidebarBanner,
  SidebarBody,
  SidebarBodyContent,
  SidebarBodyScrollbarWrapper,
  SidebarBottom,
  SidebarContent,
  SidebarContentNav,
  SidebarContentNavContainer,
  SidebarContentNavMenuScrollbarWrapper,
  SidebarContentNavMenuWrapper,
  SidebarDeleteButtonContainer,
  SidebarDivider,
  SidebarGlobalStyle,
  SidebarHeader,
  SidebarSearchContainer,
  SidebarStyled,
  SidebarTabletThemeSwitcher,
  SidebarToggle,
  SidebarToolbar,
  SidebarWrapper
} from './styled';
import { SidebarProvider } from './context';
import { SidebarMenu } from './menu';
import { ScrollbarRef, ScrollbarScrollEventHandler } from '../scrollbar';
import { SidebarSectionProp } from './types';

export type SidebarOpenEventHandler = (open: boolean) => unknown;

export interface SidebarProps extends React.PropsWithChildren {
  open?: boolean;
  section?: SidebarSectionProp;
  defaultOpen?: boolean;
  className?: string;
  id?: string;
  lang?: React.ReactNode;
  logo?: React.ReactNode;
  menu?: React.ReactNode;
  buttons?: React.ReactNode;
  buttonsModal?: React.ReactNode;
  toggle?: React.ReactNode;
  user?: React.ReactNode;
  search?: React.ReactNode;
  deleteButton?: React.ReactNode;
  isHide?: boolean;
  themeSwitcher?: React.ReactNode;
  style?: StyleHTMLAttributes<HTMLElement>;
  onOpen?: SidebarOpenEventHandler;
  banner?: React.ReactNode;
}

export const Sidebar = forwardRef<ScrollbarRef, SidebarProps>(
  (
    {
      open,
      section,
      defaultOpen = true,
      className,
      id,
      user,
      logo,
      menu,
      buttons,
      buttonsModal,
      toggle,
      deleteButton,
      search,
      lang,
      themeSwitcher,
      isHide = false,
      children,
      style,
      banner,
      onOpen
    },
    ref
  ) => {
    const initialIsOpen = open;
    const setInitialIsOpen = useCallback<
      React.Dispatch<React.SetStateAction<boolean>>
    >(
      (open) => {
        if (typeof open === 'boolean') {
          onOpen?.(open);
        }
      },
      [onOpen]
    );
    const [isOpen, setIsOpen] =
      typeof initialIsOpen === 'boolean'
        ? [initialIsOpen, setInitialIsOpen]
        : useState(defaultOpen);
    const [isBottom, setIsBottom] = useState<boolean>(false);
    const handleOpen = useCallback<
      React.Dispatch<React.SetStateAction<boolean>>
    >(
      (open) => {
        setIsOpen(open);

        if (typeof open === 'boolean' && !initialIsOpen && onOpen) {
          onOpen(open);
        }
      },
      [setIsOpen, initialIsOpen, onOpen]
    );

    const handleScroll = useCallback<ScrollbarScrollEventHandler>(
      ({ isBottom }) => {
        setIsBottom(isBottom);
      },
      [setIsBottom]
    );

    const handleScrollTop = useCallback(() => {
      if (ref && typeof ref !== 'function' && ref.current?.element) {
        ref.current.element.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, [ref]);

    const handleScrollBottom = useCallback(() => {
      if (ref && typeof ref !== 'function' && ref.current?.element) {
        ref.current.element.scrollTo({
          top: ref.current.element.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, [ref]);

    return (
      <SidebarProvider
        isOpen={isOpen}
        setIsOpen={handleOpen}
      >
        <SidebarStyled
          id={id}
          className={className}
          $isHide={isHide}
          $open={isOpen}
          style={style}
        >
          <SidebarContent
            $open={isOpen}
            $section={section}
          >
            <SidebarHeader $open={isOpen}>
              {logo}
              {lang}
              <SidebarMenu>{menu}</SidebarMenu>
            </SidebarHeader>
            <SidebarToolbar $open={isOpen}>
              {buttons}
              {buttonsModal}
              {!isOpen && <SidebarMenu>{menu}</SidebarMenu>}
              <SidebarToggle>{toggle}</SidebarToggle>
            </SidebarToolbar>
            <SidebarSearchContainer>{search}</SidebarSearchContainer>
            <SidebarDivider />
            <SidebarBody>
              {!isOpen && (
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
                  <SidebarBodyContent>{children}</SidebarBodyContent>
                </SidebarBodyScrollbarWrapper>
              </SidebarWrapper>
              {!isOpen && (
                <SidebarArrowDownButton
                  $hidden={!isBottom}
                  onClick={handleScrollBottom}
                />
              )}
            </SidebarBody>
            <SidebarDeleteButtonContainer>
              {deleteButton}
            </SidebarDeleteButtonContainer>
            {banner && <SidebarBanner $open={isOpen}>{banner}</SidebarBanner>}
            <SidebarBottom>{user}</SidebarBottom>
          </SidebarContent>
          <SidebarContentNav
            $open={isOpen}
            $section={section}
          >
            <SidebarContentNavContainer>
              <SidebarTabletThemeSwitcher>
                {themeSwitcher}
              </SidebarTabletThemeSwitcher>
              <SidebarContentNavMenuWrapper>
                <SidebarContentNavMenuScrollbarWrapper>
                  {menu}
                </SidebarContentNavMenuScrollbarWrapper>
              </SidebarContentNavMenuWrapper>
            </SidebarContentNavContainer>
            {user}
          </SidebarContentNav>
        </SidebarStyled>
        <SidebarGlobalStyle $open={isOpen} />
      </SidebarProvider>
    );
  }
);

export * from './styled';
export * from './context';
export * from './toggle-button';
export * from './buttons';
export * from './user-info';
export * from './chat';
export * from './group';
export * from './empty';
export * from './menu';
export * from './dropdown';
export * from './group-empty';
export * from './lang';
export * from './types';
