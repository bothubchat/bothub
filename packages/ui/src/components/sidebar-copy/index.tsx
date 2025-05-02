import React, {
  forwardRef,
  StyleHTMLAttributes,
  useCallback,
  useEffect,
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
import { ScrollbarRef } from '../scrollbar';

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
  themeSwitcher,
  isHide = false,
  children,
  style,
  banner,
  onOpen
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
    [onOpen]
  );
  const [isOpen, setIsOpen] =
    typeof initialIsOpen === 'boolean'
      ? [initialIsOpen, setInitialIsOpen]
      : useState(defaultOpen);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const ref = React.useRef<ScrollbarRef>(null);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState(false);
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

  useEffect(() => {
    if (!ref.current?.element) return;

    const observer = new ResizeObserver(() => {
      if (ref.current?.element?.clientHeight !== ref.current?.element?.scrollHeight) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    })

    observer.observe(ref.current.element);

    return () => {
      observer.disconnect();
    }

  }, [ref.current?.element]);

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
            <SidebarButtons>{buttons}{buttonsModal}</SidebarButtons>
            {section === 'chats' && isOpen && toggle}
          </SidebarToolbar>
          <SidebarDivider $isOpen={isOpen} />
        </SidebarTop>
        <SidebarContent>
          <SidebarWrapper $isScrollable={isScrolling} $isOpen={isOpen}>
            <SidebarBodyScrollbarWrapper ref={ref} $isOpen={isOpen}>
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
export * from './user-info';
export * from './styled';
export * from './context';
export * from './dropdown';
export * from './group';
export * from './buttons';
export * from './chat';