import './styled.d.ts';
import React, { useMemo } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle
} from 'styled-components';
import { themes } from './themes';
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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  scheme = 'standard',
  mode = 'dark',
  sbMode = false,
  customTheme = null,
  children
}) => {
  const theme = useMemo<Theme>(
    () =>
      scheme !== 'custom'
        ? themes[scheme][mode]
        : (customTheme ?? themes.standard[mode]),
    [customTheme, scheme, mode]
  );

  return (
    <StyledThemeProvider theme={theme}>
      {children}
      {sbMode && <StorybookGlobalStyle />}
    </StyledThemeProvider>
  );
};

export * from './types';
export * from './hook';
export * from './themes';
