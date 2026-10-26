import { colorToRgba } from '@/ui/utils/colors/colorToRgba';
import { isBright } from '@/ui/utils/colors/isBright';
import type { Theme, ThemeTokens } from './types';

export type ThemeTokenSource = Omit<Theme, 'tokens'>;

type ThemeTokenValue = (theme: ThemeTokenSource) => string;

/**
 * A token is either a pair of values for the light and the dark mode, or a
 * function of the whole theme when it also depends on the scheme.
 */
type ThemeTokenDefinition =
  | { light: ThemeTokenValue; dark: ThemeTokenValue }
  | ThemeTokenValue;

function resolveToken(
  definition: ThemeTokenDefinition,
  theme: ThemeTokenSource,
): string {
  return typeof definition === 'function'
    ? definition(theme)
    : definition[theme.mode](theme);
}

/**
 * Semantic colors that differ between the light and the dark mode. Components
 * read `theme.tokens.<name>` instead of branching on `theme.mode`.
 *
 * In the light mode `base.white` and `base.black` are swapped, so
 * `theme.default.colors` (the standard dark palette) is used where a color
 * must stay the same in both modes.
 */
export const themeTokenDefinitions = {
  // Surfaces
  surfaceElevated: {
    light: (theme) => theme.default.colors.base.white,
    dark: (theme) => theme.colors.grayScale.gray4,
  },
  surfaceSecondary: {
    light: (theme) => theme.colors.grayScale.gray4,
    dark: (theme) => theme.colors.grayScale.gray3,
  },
  surfaceTertiary: {
    light: (theme) => theme.default.colors.base.white,
    dark: (theme) => theme.colors.grayScale.gray3,
  },
  surfaceActive: {
    light: (theme) => theme.colors.grayScale.gray2,
    dark: (theme) => colorToRgba(theme.colors.accent.primaryLight, 0.5),
  },
  surfaceGlass: {
    light: () => 'rgba(255, 255, 255, 0.65)',
    dark: () => 'rgba(18, 24, 37, 0.75)',
  },
  surfaceNotification: {
    light: (theme) => theme.default.colors.base.white,
    dark: (theme) => theme.colors.grayScale.gray2,
  },
  surfaceGroupHeader: {
    light: (theme) => theme.colors.base.black,
    dark: (theme) => theme.colors.grayScale.gray4,
  },
  hoverOverlay: {
    light: () => 'rgba(0, 0, 0, 0.05)',
    dark: () => 'rgba(255, 255, 255, 0.05)',
  },
  radioBackground: {
    light: (theme) => theme.default.colors.base.white,
    dark: () => 'rgba(0, 0, 0, 0)',
  },
  badgeBackground: {
    light: (theme) => theme.colors.grayScale.gray5,
    dark: (theme) => theme.colors.grayScale.gray3,
  },
  actionActiveBackground: {
    light: (theme) => theme.default.colors.base.white,
    dark: (theme) => theme.colors.accent.primaryLight,
  },
  searchResultHoverBackground: {
    light: () => 'rgba(71, 133, 255, 0.2)',
    dark: () => 'rgba(28, 100, 242, 0.2)',
  },
  scrollbarTrack: {
    light: (theme) => theme.colors.grayScale.gray4,
    dark: (theme) => theme.colors.grayScale.gray5,
  },
  sliderFadeSmall: {
    light: () => 'linear-gradient(-90deg, #F5F6F700 0%, #F5F6F7 100%)',
    dark: () => 'linear-gradient(-90deg, #12182500 0%, #121825 100%)',
  },
  sliderFadeMedium: {
    light: () => 'linear-gradient(-90deg, #F5F6F700 0%, #F5F6F7 100%)',
    dark: () => 'linear-gradient(-90deg, #0e0c1500 0%, #0e0c15 100%)',
  },
  skeletonFrom: {
    light: (theme) => theme.colors.grayScale.gray2,
    dark: (theme) => theme.colors.grayScale.gray5,
  },
  skeletonTo: {
    light: (theme) => theme.colors.grayScale.gray5,
    dark: (theme) => theme.colors.grayScale.gray1,
  },

  buttonPrimaryBackground: (theme) =>
    theme.mode === 'light' && theme.scheme === 'standard'
      ? theme.colors.accent.primaryLight
      : theme.colors.accent.primary,

  // Translucent theme colors, computed once instead of in every style
  gray4Alpha75: (theme) => colorToRgba(theme.colors.grayScale.gray4, 0.75),
  accentPrimaryAlpha20: (theme) =>
    colorToRgba(theme.colors.accent.primary, 0.2),
  accentPrimaryAlpha35: (theme) =>
    colorToRgba(theme.colors.accent.primary, 0.35),

  // Borders
  borderSecondary: {
    light: (theme) => theme.colors.grayScale.gray3,
    dark: (theme) => theme.colors.grayScale.gray2,
  },
  borderFocus: {
    light: (theme) => theme.colors.grayScale.gray1,
    dark: (theme) => theme.colors.grayScale.gray6,
  },
  divider: {
    light: (theme) => theme.colors.grayScale.gray2,
    dark: (theme) => theme.colors.grayScale.gray3,
  },

  // Text and icons
  textDefault: {
    light: (theme) => theme.default.colors.base.black,
    dark: (theme) => theme.default.colors.base.white,
  },
  textStrong: {
    light: (theme) => theme.default.colors.base.black,
    dark: (theme) => theme.colors.base.white,
  },
  textSecondary: {
    light: (theme) => theme.default.colors.base.black,
    dark: (theme) => theme.colors.grayScale.gray6,
  },
  textTertiary: {
    light: () => '#9CA3AF',
    dark: (theme) => theme.colors.grayScale.gray6,
  },
  textOnBright: {
    light: (theme) => theme.default.colors.base.black,
    dark: (theme) => theme.colors.base.black,
  },
  // The darkest and the lightest color of the scheme, whatever the mode
  inkDark: {
    light: (theme) => theme.colors.base.white,
    dark: (theme) => theme.colors.base.black,
  },
  inkLight: {
    light: (theme) => theme.colors.base.black,
    dark: (theme) => theme.colors.base.white,
  },
  iconMuted: {
    light: (theme) => theme.colors.grayScale.gray1,
    dark: (theme) => theme.colors.grayScale.gray3,
  },
  accentContrast: {
    light: (theme) => theme.default.colors.accent.primary,
    dark: (theme) => theme.colors.base.white,
  },
  accentAdaptive: {
    light: (theme) => theme.colors.accent.primary,
    dark: (theme) => theme.colors.accent.primaryLight,
  },
  codeAccent: {
    light: (theme) => theme.colors.accent.primary,
    dark: (theme) => theme.colors.base.white,
  },
  listMarker: {
    light: (theme) => theme.default.colors.base.black,
    dark: (theme) => theme.default.colors.grayScale.gray6,
  },
  reasoningText: {
    light: (theme) => theme.default.colors.grayScale.gray1,
    dark: () => '#CDD5DA',
  },
  markdownText: (theme) => {
    if (theme.scheme === 'custom') {
      return theme.colors.custom.message.assistant.text;
    }
    return theme.mode === 'dark' ? theme.colors.base.white : '#a1a19a';
  },

  // Messages
  transactionText: {
    light: (theme) => theme.colors.grayScale.gray1,
    dark: (theme) => theme.default.colors.base.white,
  },
  timestampAssistantText: (theme) => {
    if (!isBright(theme.colors.grayScale.gray4)) {
      return theme.default.colors.base.white;
    }
    return theme.mode === 'light'
      ? theme.default.colors.base.black
      : theme.colors.base.black;
  },
  // Text in the user's bubble: dark on bright accents and the standard light
  userMessageText: (theme) =>
    theme.bright || (theme.scheme === 'standard' && theme.mode === 'light')
      ? theme.default.colors.base.black
      : theme.default.colors.base.white,
  userMusicText: (theme) =>
    theme.bright ||
    (theme.scheme === 'standard' && theme.mode === 'light') ||
    (theme.scheme === 'custom' &&
      isBright(theme.colors.custom.message.user.background))
      ? theme.default.colors.base.black
      : theme.default.colors.base.white,
  selectionUserBackground: {
    light: (theme) => theme.colors.accent.primaryLight,
    dark: (theme) => theme.colors.base.white,
  },
  messageAccentDefault: {
    light: (theme) => theme.default.colors.base.white,
    dark: (theme) => theme.colors.accent.primary,
  },
  messageAccentGreen: {
    light: (theme) => theme.default.colors.base.white,
    dark: (theme) => theme.colors.gpt3,
  },
  messageAccentPurple: {
    light: (theme) => theme.default.colors.base.white,
    dark: (theme) => theme.colors.gpt4,
  },
  messageAccentGreenInverse: {
    light: (theme) => theme.colors.gpt3,
    dark: (theme) => theme.default.colors.base.white,
  },
  messageAccentPurpleInverse: {
    light: (theme) => theme.colors.gpt4,
    dark: (theme) => theme.default.colors.base.white,
  },
} satisfies Record<string, ThemeTokenDefinition>;

