import type { StyleRule } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/ui/theme/contract.css';
import { media } from '@/ui/adaptive/media';
import { scaled } from '@/ui/styles/zero-runtime/scale';
import { TypographyDeclarations, typographyVariantStyles } from './variants';
import type { TypographyVariant } from './types';

const toStyleRule = (declarations: TypographyDeclarations): StyleRule => {
  const rule: Record<string, unknown> = {};
  const customProperties: Record<string, string> = {};

  Object.entries(declarations).forEach(([property, value]) => {
    if (property.startsWith('--')) {
      customProperties[property] = value;
    } else {
      rule[property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] =
        value;
    }
  });

  return { ...rule, vars: customProperties } as StyleRule;
};

const variantRule = (variant: TypographyVariant): StyleRule => {
  const { base, tablet, mobile } = typographyVariantStyles[variant];

  // Tablet before mobile: both match on a phone, the mobile one has to win.
  return scaled({
    ...toStyleRule(base),
    '@media': {
      ...(tablet && { [media.tablet]: toStyleRule(tablet) }),
      ...(mobile && { [media.mobile]: toStyleRule(mobile) }),
    },
  });
};

export const typography = recipe({
  base: scaled({
    margin: '0px',
    color: vars.tokens.interfaceText,
    fontWeight: 'normal',
    textDecoration: 'none',
    vars: { '--skeleton-width': '200px' },
  }),
  variants: {
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
    fullWidth: {
      true: { width: '100%' },
      false: {},
    },
    variant: Object.fromEntries(
      Object.keys(typographyVariantStyles).map((variant) => [
        variant,
        variantRule(variant as TypographyVariant),
      ]),
    ) as Record<TypographyVariant, StyleRule>,
  },
  defaultVariants: {
    variant: 'body-m-medium',
    align: 'left',
    fullWidth: false,
  },
});

/**
 * Every Typography element has this class: a selector for Typography inside
 * a styled component (`& .${typographyClassName}`), the zero-runtime
 * replacement of the `${TypographyStyled}` component selector.
 */
export const typographyClassName = typography.classNames.base;
