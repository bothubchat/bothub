import React from 'react';
import { AvatarProps } from '@/ui/components/avatar';
import { useSidebar } from '../../context';
import { SidebarUserInfoAvatarStyled } from './styled';
import { useTooltip } from '@/ui/components/tooltip';
import { TariffPlan } from '@/ui/components/types';

export type SidebarUserInfoAvatarProps = Omit<
  AvatarProps & { tariffPlan?: TariffPlan },
  'ref'
>;

export const SidebarUserInfoAvatar: React.FC<SidebarUserInfoAvatarProps> = ({
  tariffPlan,
  size,
  ...props
}) => {
  const { isOpen } = useSidebar();
  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  return (
    <SidebarUserInfoAvatarStyled
      {...props}
      $tariffPlan={tariffPlan}
      size={!size ? (isOpen ? 40 : 34) : size}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
      data-test="user-avatar"
    />
  );
};