type BaseThemeTokenName = keyof typeof themeTokenDefinitions;

type DerivedThemeTokenDefinition = (
  theme: ThemeTokenSource,
  tokens: Record<BaseThemeTokenName, string>,
) => string;

const isCustom = (theme: ThemeTokenSource) => theme.scheme === 'custom';
const isStandardLight = (theme: ThemeTokenSource) =>
  theme.scheme === 'standard' && theme.mode === 'light';

/**
 * Colors of particular components that also depend on the scheme or on
 * whether the accent is bright. They are tokens too, so styles read them
 * through CSS variables instead of branching on the theme.
 */
export const derivedThemeTokenDefinitions = {
  // Text
  interfaceText: (theme) =>
    isCustom(theme)
      ? theme.colors.custom.interface.text
      : theme.colors.base.white,
  accentForeground: (theme) =>
    theme.bright
      ? theme.default.colors.base.black
      : theme.default.colors.base.white,
  inkContrast: (theme, tokens) =>
    theme.bright ? tokens.inkDark : tokens.inkLight,

  // Buttons and fields
  buttonPrimaryText: (theme, tokens) => {
    const { text } = theme.colors.custom.interface;
    if (isCustom(theme)) {
      if (theme.bright) {
        return isBright(text) ? tokens.textOnBright : text;
      }
      return isBright(text) ? text : theme.default.colors.base.white;
    }
    return theme.bright ? tokens.inkDark : theme.default.colors.base.white;
  },
  fieldBackground: (theme, tokens) =>
    isCustom(theme) ? theme.colors.grayScale.gray7 : tokens.surfaceElevated,
  fieldFocusBackground: (theme, tokens) =>
    isCustom(theme) ? theme.colors.grayScale.gray2 : tokens.surfaceElevated,
  fieldFocusBackgroundSecondary: (theme) =>
    isCustom(theme)
      ? theme.colors.grayScale.gray2
      : theme.colors.grayScale.gray7,
  fieldFocusIcon: (theme, tokens) =>
    isCustom(theme) ? theme.colors.accent.primary : tokens.accentContrast,
  themeButtonBackground: (theme) =>
    isCustom(theme) ? theme.colors.custom.background : theme.colors.base.black,
  surfaceGroupHeaderTransparent: (theme, tokens) =>
    `${tokens.surfaceGroupHeader}00`,
  dropzoneBorder: (theme) =>
    theme.mode === 'light'
      ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' vector-effect='non-scaling-stroke' stroke='%23CDD5DA' stroke-width='4' stroke-dasharray='8%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
      : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' vector-effect='non-scaling-stroke' stroke='%23222B44FF' stroke-width='4' stroke-dasharray='8%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  // A light outline that only the light mode has
  thumbShadow: (theme) =>
    theme.mode === 'light'
      ? `0px 0px 0px 1px ${theme.default.colors.grayScale.gray6}`
      : 'none',
  cardShadow: (theme) =>
    theme.mode === 'light'
      ? `inset 0px 0px 0px 1px ${theme.colors.grayScale.gray3}`
      : 'none',
  uploadedFileBorder: (theme) =>
    theme.mode === 'light'
      ? `1px solid ${theme.colors.grayScale.gray2}`
      : 'none',

  // Messages
  messageActionIcon: (theme) =>
    isCustom(theme)
      ? theme.colors.custom.icon
      : theme.colors.accent.primaryLight,
  messageActionActiveIcon: (theme, tokens) =>
    isCustom(theme) ? theme.colors.custom.icon : tokens.actionActiveBackground,
  messageCopiedIcon: (theme) =>
    theme.mode === 'dark'
      ? theme.default.colors.accent.primary
      : theme.colors.base.white,
  paragraphUserText: (theme, tokens) => {
    if (isCustom(theme)) {
      return theme.colors.custom.message.user.text;
    }
    if (theme.scheme === 'standard') {
      return theme.colors.base.white;
    }
    return theme.bright ? tokens.inkDark : theme.default.colors.base.white;
  },
  paragraphAssistantText: (theme) =>
    isCustom(theme)
      ? theme.colors.custom.message.assistant.text
      : theme.colors.base.white,
  timestampUserText: (theme, tokens) => {
    if (isStandardLight(theme)) {
      return theme.default.colors.base.black;
    }
    return theme.bright ? tokens.inkDark : tokens.inkLight;
  },
  timestampUserTextOnBright: (theme, tokens) =>
    isStandardLight(theme) ? theme.default.colors.base.black : tokens.inkDark,
  voiceInputText: (theme) =>
    theme.scheme === 'standard' ? '#A4C1FA' : theme.colors.accent.primary,
  // The standard user bubble is light although the theme is not bright
  voiceMessageText: (theme, tokens) => {
    if (theme.scheme === 'standard') {
      return tokens.textDefault;
    }
    return theme.bright ||
      (isCustom(theme) && isBright(theme.colors.custom.message.user.background))
      ? theme.default.colors.base.black
      : theme.default.colors.base.white;
  },
} satisfies Record<string, DerivedThemeTokenDefinition>;

export type ThemeTokenName =
  | BaseThemeTokenName
  | keyof typeof derivedThemeTokenDefinitions;

export function createThemeTokens(theme: ThemeTokenSource): ThemeTokens {
  const baseTokens = {} as Record<BaseThemeTokenName, string>;

  (Object.keys(themeTokenDefinitions) as BaseThemeTokenName[]).forEach(
    (name) => {
      baseTokens[name] = resolveToken(themeTokenDefinitions[name], theme);
    },
  );

  const tokens = { ...baseTokens } as ThemeTokens;
  (
    Object.keys(
      derivedThemeTokenDefinitions,
    ) as (keyof typeof derivedThemeTokenDefinitions)[]
  ).forEach((name) => {
    const definition: DerivedThemeTokenDefinition =
      derivedThemeTokenDefinitions[name];
    tokens[name] = definition(theme, baseTokens);
  });

  return tokens;
}

/**
 * Returns the theme with tokens computed from its own colors. Always
 * recomputes them, so a theme spread from another one doesn't keep stale
 * tokens.
 */
export function withThemeTokens(
  theme: ThemeTokenSource & { tokens?: ThemeTokens },
): Theme {
  return { ...theme, tokens: createThemeTokens(theme) };
}
