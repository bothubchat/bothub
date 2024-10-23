import React, { useCallback } from 'react';
import { SidebarMenuNavLinkStyled, SidebarMenuNavLinkStyledProps, SidebarMenuNavLinkText } from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useSidebarMenu } from '../../context';

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
  as, to, icon, active = false, children, ...props
}) => {
  const { setIsOpen } = useSidebarMenu();

  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
    setIsOpen(false);
    
    props.onClick?.(event);
  }, [props.onClick]);

  return (
    <SidebarMenuNavLinkStyled
      $active={active}
      {...props}
      as={as}
      to={to}
      onClick={handleClick}
    >
      <IconProvider
        size={34}
      >
        {icon}
      </IconProvider>
      <SidebarMenuNavLinkText>
        {children}
      </SidebarMenuNavLinkText>
    </SidebarMenuNavLinkStyled>
  );
};
