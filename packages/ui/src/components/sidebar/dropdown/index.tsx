import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useTransition } from '@react-spring/web';
import {
  SidebarDropdownContent,
  SidebarDropdownStyled,
  SidebarDropdownToggler,
  SidebarDropdownTogglerIcon,
} from './styled';
import { SidebarDropdownProvider } from './context';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export interface SidebarDropdownProps extends
  React.ComponentProps<typeof SidebarDropdownStyled> {

}

export const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  children, ...props
}) => {
  const theme = useTheme();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const dropdownEl: HTMLDivElement | null = dropdownRef.current;

    if (dropdownEl !== null) {
      const clickListener = (event: Event) => {
        if (!dropdownEl.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      const blurListener = () => setIsOpen(false);

      document.addEventListener('click', clickListener);
      window.addEventListener('blur', blurListener);

      return () => {
        document.removeEventListener('click', clickListener);
        window.removeEventListener('blur', blurListener);
      };
    }
  }, []);

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0.0)',
    },
    enter: {
      opacity: isOpen ? 1 : 0.5,
      transform: `scale(${isOpen ? 1 : 0.999})`,
      transition: {
        duration: 150,
      },
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.999)',
    },
    config: { duration: 150 },
  });

  const contentPosition = dropdownRef.current?.getBoundingClientRect() ?? { right: 0, bottom: 0 };
  return (
    <SidebarDropdownProvider setIsOpen={setIsOpen}>
      <SidebarDropdownStyled {...props} ref={dropdownRef}>
        <IconProvider
          fill={theme.colors.base.white}
        >
          <SidebarDropdownToggler $open={isOpen} onClick={handleToggle}>
            <SidebarDropdownTogglerIcon />
          </SidebarDropdownToggler>
        </IconProvider>
        {dropdownTransition((style, item) => item && (
          <SidebarDropdownContent
            ref={contentRef}
            style={{ ...style, left: contentPosition.right, top: contentPosition.bottom }}

            exit={{
              opacity: 0,
              transform: 'scale(0.999)'
            }}
          >
            {children}
          </SidebarDropdownContent>
        ))}
      </SidebarDropdownStyled>
    </SidebarDropdownProvider>
  );
};

export * from './styled';
export * from './item';
