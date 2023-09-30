export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  tablet: ThemeTablet;
  mobile: ThemeMobile;
  zIndex: ThemeZIndex;
  header: ThemeHeader;
}

export interface ThemeTablet {
  maxWidth: string;
}

export interface ThemeMobile {
  maxWidth: string;
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
}

export interface ThemeColors {
  base: ThemeBaseColors;
  accent: ThemeAccentColors;
  grayScale: ThemeGrayScaleColors;
  premiumGradient: string;
  critic: string;
}

export interface ThemeIbmPlexSansFonts {
  bold: string;
  semiBold: string;
  medium: string;
  regular: string;
}

export interface ThemeFonts {
  ibmPlexSans: ThemeIbmPlexSansFonts;
}

export interface ThemeZIndex {
  header: number;
  backdrop: number;
  modal: number;
  menu: number;
}

export interface ThemeHeaderMobile {
  height: string;
}

export interface ThemeHeader {
  height: string;
  mobile: ThemeHeaderMobile;
}
