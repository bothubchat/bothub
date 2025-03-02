import React from 'react';
import { useHeader } from '../../../context';
import { StyledBurgerIcon, StyledLine } from './styled';

export type HeaderMenuToggleIconProps = {
  isTabletNavSectionOpen?: boolean;
};

export const HeaderMenuToggleIcon: React.FC<HeaderMenuToggleIconProps> =
  React.memo(({ isTabletNavSectionOpen }) => {
    const { isMenuOpen } = useHeader();

    const isOpen =
      typeof isTabletNavSectionOpen !== 'undefined'
        ? isTabletNavSectionOpen
        : isMenuOpen;

    return (
      <StyledBurgerIcon $isOpen={isOpen}>
        <StyledLine />
        <StyledLine />
        <StyledLine />
      </StyledBurgerIcon>
    );
  });
