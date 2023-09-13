import React, {
  useCallback, useEffect, useRef, useState 
} from 'react';
import {
  HeaderLangDropdownContent, 
  HeaderLangDropdownStyled, 
  HeaderLangDropdownToggler, 
  HeaderLangDropdownTogglerArrow, 
  HeaderLangDropdownTogglerIcon, 
  HeaderLangDropdownTogglerText 
} from './styled';
import { HeaderLangDropdownProvider } from './context';

export interface HeaderLangDropdownProps extends 
  React.ComponentProps<typeof HeaderLangDropdownStyled> {
  lang: string;
}

export const HeaderLangDropdown: React.FC<HeaderLangDropdownProps> = ({
  lang, children, ...props
}) => {
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
    <HeaderLangDropdownProvider setIsOpen={setIsOpen}>
      <HeaderLangDropdownStyled {...props} ref={dropdownRef}>
        <HeaderLangDropdownToggler $open={isOpen} onClick={handleToggle}>
          <HeaderLangDropdownTogglerIcon />
          <HeaderLangDropdownTogglerText>
            {lang}
          </HeaderLangDropdownTogglerText>
          <HeaderLangDropdownTogglerArrow 
            initial={{
              transform: `rotateZ(${isOpen ? -180 : 0}deg)`
            }}
            animate={{
              transform: `rotateZ(${isOpen ? -180 : 0}deg)`
            }}
          />
        </HeaderLangDropdownToggler>
        {isOpen && (
          <HeaderLangDropdownContent>
            {children}
          </HeaderLangDropdownContent>
        )}
      </HeaderLangDropdownStyled>
    </HeaderLangDropdownProvider>
  );
};

export * from './styled';
export * from './item';
