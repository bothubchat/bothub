import React, { useCallback, useState } from 'react';
import {
  SidebarLangDropdownContent,
  SidebarLangDropdownStyled,
  SidebarLangDropdownToggler,
  SidebarLangDropdownTogglerArrow,
  SidebarLangDropdownTogglerIcon,
  SidebarLangDropdownTogglerText,
} from './styled';
import { SidebarLangDropdownProvider } from './context';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { useDropdown, useEventListener } from '@/ui/hooks';

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
  const [isOpen, setIsOpen] = useState(false);
  const { ref: dropdownRef, dropdownTransition } = useDropdown({ isOpen });

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const clickListener = useCallback(
    (event: Event) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [dropdownRef],
  );

  const blurListener = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEventListener(document, 'click', clickListener);
  useEventListener(window, 'blur', blurListener);

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
                transform: isOpen ? 'rotateZ(-180deg)' : 'rotateZ(0)',
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
            ),
        )}
      </SidebarLangDropdownStyled>
    </SidebarLangDropdownProvider>
  );
};

export * from './styled';
export * from './item';
