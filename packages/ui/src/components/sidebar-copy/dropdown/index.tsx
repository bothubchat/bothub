import React, { useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
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
          <SidebarDropdownContent>
            <SidebarDropdownList>{children}</SidebarDropdownList>
          </SidebarDropdownContent>
        )}
      </SidebarDropdownStyled>
    </SidebarDropdownProvider>
  );
};

export { SidebarDropdownItem } from './item';
