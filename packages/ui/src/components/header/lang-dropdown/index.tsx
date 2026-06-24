import React, { useCallback, useState } from 'react';
import {
  HeaderLangDropdownContent,
  HeaderLangDropdownStyled,
  HeaderLangDropdownToggler,
  HeaderLangDropdownTogglerArrow,
  HeaderLangDropdownTogglerIcon,
  HeaderLangDropdownTogglerText,
} from './styled';
import { HeaderLangDropdownProvider } from './context';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { useDropdown, useEventListener } from '@/ui/hooks';

export interface HeaderLangDropdownProps
  extends React.ComponentProps<typeof HeaderLangDropdownStyled> {
  lang: string;
  children?: React.ReactNode;
}

export const HeaderLangDropdown: React.FC<HeaderLangDropdownProps> = ({
  lang,
  children,
  ...props
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { ref: dropdownRef, dropdownTransition } = useDropdown({
    isOpen,
  });

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

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

  const handleScrollEvent = useCallback(
    (event: Event) => {
      const dropdownEl = dropdownRef.current;
      const scrollTarget = event.target as Element;

      if (dropdownEl && dropdownEl.contains(scrollTarget)) {
        return;
      }

      handleClose();
    },
    [dropdownRef, handleClose],
  );

  useEventListener(window, 'scroll', handleScrollEvent, {
    capture: true,
    enabled: isOpen,
  });
  useEventListener(document, 'click', clickListener);
  useEventListener(window, 'blur', blurListener);

  return (
    <HeaderLangDropdownProvider setIsOpen={setIsOpen}>
      <HeaderLangDropdownStyled
        {...props}
        ref={dropdownRef}
      >
        <IconProvider fill={theme.colors.base.white}>
          <HeaderLangDropdownToggler
            $open={isOpen}
            onClick={handleToggle}
          >
            <HeaderLangDropdownTogglerIcon />
            <HeaderLangDropdownTogglerText>
              {lang}
            </HeaderLangDropdownTogglerText>
            <HeaderLangDropdownTogglerArrow
              style={{
                transform: isOpen ? 'rotateZ(-180deg)' : 'rotateZ(0)',
              }}
            />
          </HeaderLangDropdownToggler>
        </IconProvider>
        {dropdownTransition((style, item) => (
          <HeaderLangDropdownContent
            $open={isOpen && !!item}
            style={style}
          >
            {children}
          </HeaderLangDropdownContent>
        ))}
      </HeaderLangDropdownStyled>
    </HeaderLangDropdownProvider>
  );
};

export * from './styled';
export * from './item';
