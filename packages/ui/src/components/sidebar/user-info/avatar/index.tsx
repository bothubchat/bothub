import React from 'react';
import { AvatarProps } from '@/ui/components/avatar';
import { SidebarUserInfoAvatarStyled } from './styled';
import { useTooltip } from '@/ui/components/tooltip';
import { TariffPlan } from '@/ui/components/types';

export type SidebarUserInfoAvatarProps = Omit<
  AvatarProps & { tariffPlan?: TariffPlan },
  'ref'
>;

export const SidebarUserInfoAvatar: React.FC<SidebarUserInfoAvatarProps> = ({
  tariffPlan,
  ...props
}) => {
  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  return (
    <SidebarUserInfoAvatarStyled
      {...props}
      $tariffPlan={tariffPlan}
      size={40}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    />
  );
};
