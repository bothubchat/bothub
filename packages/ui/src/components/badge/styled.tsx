import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';
import { BadgeVariant } from './types';
import { badge, badgeSkeleton, badgeText } from './badge.css';
import { BADGE_TEXT_CLASS_NAME } from './constants';

// Badge renders plain elements with the classes of `badge.css.ts`. The styled
// parts below are kept for apps that use them directly; they add those
// classes and no rules of their own.

export interface BadgeStyledProps {
  $variant: BadgeVariant;
  $rounded: boolean;
  $brick: boolean;
  $skeleton: boolean;
}

/** @deprecated Use `Badge`. */
export const BadgeStyled = styled.div.attrs<BadgeStyledProps>(
  ({ $variant, $brick, $skeleton }) => ({
    className: badge({ variant: $variant, brick: $brick, skeleton: $skeleton }),
  }),
)``;

export interface BadgeTextProps {
  $variant?: BadgeVariant;
}

/**
 * Text of a badge, for children that aren't a plain string. Its component
 * id is the class Badge gives its own text, so `${BadgeText}` in a styled
 * component selects both. Called without a template literal, so that
 * babel-plugin-styled-components doesn't replace the id.
 */
export const BadgeText = styled(Typography)
  .attrs<BadgeTextProps>({
    variant: 'body-s-medium',
    className: badgeText,
  })
  .withConfig({ componentId: BADGE_TEXT_CLASS_NAME })({});

/** @deprecated Use `Badge` with `skeleton`. */
export const BadgeSkeleton = styled(Skeleton).attrs({
  width: 60,
  height: 12,
  className: badgeSkeleton,
})``;
