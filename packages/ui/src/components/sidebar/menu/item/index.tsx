import React, { useRef, useState } from 'react';
import {
  SidebarMenuListItem,
  SidebarMenuItemIconBox,
  SidebarMenuItemText,
} from '../styled';
import { useSidebar } from '../../context';
import { useSidebarMenu } from '../context';
import { SidebarMenuItemTooltip } from './tooltip';

type SidebarMenuItemProps = {
  icon: React.ReactNode;
  active?: boolean;
  to?: string;
  as?: React.ElementType;
} & React.PropsWithChildren &
  React.HTMLAttributes<HTMLElement>;

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  children,
  active,
  as,
  to,
  ...props
}) => {
  const { isOpen } = useSidebar();
  const { isShowTooltips } = useSidebarMenu();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <SidebarMenuListItem
      {...props}
      as={as}
      to={to}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-test="sidebar-menu-item"
    >
      <SidebarMenuItemIconBox $active={!!active}>{icon}</SidebarMenuItemIconBox>
      <SidebarMenuItemText
        $isOpen={isOpen}
        $active={!!active}
      >
        {children}
      </SidebarMenuItemText>
      <SidebarMenuItemTooltip
        hovered={hovered}
        hidden={isOpen || !isShowTooltips}
      >
        {children}
      </SidebarMenuItemTooltip>
    </SidebarMenuListItem>
  );
};
