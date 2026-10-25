import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  HeaderNavDropdownArrow,
  HeaderNavDropdownBody,
  HeaderNavDropdownHead,
  HeaderNavDropdownStyled,
} from './styled';
import { HeaderNavDropdownProvider } from './context';
import { useHeaderMenu } from '../../menu/context';
import { useHeader } from '../../context';
import { useOnClickOutside } from '@/ui/utils';

export interface HeaderNavDropdownProps extends React.PropsWithChildren {
  label: string;
}

export const HeaderNavDropdown: React.FC<HeaderNavDropdownProps> = ({
  label,
  children,
}) => {
  const { variant } = useHeader();
  const { isInMenu } = useHeaderMenu();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  // Inside the mobile menu the dropdown works as an accordion and stays open.
  // Outside it, the document and the window are listened to only while open.
  const shouldCloseOnOutside = isOpen && !isInMenu;

  useOnClickOutside(dropdownRef, handleClose, shouldCloseOnOutside);

  useEffect(() => {
    if (!shouldCloseOnOutside) return;

    window.addEventListener('blur', handleClose);

    return () => window.removeEventListener('blur', handleClose);
  }, [shouldCloseOnOutside, handleClose]);

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0)',
    },
    enter: {
      opacity: isOpen ? 1 : 0.5,
      transform: `scale(${isOpen ? 1 : 0.999})`,
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.999)',
    },
    config: { duration: 150 },
  });

  return (
    <HeaderNavDropdownProvider setIsOpen={setIsOpen}>
      <HeaderNavDropdownStyled
        $inMenu={isInMenu}
        ref={dropdownRef}
      >
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
              transform: isOpen ? 'rotateZ(-180deg)' : 'rotateZ(0)',
            }}
          />
        </HeaderNavDropdownHead>
        {dropdownTransition(
          (style, item) =>
            item && (
              <HeaderNavDropdownBody
                $inMenu={isInMenu}
                style={style}
              >
                {children}
              </HeaderNavDropdownBody>
            ),
        )}
      </HeaderNavDropdownStyled>
    </HeaderNavDropdownProvider>
  );
};

export * from './styled';
export * from './item';
