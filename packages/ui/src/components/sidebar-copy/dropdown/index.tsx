import React, { useEffect, useRef, useState } from 'react';
import {
  SidebarDropdownContent,
  SidebarDropdownList,
  SidebarDropdownStyled,
  SidebarDropdownToggler,
  SidebarDropdownTogglerIcon
} from './styled';
import { SidebarDropdownProvider } from './context';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { useSidebar } from '../context';

export interface SidebarDropdownProps
  extends React.ComponentProps<typeof SidebarDropdownStyled> {}

export const SidebarListActions: React.FC<SidebarDropdownProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [visable, setVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollbarElement } = useSidebar();
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const dropdownEl: HTMLDivElement | null = dropdownRef.current;

    if (dropdownEl !== null) {
      const clickListener = (event: Event) => {
        if (!dropdownEl.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('click', clickListener, true);

      return () => {
        document.removeEventListener('click', clickListener, true);
      };
    }
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (isOpen) {
        if (buttonEl !== null && contentEl !== null) {
          if (scrollbarElement !== null) {
            const { bottom: scrollbarBottom, top: scrollbarTop } =
              scrollbarElement.getBoundingClientRect();
            console.log(contentTop < scrollbarTop);
            if (contentTop < scrollbarTop) {
              setVisible(false);
            } else {
              setVisible(true);
            }
          }
        }
      }
    };
    scrollListener();
    scrollbarElement?.addEventListener('scroll', scrollListener);

    return () => {
      scrollbarElement?.removeEventListener('scroll', scrollListener);
    };
  }, [isOpen, scrollbarElement]);

  const buttonEl: HTMLButtonElement | null = buttonRef.current;
  const contentEl: HTMLDivElement | null = contentRef.current;
  const buttonRect = buttonEl?.getBoundingClientRect();
  const contentRect = contentEl?.getBoundingClientRect();

  const { x, y } =
    buttonRect !== undefined && contentRect !== undefined
      ? {
          x: buttonRect.x - contentRect.width,
          y: buttonRect.y
        }
      : {};

  return (
    <SidebarDropdownProvider setIsOpen={setIsOpen}>
      <SidebarDropdownStyled
        {...props}
        ref={dropdownRef}
      >
        <SidebarDropdownToggler
          ref={buttonRef}
          onClick={handleToggle}
        >
          <IconProvider fill={theme.colors.base.white}>
            <SidebarDropdownTogglerIcon />
          </IconProvider>
        </SidebarDropdownToggler>
        {isOpen && (
          <SidebarDropdownContent
            $opacity={visable ? 1 : 0}
            style={{
              top: y,
              left: x
            }}
            ref={contentRef}
          >
            <SidebarDropdownList>{children}</SidebarDropdownList>
          </SidebarDropdownContent>
        )}
      </SidebarDropdownStyled>
    </SidebarDropdownProvider>
  );
};

export { SidebarDropdownItem } from './item';
