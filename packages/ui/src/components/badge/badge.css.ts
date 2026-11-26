import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/ui/theme/contract.css';
import { scaled } from '@/ui/styles/zero-runtime/scale';
// Badge overrides some Typography and Skeleton rules at the same
// specificity: importing their styles puts their CSS before this file's.
import '@/ui/components/typography/typography.css';
import '@/ui/components/skeleton/skeleton.css';

export const badge = recipe({
  base: scaled({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0px 12px',
    height: '26px',
    cursor: 'default',
    borderRadius: '13px',
  }),
  variants: {
    variant: {
      info: { background: vars.tokens.badgeBackground },
      blue: { background: vars.colors.accent.primary },
      critic: { background: vars.colors.critic },
      error: { background: vars.colors.critic },
      success: { background: vars.colors.green },
    },
    brick: {
      true: scaled({ borderRadius: '6px' }),
      false: {},
    },
    // After `variant`: its background wins.
    skeleton: {
      true: {
        background: vars.colors.grayScale.gray2,
        cursor: 'progress',
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: 'info',
    brick: false,
    skeleton: false,
  },
});

export const badgeText = style({
  color: vars.default.colors.base.white,
  cursor: 'inherit',
  whiteSpace: 'nowrap',
});

export const badgeSkeleton = style(scaled({ borderRadius: '8px' }));
