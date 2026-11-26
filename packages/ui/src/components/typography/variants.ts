import type { TypographyVariant } from './types';

/** CSS declarations of a typography variant, in their source order. */
export type TypographyDeclarations = Readonly<Record<string, string>>;

export interface TypographyVariantStyle {
  base: TypographyDeclarations;
  /** Under the tablet breakpoint (`theme.tablet.maxWidth`). */
  tablet?: TypographyDeclarations;
  /** Under the mobile breakpoint (`theme.mobile.maxWidth`). */
  mobile?: TypographyDeclarations;
}

/**
 * Font metrics of every typography variant: the one source for the
 * zero-runtime classes (`typography.css.ts`) and the styled-components
 * mixin `getTypographyStyles`.
 */
export const typographyVariantStyles: Record<
  TypographyVariant,
  TypographyVariantStyle
> = {
  h1: {
    base: {
      'font-weight': '700',
      'font-size': '46px',
      'line-height': '60px',
      '--skeleton-height': '60px',
    },
    tablet: {
      'font-size': '40px',
      'line-height': '52px',
      '--skeleton-height': '52px',
    },
    mobile: {
      'font-size': '28px',
      'line-height': '36px',
      '--skeleton-height': '36px',
    },
  },
  h2: {
    base: {
      'font-weight': '600',
      'font-size': '34px',
      'line-height': '44px',
      '--skeleton-height': '44px',
    },
    tablet: {
      'font-size': '30px',
      'line-height': '40px',
      '--skeleton-height': '40px',
    },
    mobile: {
      'font-size': '24px',
      'line-height': '32px',
      '--skeleton-height': '32px',
    },
  },
  h3: {
    base: {
      'font-weight': '600',
      'font-size': '30px',
      'line-height': '40px',
      '--skeleton-height': '40px',
    },
    mobile: {
      'font-size': '22px',
      'line-height': '30px',
      '--skeleton-height': '30px',
    },
  },
  h4: {
    base: {
      'font-weight': '600',
      'font-size': '26px',
      'line-height': '34px',
      '--skeleton-height': '34px',
    },
    tablet: {
      'font-size': '22px',
      'line-height': '30px',
      '--skeleton-height': '30px',
    },
    mobile: {
      'font-size': '20px',
      'line-height': '26px',
      '--skeleton-height': '26px',
    },
  },
  h5: {
    base: {
      'font-weight': '600',
      'font-size': '22px',
      'line-height': '30px',
      '--skeleton-height': '30px',
    },
    tablet: {
      'font-size': '20px',
      'line-height': '26px',
      '--skeleton-height': '26px',
    },
    mobile: {
      'font-size': '18px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
  },
  h6: {
    base: {
      'font-weight': '600',
      'font-size': '18px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
  },
  'body-xxxl-regular': {
    base: {
      'font-size': '46px',
      'font-weight': '400',
      'line-height': '60px',
      '--skeleton-height': '60px',
    },
    tablet: {
      'font-size': '30px',
      'line-height': '40px',
      '--skeleton-height': '40px',
    },
    mobile: {
      'font-size': '24px',
      'line-height': '30px',
      '--skeleton-height': '30px',
    },
  },
  'banner-h1-bold': {
    base: {
      'font-size': '128px',
      'font-weight': '700',
      'line-height': '110px',
      '--skeleton-height': '110px',
    },
    tablet: {
      'font-size': '76px',
      'line-height': '70px',
      '--skeleton-height': '70px',
    },
    mobile: {
      'font-size': '36px',
      'line-height': '40px',
      '--skeleton-height': '40px',
    },
  },
  'banner-h3-black': {
    base: {
      'font-weight': '900',
      'font-size': '40px',
      'line-height': '40px',
      '--skeleton-height': '40px',
    },
    tablet: {
      'font-size': '24px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
    mobile: {
      'font-size': '20px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
  },
  'body-xxl-regular': {
    base: {
      'font-weight': '400',
      'font-size': '26px',
      'line-height': '34px',
      '--skeleton-height': '34px',
    },
    tablet: {
      'font-size': '22px',
      'line-height': '30px',
      '--skeleton-height': '30px',
    },
    mobile: {
      'font-size': '20px',
      'line-height': '26px',
      '--skeleton-height': '26px',
    },
  },
  'body-h1-regular': {
    base: {
      'font-weight': '400',
      'font-size': '46px',
      'line-height': '60px',
      '--skeleton-height': '60px',
    },
    tablet: {
      'font-size': '40px',
      'line-height': '52px',
      '--skeleton-height': '52px',
    },
    mobile: {
      'font-size': '28px',
      'line-height': '36px',
      '--skeleton-height': '36px',
    },
  },
  'body-xxl-semibold': {
    base: {
      'font-weight': '600',
      'font-size': '26px',
      'line-height': '34px',
      '--skeleton-height': '34px',
    },
    tablet: {
      'font-size': '22px',
      'line-height': '30px',
      '--skeleton-height': '30px',
    },
    mobile: {
      'font-size': '20px',
      'line-height': '26px',
      '--skeleton-height': '26px',
    },
  },
  'body-xl-semibold': {
    base: {
      'font-weight': '600',
      'font-size': '22px',
      'line-height': '29px',
      '--skeleton-height': '29px',
    },
    tablet: {
      'font-size': '20px',
      'line-height': '26px',
      '--skeleton-height': '26px',
    },
    mobile: {
      'font-size': '18px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
  },
  'body-xl-medium': {
    base: {
      'font-weight': '500',
      'font-size': '22px',
      'line-height': '29px',
      '--skeleton-height': '29px',
    },
    tablet: {
      'font-size': '20px',
      'line-height': '26px',
      '--skeleton-height': '26px',
    },
    mobile: {
      'font-size': '18px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
  },
  'body-xl-regular': {
    base: {
      'font-size': '24px',
      'font-weight': '400',
      'line-height': '31.2px',
      '--skeleton-height': '31.2px',
    },
    tablet: {
      'font-size': '22px',
      'line-height': '30px',
      '--skeleton-height': '30px',
    },
    mobile: {
      'font-size': '18px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
  },
  'body-m-semibold': {
    base: {
      'font-weight': '600',
      'font-size': '16px',
      'line-height': '22px',
      '--skeleton-height': '22px',
    },
    tablet: {
      'font-size': '14px',
      'line-height': '18px',
      '--skeleton-height': '18px',
    },
  },
  'body-m-medium': {
    base: {
      'font-weight': '500',
      'font-size': '16px',
      'line-height': '22px',
      '--skeleton-height': '22px',
    },
    tablet: {
      'font-size': '14px',
      'line-height': '18px',
      '--skeleton-height': '18px',
    },
  },
  'body-m-regular': {
    base: {
      'font-weight': '400',
      'font-size': '16px',
      'line-height': '22px',
      '--skeleton-height': '22px',
    },
    tablet: {
      'font-size': '14px',
      'line-height': '18px',
      '--skeleton-height': '18px',
    },
  },
  'body-s-medium': {
    base: {
      'font-weight': '500',
      'font-size': '14px',
      'line-height': '18px',
      '--skeleton-height': '18px',
    },
    tablet: {
      'font-size': '12px',
      'line-height': '16px',
      '--skeleton-height': '16px',
    },
  },
  'body-s-semibold': {
    base: {
      'font-weight': '600',
      'font-size': '14px',
      'line-height': '18px',
      '--skeleton-height': '18px',
    },
    tablet: {
      'font-size': '12px',
      'line-height': '16px',
      '--skeleton-height': '16px',
    },
  },
  'body-l-regular': {
    base: {
      'font-weight': '400',
      'font-size': '18px',
      'line-height': '23.4px',
      '--skeleton-height': '24px',
    },
    mobile: {
      'font-size': '16px',
      'line-height': '22px',
      '--skeleton-height': '22px',
    },
  },
  'body-l-medium': {
    base: {
      'font-weight': '500',
      'font-size': '18px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
    mobile: {
      'font-size': '16px',
      'line-height': '22px',
      '--skeleton-height': '22px',
    },
  },
  'body-l-medium-italic': {
    base: {
      'font-weight': '500',
      'font-style': 'italic',
      'font-size': '18px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
    mobile: {
      'font-size': '16px',
      'line-height': '22px',
      '--skeleton-height': '22px',
    },
  },
  'body-s-regular': {
    base: {
      'font-weight': '400',
      'font-size': '14px',
      'line-height': '18px',
      '--skeleton-height': '18px',
    },
    tablet: {
      'font-size': '12px',
      'line-height': '16px',
      '--skeleton-height': '16px',
    },
  },
  'body-xs-regular': {
    base: {
      'font-weight': '400',
      'font-size': '12px',
      'line-height': '16px',
      '--skeleton-height': '16px',
    },
    tablet: {
      'font-size': '10px',
      'line-height': '16px',
      '--skeleton-height': '16px',
    },
  },
  'body-xs-medium': {
    base: {
      'font-weight': '500',
      'font-size': '12px',
      'line-height': '16px',
      '--skeleton-height': '16px',
    },
    tablet: {
      'font-size': '10px',
      'line-height': '16px',
      '--skeleton-height': '16px',
    },
  },
  'body-l-semibold': {
    base: {
      'font-weight': '600',
      'font-size': '18px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
    mobile: {
      'font-size': '16px',
      'line-height': '22px',
      '--skeleton-height': '22px',
    },
  },
  'button-sm': {
    base: {
      'font-weight': '500',
      'font-size': '15px',
      'line-height': '20px',
      '--skeleton-height': '20px',
    },
  },
  'button-md': {
    base: {
      'font-weight': '500',
      'font-size': '18px',
      'line-height': '24px',
      '--skeleton-height': '24px',
    },
  },
  'input-md': {
    base: {
      'font-weight': '400',
      'font-size': '16px',
      'line-height': '22px',
      '--skeleton-height': '22px',
    },
  },
  'input-sm': {
    base: {
      'font-weight': '400',
      'font-size': '14px',
      'line-height': '18px',
      '--skeleton-height': '18px',
    },
  },
};
