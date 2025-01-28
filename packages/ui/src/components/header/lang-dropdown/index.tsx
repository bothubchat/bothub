import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
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

export interface HeaderLangDropdownProps
  extends React.ComponentProps<typeof HeaderLangDropdownStyled> {
  lang: string;
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
      <HeaderLangDropdownStyled {...props} ref={dropdownRef}>
        <IconProvider fill={theme.colors.base.white}>
          <HeaderLangDropdownToggler $open={isOpen} onClick={handleToggle}>
            <HeaderLangDropdownTogglerIcon />
            <HeaderLangDropdownTogglerText>
              {lang}
            </HeaderLangDropdownTogglerText>
            <HeaderLangDropdownTogglerArrow
              style={{
                transform: isOpen ? 'rotateZ(-180deg)' : 'rotateZ(0)'
              }}
            />
          </HeaderLangDropdownToggler>
        </IconProvider>
        {dropdownTransition((style, item) => (
          <HeaderLangDropdownContent $open={isOpen && !!item} style={style}>
            {children}
          </HeaderLangDropdownContent>
        ))}
      </HeaderLangDropdownStyled>
    </HeaderLangDropdownProvider>
  );
};

export * from './styled';
export * from './item';
