import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { BadgeVariant } from './types';

export interface BadgeStyledProps {
  $variant: BadgeVariant;
}

export const BadgeStyled = styled.span<BadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0px 12px;
  height: 26px;
  border-radius: 13px;
  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'info':
        return theme.colors.grayScale.gray2;
      case 'blue':
        return theme.colors.accent.primary;
      case 'critic':
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
`;
