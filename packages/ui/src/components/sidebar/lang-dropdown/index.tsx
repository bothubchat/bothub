import React, {
  useCallback, useEffect, useRef, useState 
} from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  SidebarLangDropdownContent, 
  SidebarLangDropdownStyled, 
  SidebarLangDropdownToggler, 
  SidebarLangDropdownTogglerArrow, 
  SidebarLangDropdownTogglerIcon, 
  SidebarLangDropdownTogglerText 
} from './styled';
import { SidebarLangDropdownProvider } from './context';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export interface SidebarLangDropdownProps extends 
  React.ComponentProps<typeof SidebarLangDropdownStyled> {
  lang: string;
}

export const SidebarLangDropdown: React.FC<SidebarLangDropdownProps> = ({
  lang, children, ...props
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
    <SidebarLangDropdownProvider setIsOpen={setIsOpen}>
      <SidebarLangDropdownStyled {...props} ref={dropdownRef}>
        <IconProvider
          fill={theme.colors.base.white}
        >
          <SidebarLangDropdownToggler $open={isOpen} onClick={handleToggle}>
            <SidebarLangDropdownTogglerIcon />
            <SidebarLangDropdownTogglerText>
              {lang}
            </SidebarLangDropdownTogglerText>
            <SidebarLangDropdownTogglerArrow 
              initial={{
                transform: `rotateZ(${isOpen ? -180 : 0}deg)`
              }}
              animate={{
                transform: `rotateZ(${isOpen ? -180 : 0}deg)`,
                transition: {
                  duration: 0.15
                }
              }}
            />
          </SidebarLangDropdownToggler>
        </IconProvider>
        <AnimatePresence>
          {isOpen && (
            <SidebarLangDropdownContent
              animate={{
                opacity: isOpen ? 1 : 0.5,
                transform: `scale(${isOpen ? 1 : 0.999})`,
                transition: {
                  duration: 0.15
                }
              }}
              exit={{
                opacity: 0,
                transform: 'scale(0.999)'
              }}
            >
              {children}
            </SidebarLangDropdownContent>
          )}
        </AnimatePresence>
      </SidebarLangDropdownStyled>
    </SidebarLangDropdownProvider>
  );
};

export * from './styled';
export * from './item';
