import React, { useCallback } from 'react';
import { HeaderMenuToggleIcon } from './icon';
import { HeaderMenuToggleButtonStyled } from './styled';
import { useHeader } from '../../context';

export const HeaderMenuToggleButton: React.FC = () => {
  const { variant, isMenuOpen, setIsMenuOpen } = useHeader();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return (
    <HeaderMenuToggleButtonStyled
      $variant={variant}
      aria-label="Menu Toggle Button"
      onClick={toggleMenu}
    >
      <HeaderMenuToggleIcon />
    </HeaderMenuToggleButtonStyled>
  );
};
