import React, {
  StyleHTMLAttributes,
  useCallback,
  useEffect,
  useState,
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
  SidebarDivider,
  SidebarBoxContainer,
  SidebarSearchBox,
} from './styled';
import { SidebarProvider } from './context';
import { ScrollbarRef } from '../scrollbar';

import { SidebarSectionProp } from './types';
import { SidebarGroupsList } from './group';

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
  // themeSwitcher?: React.ReactNode;
  style?: StyleHTMLAttributes<HTMLElement>;
  onOpen?: SidebarOpenEventHandler;
  banner?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
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
  // themeSwitcher,
  isHide = false,
  children,
  style,
  banner,
  onOpen,
}) => {
  const initialIsOpen = open;
  const setInitialIsOpen = useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(
    (open) => {
      if (typeof open === 'boolean') {
        onOpen?.(open);
      }
    },
    [onOpen],
  );
  const [isOpen, setIsOpen] =
    typeof initialIsOpen === 'boolean'
      ? [initialIsOpen, setInitialIsOpen]
      : useState(defaultOpen);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const ref = React.useRef<ScrollbarRef>(null);
  const scrollbarElement = ref.current?.element ?? null;
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const handleOpen = useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (open) => {
      setIsOpen(open);

      if (typeof open === 'boolean' && !initialIsOpen && onOpen) {
        onOpen(open);
      }
    },
    [setIsOpen, initialIsOpen, onOpen],
  );

  useEffect(() => {
    if (!ref.current?.element) return;

    const observer = new ResizeObserver(() => {
      if (
        ref.current?.element?.clientHeight !==
        ref.current?.element?.scrollHeight
      ) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });

    observer.observe(ref.current.element);

    return () => {
      observer.disconnect();
    };
  }, [ref.current?.element]);

  return (
    <SidebarProvider
      isOpen={isOpen}
      isEdit={isEdit}
      scrollbarElement={scrollbarElement}
      setIsEdit={setIsEdit}
      setIsOpen={handleOpen}
    >
      <SidebarStyled
        style={style}
        $isHide={isHide}
        $isOpen={isOpen}
        className={className}
        id={id}
      >
        <SidebarTop $isOpen={isOpen}>
          {section === 'chats' && (
            <SidebarHead $isOpen={isOpen}>
              {isOpen && logo}
              {isOpen && lang}
              {!isOpen && toggle}
              {menu}
            </SidebarHead>
          )}
          {!isOpen && <SidebarDivider $isOpen={isOpen} />}
          <SidebarToolbar $isOpen={isOpen}>
            <SidebarButtons>
              {buttons}
              {buttonsModal}
            </SidebarButtons>
            {section === 'chats' && isOpen && toggle}
          </SidebarToolbar>
          {isOpen && <SidebarSearchBox>{search}</SidebarSearchBox>}
          <SidebarDivider $isOpen={isOpen} />
        </SidebarTop>
        <SidebarContent>
          <SidebarWrapper
            $isScrollable={isScrolling}
            $isOpen={isOpen}
          >
            <SidebarBodyScrollbarWrapper
              ref={ref}
              $isOpen={isOpen}
            >
              <SidebarGroupsList $isSidebarOpen={isOpen}>
                {children}
              </SidebarGroupsList>
            </SidebarBodyScrollbarWrapper>
          </SidebarWrapper>
        </SidebarContent>
        {isOpen && (
          <SidebarBoxContainer>
            {!isEdit && banner}
            {isEdit && deleteButton}
          </SidebarBoxContainer>
        )}
        <SidebarBottom>{user}</SidebarBottom>
      </SidebarStyled>
    </SidebarProvider>
  );
};
export * from './user-info';
export * from './styled';
export * from './context';
export * from './dropdown';
export * from './group';
export * from './buttons';
export * from './chat';
export * from './toggle-button';
export * from './menu';
export * from './lang';
export * from './list';
