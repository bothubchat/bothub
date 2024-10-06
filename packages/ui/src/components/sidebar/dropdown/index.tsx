import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { AnimatePresence } from 'framer-motion';
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

  const handleToggle = useCallback(() => {
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
        <AnimatePresence>
          {isOpen && (
            <SidebarDropdownContent
              style={{ translateX: dropdownRef.current?.clientLeft + 'px' || 0 }}
              animate={{
                opacity: isOpen ? 1 : 0.5,
                transform: `scale(${isOpen ? 1 : 0.999})`,
                transition: {
                  duration: 0.15
                }
              }}
              initial={{
                opacity: 0,
                transform: 'scale(0.999)'
              }}
              exit={{
                opacity: 0,
                transform: 'scale(0.999)'
              }}
            >
              {children}
            </SidebarDropdownContent>
          )}
        </AnimatePresence>
      </SidebarDropdownStyled>
    </SidebarDropdownProvider>
  );
};

export * from './styled';
export * from './item';
