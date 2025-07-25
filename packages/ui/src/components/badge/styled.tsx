import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { BadgeVariant } from './types';
import { Skeleton } from '@/ui/components/skeleton';

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
      return theme.colors.grayScale.gray2;
    }
    switch ($variant) {
      case 'info':
        return theme.mode === 'dark'
          ? theme.colors.grayScale.gray3
          : theme.colors.grayScale.gray5;
      case 'blue':
        return theme.colors.accent.primary;
      case 'critic':
      case 'error':
        return theme.colors.critic;
      case 'success':
        return theme.colors.green;
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
        return theme.default.colors.base.white;
      default:
        return theme.default.colors.base.white;
    }
  }};
  cursor: inherit;
  white-space: nowrap;
`;

export const BadgeSkeleton = styled(Skeleton).attrs({ width: 60, height: 12 })`
  border-radius: 8px;
`;
