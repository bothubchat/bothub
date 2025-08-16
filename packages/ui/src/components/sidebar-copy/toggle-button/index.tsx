import React, { useCallback } from 'react';
import { SidebarToggleButtonStyled } from './styled';
import { useSidebar } from '../context';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { ButtonProps } from '@/ui/components/button';
import { SidebarToggleLeft, SidebarToggleRight } from '@/ui/icons';

export type SidebarToggleButtonProps = ButtonProps;

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = (
  props,
) => {
  const theme = useTheme();
  const { isOpen, setIsOpen } = useSidebar();

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <SidebarToggleButtonStyled
      {...props}
      disableHoverColor
      $isOpen={isOpen}
      onClick={handleToggle}
    >
      <IconProvider
        fill={theme.colors.grayScale.gray1}
        size={24}
      >
        {isOpen ? <SidebarToggleLeft /> : <SidebarToggleRight />}
      </IconProvider>
    </SidebarToggleButtonStyled>
  );
};
