import React from 'react';
import { AvatarProps } from '@/ui/components/avatar';
import { useSidebar } from '../../context';
import { SidebarUserInfoAvatarStyled } from './styled';
import { useTooltip } from '@/ui/components/tooltip';

export type SidebarUserInfoAvatarProps = Omit<AvatarProps, 'ref'>;

export const SidebarUserInfoAvatar: React.FC<SidebarUserInfoAvatarProps> = ({
  ...props
}) => {
  const { isOpen } = useSidebar();
  const {
    handleTooltipMouseEnter,
    handleTooltipMouseLeave
  } = useTooltip();

  return (
    <SidebarUserInfoAvatarStyled
      {...props}
      size={isOpen ? 40 : 34}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    />
  );
};
