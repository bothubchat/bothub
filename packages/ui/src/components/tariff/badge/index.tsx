import React, { useCallback } from 'react';
import {
  UserTariffBadgeSkeleton,
  UserTariffBadgeStyled,
  UserTariffBadgeText,
} from './styled';
import { useTooltip } from '@/ui/components/tooltip';
import { UserTariff } from './types';

export interface UserTariffBadgeProps
  extends Omit<React.ComponentProps<'div'>, 'children'> {
  skeleton?: boolean;
  tariff?: UserTariff;
}

export const UserTariffBadge: React.FC<UserTariffBadgeProps> = ({
  skeleton = false,
  tariff,
  ...props
}) => {
  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  const { onMouseEnter, onMouseLeave } = props;
  const handleMouseEnter = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      onMouseEnter?.(event);
      handleTooltipMouseEnter(event);
    },
    [onMouseEnter, handleTooltipMouseEnter],
  );
  const handleMouseLeave = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      onMouseLeave?.(event);
      handleTooltipMouseLeave(event);
    },
    [onMouseLeave, handleTooltipMouseLeave],
  );

  return (
    <UserTariffBadgeStyled
      $skeleton={skeleton}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $tariff={tariff}
    >
      {skeleton && <UserTariffBadgeSkeleton />}
      {(!skeleton || !tariff) && (
        <UserTariffBadgeText>{tariff?.toLowerCase()}</UserTariffBadgeText>
      )}
    </UserTariffBadgeStyled>
  );
};

export * from './types';
export * from './styled';
