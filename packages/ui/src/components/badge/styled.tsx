import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { BadgeVariant } from './types';

export interface BadgeStyledProps {
  $variant: BadgeVariant;
  $rounded: boolean;
  $brick: boolean;
}

export const BadgeStyled = styled.div<BadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0px 12px;
  height: 26px;
  border-radius: ${({ $brick }) => {
    if ($brick) {
      return 6;
    }

    return 13;
  }}px;
  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'info':
        return theme.colors.grayScale.gray2;
      case 'blue':
        return theme.colors.accent.primary;
      case 'critic':
      case 'error':
        return theme.colors.critic;
      case 'success':
        return theme.colors.green;
    }
  }};
`;

export interface BadgeTextProps {
  $variant: BadgeVariant;
}

export const BadgeText = styled(Typography).attrs({ variant: 'body-s-medium' })<BadgeTextProps>`
  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'info':
        return theme.colors.base.white;
      default:
        return theme.default.colors.base.white;
    }
  }};
  cursor: default;
`;
