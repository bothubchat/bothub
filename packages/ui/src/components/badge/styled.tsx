import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { BadgeVariant } from './types';
import { Skeleton } from '@/ui/components/skeleton';
import { themeVar } from '@/ui/theme';

export interface BadgeStyledProps {
  $variant: BadgeVariant;
  $rounded: boolean;
  $brick: boolean;
  $skeleton: boolean;
}

export const BadgeStyled = styled.div<BadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0px 12px;
  height: 26px;
  cursor: default;
  border-radius: ${({ $brick }) => {
    if ($brick) {
      return 6;
    }

    return 13;
  }}px;
  background: ${({ theme, $variant, $skeleton }) => {
    if ($skeleton) {
      return themeVar(theme, 'colors.grayScale.gray2');
    }
    switch ($variant) {
      case 'info':
        return themeVar(theme, 'tokens.badgeBackground');
      case 'blue':
        return themeVar(theme, 'colors.accent.primary');
      case 'critic':
      case 'error':
        return themeVar(theme, 'colors.critic');
      case 'success':
        return themeVar(theme, 'colors.green');
    }
  }};
  ${({ $skeleton }) =>
    $skeleton &&
    css`
      cursor: progress;
    `}
`;

export interface BadgeTextProps {
  $variant?: BadgeVariant;
}

export const BadgeText = styled(Typography).attrs({
  variant: 'body-s-medium',
})<BadgeTextProps>`
  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'info':
        return themeVar(theme, 'default.colors.base.white');
      default:
        return themeVar(theme, 'default.colors.base.white');
    }
  }};
  cursor: inherit;
  white-space: nowrap;
`;

export const BadgeSkeleton = styled(Skeleton).attrs({ width: 60, height: 12 })`
  border-radius: 8px;
`;
