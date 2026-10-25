import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { UserTariff } from './types';
import { Skeleton } from '@/ui/components/skeleton';
import { themeVar } from '@/ui/theme';

export interface UserTariffBadgeStyledProps {
  $skeleton: boolean;
  $tariff?: UserTariff;
}

export const UserTariffBadgeStyled = styled.div<UserTariffBadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${({ $tariff, $skeleton }) => {
    if ($skeleton) {
      return '4px 8px';
    }
    switch ($tariff) {
      case 'FREE':
        return '0px';
      default:
        return '4px 12px';
    }
  }};
  height: 30px;
  cursor: default;
  border-radius: 10px;
  background: ${({ theme, $tariff, $skeleton }) => {
    if ($skeleton) {
      return themeVar(theme, 'colors.grayScale.gray2');
    }
    switch ($tariff) {
      case 'FREE':
        return '#00000000';
      case 'BASIC':
        return themeVar(theme, 'colors.accent.primary');
      case 'DELUXE':
      case 'ELITE':
      case 'PREMIUM':
        return themeVar(theme, 'colors.premiumGradient');
    }
  }};
  ${({ $skeleton }) =>
    $skeleton &&
    css`
      cursor: progress;
    `}
`;

export const UserTariffBadgeText = styled(Typography).attrs({
  variant: 'body-m-medium',
})`
  color: ${({ theme }) => themeVar(theme, 'default.colors.base.white')};
  cursor: inherit;
  white-space: nowrap;
  text-transform: capitalize;
`;

export const UserTariffBadgeSkeleton = styled(Skeleton).attrs({
  width: 60,
  height: 12,
})`
  border-radius: 8px;
`;
