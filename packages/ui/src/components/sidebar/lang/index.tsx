import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
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

export interface SidebarLangDropdownProps
  extends React.ComponentProps<typeof SidebarLangDropdownStyled> {
  lang: string;
}

export const SidebarLangDropdown: React.FC<SidebarLangDropdownProps> = ({
  lang,
  children,
  ...props
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

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0)'
    },
    enter: {
      opacity: isOpen ? 1 : 0.5,
      transform: `scale(${isOpen ? 1 : 0.999})`
    },
    leave: { opacity: 0, transform: 'scale(0.999)' },
    config: { duration: 150 }
  });

  return (
    <SidebarLangDropdownProvider setIsOpen={setIsOpen}>
      <SidebarLangDropdownStyled
        {...props}
        ref={dropdownRef}
      >
        <IconProvider fill={theme.colors.base.white}>
          <SidebarLangDropdownToggler
            $open={isOpen}
            onClick={handleToggle}
          >
            <SidebarLangDropdownTogglerIcon />
            <SidebarLangDropdownTogglerText>
              {lang}
            </SidebarLangDropdownTogglerText>
            <SidebarLangDropdownTogglerArrow
              style={{
                transform: isOpen ? 'rotateZ(-180deg)' : 'rotateZ(0)'
              }}
            />
          </SidebarLangDropdownToggler>
        </IconProvider>
        {dropdownTransition(
          (style, item) =>
            item && (
              <SidebarLangDropdownContent style={style}>
                {children}
              </SidebarLangDropdownContent>
            )
        )}
      </SidebarLangDropdownStyled>
    </SidebarLangDropdownProvider>
  );
};

export * from './styled';
export * from './item';
