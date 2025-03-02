import React, { useCallback } from 'react';
import { HeaderMenuToggleIcon } from './icon';
import { HeaderMenuToggleButtonStyled } from './styled';
import { useHeader } from '../../context';
import { HeaderTabletToggleEventHandler } from '../..';
import { SidebarSectionProp } from '@/ui/components/sidebar';

export interface HeaderMenuToggleButtonProps {
  headerTabletSection?: SidebarSectionProp;
  onTabletOpen?: HeaderTabletToggleEventHandler;
}

export const HeaderMenuToggleButton: React.FC<HeaderMenuToggleButtonProps> = ({
  headerTabletSection,
  onTabletOpen
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
      aria-label="Menu Toggle Button"
      onClick={toggleMenu}
    >
      <HeaderMenuToggleIcon
        isTabletNavSectionOpen={headerTabletSection === 'nav'}
      />
    </HeaderMenuToggleButtonStyled>
  );
};
