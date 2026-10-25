import './styled.d.ts';
import React, { useContext, useMemo } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { THEMES } from './themes';
import { ColorSchemeNames, ThemeMode } from './types.js';
import { ThemeTokenSource, withThemeTokens } from './tokens';
import { createThemeCssVariables, withThemeCssVariablesFlag } from './vars';

export const StorybookGlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.base.black};
  }
`;

const ThemeCssVariablesStyle = createGlobalStyle<{ $declarations: string }>`
  :root {
    ${({ $declarations }) => $declarations}
  }
`;

// Only the outermost ThemeProvider defines the variables: they are set on
// :root, so portals get them too, while nested providers (theme previews)
// keep literal colors.
const NestedThemeContext = React.createContext(false);

export interface ThemeProviderProps extends React.PropsWithChildren {
  scheme?: ColorSchemeNames;
  mode?: ThemeMode;
  sbMode?: boolean;
  /** Tokens of a custom theme are always computed from its own colors. */
  customTheme?: ThemeTokenSource | null;
  /**
   * Styles read theme colors through CSS variables set on :root, so
   * switching the theme only changes the variables instead of generating
   * new CSS for every component. Applies to the outermost ThemeProvider.
   */
  cssVariables?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = React.memo(
  ({
    scheme = 'standard',
    mode = 'dark',
    sbMode = false,
    customTheme = null,
    cssVariables = false,
    children,
  }) => {
    const isNested = useContext(NestedThemeContext);
    const withCssVariables = cssVariables && !isNested;

    const theme = useMemo(
      () =>
        scheme !== 'custom'
          ? THEMES[scheme][mode]
          : customTheme
            ? withThemeTokens(customTheme)
            : THEMES.standard[mode],
      [scheme, mode, customTheme],
    );

    const providedTheme = useMemo(
      () => (withCssVariables ? withThemeCssVariablesFlag(theme) : theme),
      [theme, withCssVariables],
    );

    const variableDeclarations = useMemo(
      () =>
        withCssVariables
          ? Object.entries(createThemeCssVariables(theme))
              .map(([name, value]) => `${name}: ${value};`)
              .join('\n')
          : '',
      [theme, withCssVariables],
    );

    return (
      <NestedThemeContext.Provider value>
        <StyledThemeProvider theme={providedTheme}>
          {withCssVariables && (
            <ThemeCssVariablesStyle $declarations={variableDeclarations} />
          )}
          {children}
          {sbMode && <StorybookGlobalStyle />}
        </StyledThemeProvider>
      </NestedThemeContext.Provider>
    );
  },
);

export * from './types';
export * from './hook';
export * from './themes';
export * from './tokens';
export * from './vars';
