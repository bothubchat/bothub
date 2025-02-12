import React, { useCallback } from 'react';
import {
  SidebarMenuNavIcon,
  SidebarMenuNavLinkStyled,
  SidebarMenuNavLinkStyledProps,
  SidebarMenuNavLinkText
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useSidebarMenu } from '../../context';
import { useSidebar } from '../../../context';
import { useTheme } from '@/ui/theme';

export type SidebarMenuNavLinkProps = Omit<
  React.ComponentProps<typeof SidebarMenuNavLinkStyled>,
  keyof SidebarMenuNavLinkStyledProps
> & {
  as?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  to?: string;
  active?: boolean;
  icon?: React.ReactNode;
};

export const SidebarMenuNavLink: React.FC<SidebarMenuNavLinkProps> = ({
  as,
  to,
  icon,
  active = false,
  children,
  ...props
}) => {
  const { setIsOpen } = useSidebarMenu();
  const { isOpen } = useSidebar();
  const theme = useTheme();
  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    (event) => {
      setIsOpen(false);

      props.onClick?.(event);
    },
    [props.onClick]
  );

  return (
    <SidebarMenuNavLinkStyled
      $active={active}
      {...props}
      as={as}
      to={to}
      onClick={handleClick}
    >
      <SidebarMenuNavIcon $active={active}>
        <IconProvider
          size={18}
          fill={
            active ? theme.colors.accent.primary : theme.colors.grayScale.gray1
          }
          stroke={
            active ? theme.colors.accent.primary : theme.colors.grayScale.gray1
          }
        >
          {icon}
        </IconProvider>
      </SidebarMenuNavIcon>
      <SidebarMenuNavLinkText $open={isOpen}>{children}</SidebarMenuNavLinkText>
    </SidebarMenuNavLinkStyled>
  );
};
