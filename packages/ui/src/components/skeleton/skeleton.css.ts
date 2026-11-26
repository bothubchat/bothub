import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/ui/theme/contract.css';
import { scaled } from '@/ui/styles/zero-runtime/scale';
import { skeletonProperties } from './properties';

// Sizes, colors and opacity come from custom properties set inline by
// `Skeleton`, so these keyframes and the classes below don't change per value.
const pulse = keyframes({
  '0%': {
    background: `var(${skeletonProperties.colorFrom})`,
    opacity: `var(${skeletonProperties.opacityFrom}, 1)`,
  },
  '85%': {
    background: `var(${skeletonProperties.colorTo})`,
    opacity: `var(${skeletonProperties.opacityTo}, 1)`,
  },
  '100%': {
    background: `var(${skeletonProperties.colorFrom})`,
    opacity: `var(${skeletonProperties.opacityFrom}, 1)`,
  },
});

export const skeleton = recipe({
  base: scaled({
    display: 'inline-flex',
    flexShrink: 0,
    verticalAlign: 'middle',
    width: `var(${skeletonProperties.width}, var(--skeleton-width, 40px))`,
    height: `var(${skeletonProperties.height}, var(--skeleton-height, 40px))`,
    background: vars.colors.grayScale.gray1,
    cursor: 'progress',
    vars: {
      [skeletonProperties.colorFrom]: vars.tokens.skeletonFrom,
      [skeletonProperties.colorTo]: vars.tokens.skeletonTo,
    },
    animation: `${pulse} 2s infinite forwards`,
    overflow: 'hidden',
  }),
  variants: {
    variant: {
      rounded: scaled({ borderRadius: 'var(--skeleton-radius, 4px)' }),
      circular: { borderRadius: '50%' },
      rectangular: { borderRadius: '0px' },
    },
  },
  defaultVariants: {
    variant: 'rounded',
  },
});
