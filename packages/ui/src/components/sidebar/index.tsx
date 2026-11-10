import React, {
  StyleHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTheme } from '@/ui/theme';
import { useIsomorphicLayoutEffect } from '@/ui/utils/useIsomorphicLayoutEffect';
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
  SidebarPanel,
} from './styled';
import { SidebarProvider } from './context';
import { ScrollbarRef } from '../scrollbar';
import { animateSidebarResize, getSidebarWidth } from './resize-animation';

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
  'aria-label'?: string;
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
  isHide = false,
  children,
  style,
  banner,
  onOpen,
  'aria-label': ariaLabel,
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
  const theme = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const width = getSidebarWidth(isOpen, isHide);
  const widthRef = useRef(width);
  const resizeAnimationsRef = useRef<Animation[]>([]);

  // Before paint: the first frame with the new width already has the edge
  // where it was
  useIsomorphicLayoutEffect(() => {
    const from = widthRef.current;
    widthRef.current = width;
    resizeAnimationsRef.current.forEach((animation) => animation.cancel());
    resizeAnimationsRef.current = [];
    if (from === width || !rootRef.current || !panelRef.current) {
      return;
    }

    resizeAnimationsRef.current = animateSidebarResize({
      root: rootRef.current,
      panel: panelRef.current,
      from,
      to: width,
      tabletMaxWidth: theme.dashboard.tablet.maxWidth,
    });
  }, [width, theme.dashboard.tablet.maxWidth]);

  useEffect(
    () => () => {
      resizeAnimationsRef.current.forEach((animation) => animation.cancel());
    },
    [],
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
      setIsOpen={setIsOpen}
    >
      <SidebarStyled
        style={style}
        $isOpenOnTablet={isOpenOnTablet}
        $isHide={isHide}
        $isOpen={isOpen}
        className={className}
        id={id}
        aria-label={ariaLabel}
        aria-hidden={isHide || undefined}
        // The rows take their collapsed look from it, see ./collapsed
        data-sidebar-collapsed={isOpen ? undefined : ''}
        ref={rootRef}
      >
        <SidebarPanel ref={panelRef}>
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
        </SidebarPanel>
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
