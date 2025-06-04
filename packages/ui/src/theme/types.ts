export type Theme = ThemeDefined | ThemeCustom;

export interface ThemeBase {
  mode: ThemeMode;
  bright: boolean;
  tablet: ThemeTablet;
  mobile: ThemeMobile;
  zIndex: ThemeZIndex;
  header: ThemeHeader;
  dashboard: ThemeDashboard;
  default: DefaultTheme;
}

export interface ThemeDefined extends ThemeBase {
  scheme: Omit<ColorSchemeNames, 'custom'>;
  colors: ThemeColors;
}

export interface ThemeCustom extends ThemeBase {
  scheme: 'custom';
  colors: ThemeCustomColors;
}

export interface ColorScheme {
  light: Theme;
  dark: Theme;
}

export const ColorSchemeNamesArray = [
  'standard',
  'custom',
  'strawberry',
  'rose',
  'orange',
  'milktea',
  'banana',
  'apple',
  'swamp',
  'aquamarine',
  'mountain',
  'lake',
  'iris',
  'peony'
] as const;

export type ColorSchemeNames = (typeof ColorSchemeNamesArray)[number];

export type ColorSchemes = {
  [key in ColorSchemeNames]: ColorScheme;
};

export type DefaultTheme = Omit<ThemeDefined, 'default'>;

export type ThemeMode = 'dark' | 'light';

export interface ThemeTablet {
  maxWidth: string;
}

export interface ThemeMobile {
  maxWidth: string;
  minWidth: string;
}

export interface ThemeBaseColors {
  black: string;
  white: string;
}

export interface ThemeAccentColors {
  primary: string;
  primaryLight: string;
  strong: string;
  strongDown: string;
}

export interface ThemeGrayScaleColors {
  gray1: string;
  gray2: string;
  gray3: string;
  gray4: string;
  gray5: string;
  gray6: string;
  gray7: string;
}

export interface ThemeGradientColors {
  basic: string;
  light: string;
  premium: string;
  deluxe: string;
  elite: string;
  elite20: string;
}

export interface ThemeColors {
  base: ThemeBaseColors;
  accent: ThemeAccentColors;
  grayScale: ThemeGrayScaleColors;
  premiumGradient: string;
  gradient: ThemeGradientColors;
  critic: string;
  orange: string;
  purple: string;
  aqua: string;
  green: string;
  gpt3: string;
  gpt4: string;
}

export interface ThemeCustomColors extends ThemeColors {
  background: string;
  message: {
    assistant: {
      text: string;
    };
    user: {
      background: string;
      text: string;
    };
  };
  interface: {
    text: string;
  };
  icon: string;
}

export interface ThemeZIndex {
  scrollbarShadow: number;
  header: number;
  backdrop: number;
  modal: number;
  headerMenu: number;
  select: number;
  notifications: number;
  tooltip: number;
  menu: number;
}

export interface ThemeHeaderMobile {
  height: string;
}

export interface ThemeHeader {
  height: string;
  mobile: ThemeHeaderMobile;
}

export type ThemeDashboardHeaderMobile = ThemeHeaderMobile;

export type ThemeDashboardHeaderTablet = ThemeHeaderMobile;

export interface ThemeDashboardHeader {
  height: string;
  tablet: ThemeDashboardHeaderTablet;
  mobile: ThemeDashboardHeaderMobile;
}

export interface ThemeDashboardChat {
  containerWidth: string;
}

export interface ThemeDashboard {
  header: ThemeDashboardHeader;
  chat: ThemeDashboardChat;
  tablet: ThemeTablet;
  miniTablet: ThemeTablet;
  mobile: ThemeMobile;
}

export interface ThemeSidebarTablet {
  width: string;
  minimizedWidth: string;
}

export interface ThemeSidebarMiniTablet {
  width: string;
  minimizedWidth: string;
}

export interface ThemeSidebarMobile {
  width: string;
  minimizedWidth: string;
}
