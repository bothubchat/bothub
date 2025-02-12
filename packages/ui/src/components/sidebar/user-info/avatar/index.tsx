import React from 'react';
import { AvatarProps } from '@/ui/components/avatar';
import { useSidebar } from '../../context';
import { SidebarUserInfoAvatarStyled } from './styled';
import { useTooltip } from '@/ui/components/tooltip';
import { TariffPlan } from './types';

export type SidebarUserInfoAvatarProps = Omit<
  AvatarProps & { tariffPlan?: TariffPlan },
  'ref'
>;

export const SidebarUserInfoAvatar: React.FC<SidebarUserInfoAvatarProps> = ({
  tariffPlan,
  ...props
}) => {
  const { isOpen } = useSidebar();
  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  return (
    <SidebarUserInfoAvatarStyled
      {...props}
      $tariffPlan={tariffPlan}
      size={isOpen ? 40 : 34}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    />
  );
};
