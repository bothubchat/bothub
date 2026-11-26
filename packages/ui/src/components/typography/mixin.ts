import { css } from 'styled-components';
import { TypographyDeclarations, typographyVariantStyles } from './variants';
import type { TypographyVariant } from './types';

const toCss = (declarations: TypographyDeclarations): string =>
  Object.entries(declarations)
    .map(([property, value]) => `${property}: ${value};`)
    .join('\n');

const createTypographyStyles = (variant: TypographyVariant) => css`
  ${({ theme }) => {
    const { base, tablet, mobile } = typographyVariantStyles[variant];

    return [
      toCss(base),
      tablet &&
        `@media (max-width: ${theme.tablet.maxWidth}) { ${toCss(tablet)} }`,
      mobile &&
        `@media (max-width: ${theme.mobile.maxWidth}) { ${toCss(mobile)} }`,
    ]
      .filter(Boolean)
      .join('\n');
  }}
`;

type TypographyStyles = ReturnType<typeof createTypographyStyles>;

// The rules depend only on the variant (the theme is read at render time),
// so build each variant's css once instead of on every render.
const typographyStyles = new Map<TypographyVariant, TypographyStyles>();

/**
 * Font styles of a Typography variant for a styled component. Typography
 * itself is styled without styled-components (`typography.css.ts`); both
 * come from `typographyVariantStyles`.
 */
export const getTypographyStyles = (
  variant: TypographyVariant,
): TypographyStyles => {
  let styles = typographyStyles.get(variant);
  if (!styles) {
    styles = createTypographyStyles(variant);
    typographyStyles.set(variant, styles);
  }

  return styles;
};
