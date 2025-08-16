import React, { useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  SidebarDropdownContent,
  SidebarDropdownList,
  SidebarDropdownStyled,
  SidebarDropdownToggler,
  SidebarDropdownTogglerIcon,
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
  const contentRef = useRef<HTMLDivElement>(null);
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
      const blurListener = () => setIsOpen(false);

      document.addEventListener('click', clickListener, true);
      window.addEventListener('blur', blurListener, true);

      return () => {
        document.removeEventListener('click', clickListener, true);
        window.removeEventListener('blur', blurListener, true);
      };
    }
  }, []);

  const contentPosition = dropdownRef.current?.getBoundingClientRect() ?? {
    right: 0,
    bottom: 0,
  };

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: {
      duration: 150,
    },
  });

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
        {dropdownTransition(
          (style, item) =>
            item && (
              <SidebarDropdownContent
                style={{
                  ...style,
                  top: contentPosition.bottom,
                  left: contentPosition.right,
                }}
                ref={contentRef}
              >
                <SidebarDropdownList>{children}</SidebarDropdownList>
              </SidebarDropdownContent>
            ),
        )}
      </SidebarDropdownStyled>
    </SidebarDropdownProvider>
  );
};

export { SidebarDropdownItem } from './item';
