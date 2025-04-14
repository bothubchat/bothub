import React, {
  forwardRef,
  StyleHTMLAttributes,
  useCallback,
  useState
} from 'react';
import {
  SidebarBodyScrollbarWrapper,
  SidebarBottom,
  SidebarButtons,
  SidebarContent,
  SidebarHead,
  SidebarStyled,
  SidebarToolbar,
  SidebarTop,
  SidebarWrapper,
  SidebarDivider
} from './styled';
import { SidebarProvider } from './context';
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
    const [isEdit, setIsEdit] = useState<boolean>(false);

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
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setIsOpen={handleOpen}
      >
        <SidebarStyled
          $isOpen={isOpen}
          className={className}
          id={id}
        >
          <SidebarTop $isOpen={isOpen}>
            {section === 'chats' && (
              <SidebarHead $isOpen={isOpen}>
                {isOpen && logo}
                {isOpen && lang}
                {section === 'chats' && !isOpen && toggle}
                {menu}
              </SidebarHead>
            )}
            {!isOpen && <SidebarDivider $isOpen={isOpen} />}
            <SidebarToolbar $isOpen={isOpen}>
              <SidebarButtons>{buttons}</SidebarButtons>
              {section === 'chats' && isOpen && toggle}
            </SidebarToolbar>
            <SidebarDivider $isOpen={isOpen} />
          </SidebarTop>
          <SidebarContent>
            <SidebarWrapper>
              <SidebarBodyScrollbarWrapper>
                {children}
              </SidebarBodyScrollbarWrapper>
            </SidebarWrapper>
          </SidebarContent>
          <SidebarBottom>
            {isOpen && isEdit && deleteButton}
            {user}
          </SidebarBottom>
        </SidebarStyled>
      </SidebarProvider>
    );
  }
);

export * from './user-info';
export * from './styled';
export * from './context';
export * from './dropdown';
export * from './group';
export * from './buttons';
