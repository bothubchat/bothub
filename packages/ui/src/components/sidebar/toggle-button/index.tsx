import React from 'react';
import { SidebarToggleButtonStyled } from './styled';
import { useSidebar } from '../context';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { ButtonProps } from '@/ui/components/button';
import { SidebarToggleLeft, SidebarToggleRight } from '@/ui/icons';

export type SidebarToggleButtonProps = ButtonProps & {
  expandAriaLabel?: string;
  collapseAriaLabel?: string;
};

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
  expandAriaLabel,
  collapseAriaLabel,
  'aria-label': ariaLabel,
  ...props
}) => {
  const theme = useTheme();
  const { isOpen, setIsOpen } = useSidebar();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const ToggleIcon = isOpen ? SidebarToggleLeft : SidebarToggleRight;
  return (
    <SidebarToggleButtonStyled
      {...props}
      $isOpen={isOpen}
      aria-label={ariaLabel ?? (isOpen ? collapseAriaLabel : expandAriaLabel)}
      aria-expanded={isOpen}
      onClick={handleToggle}
    >
      <IconProvider
        fill={theme.colors.grayScale.gray1}
        size={24}
      >
        <ToggleIcon />
      </IconProvider>
    </SidebarToggleButtonStyled>
  );
};
