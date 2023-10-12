import React, { useCallback } from 'react';
import { SidebarToggleButtonStyled } from './styled';
import { useSidebar } from '../context';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { MinimizeIcon, UnminimizeIcon } from '@/ui/icons';
import { ButtonProps } from '@/ui/components/button';

export type SidebarToggleButtonProps = ButtonProps;

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = (props) => {
  const theme = useTheme();
  const { isOpen, setIsOpen } = useSidebar();

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <SidebarToggleButtonStyled 
      {...props}
      onClick={handleToggle}
    >
      <IconProvider fill={theme.colors.grayScale.gray1} size={24}>
        {isOpen ? <MinimizeIcon /> : <UnminimizeIcon />}
      </IconProvider>
    </SidebarToggleButtonStyled>
  );
};
