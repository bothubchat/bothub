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
  SidebarToggleBox,
} from './styled';
import { SidebarProvider } from './context';
import { ScrollbarRef } from '../scrollbar';

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
  buttonsModal?: React.ReactNode;
  toggle?: React.ReactNode;
  user?: React.ReactNode;
  search?: React.ReactNode;
  deleteButton?: React.ReactNode;
  isHide?: boolean;
  isOpenOnTablet: boolean;
  // themeSwitcher?: React.ReactNode;
  style?: StyleHTMLAttributes<HTMLElement>;
  onOpen?: SidebarOpenEventHandler;
  banner?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
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
  isOpenOnTablet,
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
      setIsOpen={setIsOpen}
    >
      <SidebarStyled
        style={style}
        $isOpenOnTablet={isOpenOnTablet}
        $isHide={isHide}
        $isOpen={isOpen}
        className={className}
        id={id}
      >
        <SidebarTop $isOpen={isOpen}>
          <SidebarHead $isOpen={isOpen}>
            {isOpen && logo}
            {isOpen && lang}
            {!isOpen && toggle}
            {menu}
          </SidebarHead>
          {!isOpen && <SidebarDivider $isOpen={isOpen} />}
          <SidebarToolbar $isOpen={isOpen}>
            <SidebarButtons>
              {buttons}
              {buttonsModal}
            </SidebarButtons>
            {isOpen && <SidebarToggleBox>{toggle}</SidebarToggleBox>}
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
              {children}
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
