import React from 'react';
import { useHeader } from '../../../context';
import { StyledBurgerIcon, StyledLine } from './styled';

export type HeaderMenuToggleIconProps = {
  isOpen?: boolean;
};

export const HeaderMenuToggleIcon: React.FC<HeaderMenuToggleIconProps> =
  React.memo(({ isOpen }) => {
    const { isMenuOpen } = useHeader();

    const resultIsOpen = typeof isOpen !== 'undefined' ? isOpen : isMenuOpen;

    return (
      <StyledBurgerIcon $isOpen={resultIsOpen}>
        <StyledLine />
        <StyledLine />
        <StyledLine />
      </StyledBurgerIcon>
    );
  });
