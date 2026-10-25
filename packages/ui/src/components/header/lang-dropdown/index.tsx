import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
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
import { useOnClickOutside } from '@/ui/utils';

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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleScrollEvent = (event: Event) => {
      const dropdownEl = dropdownRef.current;
      const scrollTarget = event.target as Element;

      if (dropdownEl && dropdownEl.contains(scrollTarget)) {
        return;
      }

      handleClose();
    };

    window.addEventListener('scroll', handleScrollEvent, true);
    window.addEventListener('blur', handleClose);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent, true);
      window.removeEventListener('blur', handleClose);
    };
  }, [isOpen, handleClose]);

  // Listen to the document only while the dropdown is open.
  useOnClickOutside(dropdownRef, handleClose, isOpen);

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0)',
    },
    enter: {
      opacity: isOpen ? 1 : 0.5,
      transform: `scale(${isOpen ? 1 : 0.999})`,
    },
    leave: { opacity: 0, transform: 'scale(0.999)' },
    config: { duration: 150 },
  });

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
        {dropdownTransition(
          (style, item) =>
            item && (
              <HeaderLangDropdownContent
                $open={isOpen}
                style={style}
              >
                {children}
              </HeaderLangDropdownContent>
            ),
        )}
      </HeaderLangDropdownStyled>
    </HeaderLangDropdownProvider>
  );
};

export * from './styled';
export * from './item';
