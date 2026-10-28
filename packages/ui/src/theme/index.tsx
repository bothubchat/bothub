import './styled.d.ts';
import React, { useContext, useMemo } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { THEMES, standardDark } from './themes';
import { ColorSchemeNames, Theme, ThemeMode } from './types.js';
import { ThemeTokenSource, withThemeTokens } from './tokens';
import {
  createThemeCssVariables,
  themeVar,
  withThemeCssVariablesFlag,
} from './vars';
import { ThemeValueContext } from './hook';

export const StorybookGlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => themeVar(theme, 'colors.base.black')};
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

// With CSS variables styles get this theme whatever the current one is: they
// read colors only through `var(--bothub-…)`, so switching the theme changes
// the variables on :root without re-rendering every styled component. It is
// always the same theme, so a style that reads a literal color is wrong in
// every other theme right away instead of only after a switch.
const cssVariablesStyleTheme: Theme = withThemeCssVariablesFlag(standardDark);

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
  /**
   * With `cssVariables`, styles get one theme object whatever the current
   * theme is, so switching the theme re-renders only components that read it
   * in JS (`useTheme`). Library styles read colors through CSS variables;
   * the sidebar still reads them directly until it is rebuilt.
   */
  stableTheme?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = React.memo(
  ({
    scheme = 'standard',
    mode = 'dark',
    sbMode = false,
    customTheme = null,
    cssVariables = false,
    stableTheme = false,
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

    const styleTheme =
      withCssVariables && stableTheme ? cssVariablesStyleTheme : providedTheme;
    const themeValue = useMemo(
      () => ({ theme: providedTheme, styleTheme }),
      [providedTheme, styleTheme],
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
        <ThemeValueContext.Provider value={themeValue}>
          <StyledThemeProvider theme={styleTheme}>
            {withCssVariables && (
              <ThemeCssVariablesStyle $declarations={variableDeclarations} />
            )}
            {children}
            {sbMode && <StorybookGlobalStyle />}
          </StyledThemeProvider>
        </ThemeValueContext.Provider>
      </NestedThemeContext.Provider>
    );
  },
);

export * from './types';
export * from './hook';
export * from './themes';
export * from './tokens';
export * from './vars';
