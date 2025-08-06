import React from 'react';

import { SidebarToggleButtonStyled } from './styled';

import { SidebarToggleLeft } from '@/ui/icons/sidebar-toggle-left';
import { SidebarToggleRight } from '@/ui/icons/sidebar-toggle-right';

import { IconProvider } from '@/ui/components/icon';
import { ButtonProps } from '@/ui/components/button';

import { useSidebar } from '../context';

import { useTheme } from '@/ui/theme';

export type SidebarToggleButtonProps = ButtonProps;

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = (
  props,
) => {
  const theme = useTheme();
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <SidebarToggleButtonStyled
      {...props}
      $isOpen={isOpen}
      onClick={() => setIsOpen(!isOpen)}
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
