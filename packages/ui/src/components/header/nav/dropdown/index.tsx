import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { useTransition } from '@react-spring/web';
import {
  HeaderNavDropdownArrow, HeaderNavDropdownBody, HeaderNavDropdownHead, HeaderNavDropdownStyled
} from './styled';
import { HeaderNavDropdownProvider } from './context';
import { useHeaderMenu } from '../../menu/context';
import { useHeader } from '../../context';

export interface HeaderNavDropdownProps extends React.PropsWithChildren {
  label: string;
}

export const HeaderNavDropdown: React.FC<HeaderNavDropdownProps> = ({ label, children }) => {
  const { variant } = useHeader();
  const { isInMenu } = useHeaderMenu();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const dropdownEl: HTMLDivElement | null = dropdownRef.current;

    if (dropdownEl !== null) {
      const clickListener = (event: Event) => {
        if (!dropdownEl.contains(event.target as Node) && !isInMenu) {
          setIsOpen(false);
        }
      };
      const blurListener = () => {
        if (!isInMenu) {
          setIsOpen(false);
        }
      };

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
      transform: `scale(${isOpen ? 1 : 0.999})`
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.999)',
    },
    config: { duration: 150 }
  });

  return (
    <HeaderNavDropdownProvider setIsOpen={setIsOpen}>
      <HeaderNavDropdownStyled $inMenu={isInMenu} ref={dropdownRef}>
        <HeaderNavDropdownHead
          as="span"
          $variant={variant}
          $active={isOpen}
          $inMenu={isInMenu}
          onClick={toggleDropdown}
        >
          {label}
          <HeaderNavDropdownArrow
            style={{
              transform: isOpen ? 'rotateZ(-180deg)' : 'rotateZ(0)'
            }}
          />
        </HeaderNavDropdownHead>
        {dropdownTransition((style, item) => (
          item && (
            <HeaderNavDropdownBody
              $inMenu={isInMenu}
              style={style}
            >
              {children}
            </HeaderNavDropdownBody>
          )))}
      </HeaderNavDropdownStyled>
    </HeaderNavDropdownProvider>
  );
};

export * from './styled';
export * from './item';
