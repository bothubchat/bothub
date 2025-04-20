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
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const contentPosition = dropdownRef.current?.getBoundingClientRect() ?? {
    right: 0,
    bottom: 0
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

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0.0)'
    },
    enter: {
      opacity: isOpen ? 1 : 0.5,
      backdropFilter: 'blur(8px)',
      transform: `scale(${isOpen ? 1 : 0.999})`,
      transition: {
        duration: 150
      }
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.999)'
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
          <SidebarDropdownToggler ref={buttonRef} onClick={handleToggle}>
            <IconProvider fill={theme.colors.base.white}>
              <SidebarDropdownTogglerIcon />
            </IconProvider>
          </SidebarDropdownToggler>
        {dropdownTransition(
          (style, item) =>
            item && (
              <SidebarDropdownContent
                ref={contentRef}
                style={{
                  ...style,
                  transform: 'translate3d(-100%, 0, 0)',
                  left: contentPosition.right,
                  top: contentPosition.bottom
                }}
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
