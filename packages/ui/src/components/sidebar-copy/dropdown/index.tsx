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
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      scale: 0.75
    },
    enter: {
      opacity: 1,
      zIndex: 100,
      scale: 1,
    },
    leave: {
      opacity: 0,
      scale: 0.75
    },
    config: {
      duration: 150
    }
  });

  return (
    <SidebarDropdownProvider setIsOpen={setIsOpen}>
      <SidebarDropdownStyled
        {...props}
        ref={dropdownRef}
      >
        <IconProvider fill={theme.colors.base.white}>
          <SidebarDropdownToggler onClick={handleToggle}>
            <SidebarDropdownTogglerIcon />
          </SidebarDropdownToggler>
        </IconProvider>
        {dropdownTransition(
          (style, item) =>
            item && (
              <SidebarDropdownContent
                ref={contentRef}
                style={style}
              >
                <SidebarDropdownList>
                  {children}
                </SidebarDropdownList>
              </SidebarDropdownContent>
            )
        )}
      </SidebarDropdownStyled>
    </SidebarDropdownProvider>
  );
};

export { SidebarDropdownItem } from './item';
