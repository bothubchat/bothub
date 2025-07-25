import './styled.d.ts';
import React, { useMemo } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { THEMES } from './themes';
import { ColorSchemeNames, Theme, ThemeMode } from './types';

export const StorybookGlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.base.black};
  }
`;

export interface ThemeProviderProps extends React.PropsWithChildren {
  scheme?: ColorSchemeNames;
  mode?: ThemeMode;
  sbMode?: boolean;
  customTheme?: Theme | null;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = React.memo(
  ({
    scheme = 'standard',
    mode = 'dark',
    sbMode = false,
    customTheme = null,
    children,
  }) => {
    const theme = useMemo(
      () =>
        scheme !== 'custom'
          ? THEMES[scheme][mode]
          : (customTheme ?? THEMES.standard[mode]),
      [scheme, mode, customTheme],
    );

    return (
      <StyledThemeProvider theme={theme}>
        {children}
        {sbMode && <StorybookGlobalStyle />}
      </StyledThemeProvider>
    );
  },
);

export * from './types';
export * from './hook';
export * from './themes';
