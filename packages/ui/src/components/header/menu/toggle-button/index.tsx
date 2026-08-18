import React, { useCallback } from 'react';
import { HeaderMenuToggleIcon } from './icon';
import { HeaderMenuToggleButtonStyled } from './styled';
import { useHeader } from '../../context';

type HeaderTabletToggleEventHandler = () => unknown;

export interface HeaderMenuToggleButtonProps {
  isOpen?: boolean;
  onTabletOpen?: HeaderTabletToggleEventHandler;
  'aria-label'?: string;
}

export const HeaderMenuToggleButton: React.FC<HeaderMenuToggleButtonProps> = ({
  isOpen,
  onTabletOpen,
  'aria-label': ariaLabel,
}) => {
  const { variant, isMenuOpen, setIsMenuOpen } = useHeader();

  const toggleMenu = useCallback(() => {
    if (onTabletOpen) {
      onTabletOpen();
      return;
    }
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen, onTabletOpen]);

  return (
    <HeaderMenuToggleButtonStyled
      $variant={variant}
      aria-label={ariaLabel}
      aria-expanded={isOpen ?? isMenuOpen}
      onClick={toggleMenu}
    >
      <HeaderMenuToggleIcon isOpen={isOpen} />
    </HeaderMenuToggleButtonStyled>
  );
};
