import { standardDark } from '@/ui/theme/themes';

// Breakpoints are the same in every theme, so static styles take them from
// one of them. For zero-runtime (vanilla-extract) styles: the strings match
// the media queries `adaptive()` and the styled components render.

const { tablet, mobile, dashboard } = standardDark;

const below = (maxWidth: string) => `(max-width: ${maxWidth})`;
const above = (maxWidth: string) => `(min-width: ${parseInt(maxWidth) + 1}px)`;

export const media = {
  /** `theme.tablet.maxWidth` and narrower. */
  tablet: below(tablet.maxWidth),
  /** `theme.mobile.maxWidth` and narrower. */
  mobile: below(mobile.maxWidth),
  /** Wider than `theme.tablet.maxWidth`. */
  desktop: above(tablet.maxWidth),
  touch: 'only screen and (hover: none) and (pointer: coarse)',
  dashboard: {
    tablet: below(dashboard.tablet.maxWidth),
    miniTablet: below(dashboard.miniTablet.maxWidth),
    mobile: below(dashboard.mobile.maxWidth),
    desktop: above(dashboard.tablet.maxWidth),
  },
} as const;
