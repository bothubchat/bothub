import React from 'react';
import {
  SidebarMenuListItem,
  SidebarMenuItemIconBox,
  SidebarMenuItemText,
} from '../styled';
import { useSidebar } from '../../context';

type SidebarMenuItemProps = {
  icon: React.ReactNode;
  active?: boolean;
  as?: React.ElementType;
} & React.PropsWithChildren &
  React.HTMLAttributes<HTMLElement>;

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  children,
  active,
  as,
  ...props
}) => {
  const { isOpen } = useSidebar();

  return (
    <SidebarMenuListItem
      {...props}
      as={as}
      data-test="sidebar-menu-item"
    >
      <SidebarMenuItemIconBox $active={!!active}>{icon}</SidebarMenuItemIconBox>
      {isOpen && (
        <SidebarMenuItemText $active={!!active}>{children}</SidebarMenuItemText>
      )}
    </SidebarMenuListItem>
  );
};
