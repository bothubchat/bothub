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
import { createZeroRuntimeCssVariables } from './zero-runtime';
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

// The CSS variables of the outer ThemeProvider. The outermost one sets them
// on :root, so portals get them too: every color and token with
// `cssVariables`, else the ones zero-runtime styles read, which always read
// colors through them. A nested provider sets the ones its theme changes on
// a `display: contents` wrapper of its children, while its styled components
// keep literal colors.
const ThemeVariablesContext = React.createContext<Record<
  string,
  string
> | null>(null);

const nestedThemeStyle = { display: 'contents' } as const;

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
   * Styled components read theme colors through the CSS variables set on
   * :root, so switching the theme only changes the variables instead of
   * generating new CSS for every component. Applies to the outermost
   * ThemeProvider. Without it only the variables of `zeroRuntimeThemePaths`
   * are set: components styled without styled-components read colors only
   * through them.
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
    const outerVariables = useContext(ThemeVariablesContext);
    const isNested = outerVariables !== null;
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

    const variables = useMemo(
      () =>
        withCssVariables
          ? createThemeCssVariables(theme)
          : createZeroRuntimeCssVariables(theme),
      [theme, withCssVariables],
    );

    const variableDeclarations = useMemo(
      () =>
        isNested
          ? ''
          : Object.entries(variables)
              .map(([name, value]) => `${name}: ${value};`)
              .join('\n'),
      [variables, isNested],
    );

    // Only what differs from the outer theme. The wrapper is there even
    // without differences, so that a theme change doesn't remount children.
    const nestedVariablesStyle = useMemo(
      () =>
        outerVariables &&
        Object.entries(variables).reduce<React.CSSProperties>(
          (style, [name, value]) =>
            outerVariables[name] === value
              ? style
              : { ...style, [name]: value },
          nestedThemeStyle,
        ),
      [outerVariables, variables],
    );

    return (
      <ThemeVariablesContext.Provider value={variables}>
        <ThemeValueContext.Provider value={themeValue}>
          <StyledThemeProvider theme={styleTheme}>
            {!isNested && (
              <ThemeCssVariablesStyle $declarations={variableDeclarations} />
            )}
            {nestedVariablesStyle ? (
              <div
                data-bothub-theme=""
                style={nestedVariablesStyle}
              >
                {children}
              </div>
            ) : (
              children
            )}
            {sbMode && <StorybookGlobalStyle />}
          </StyledThemeProvider>
        </ThemeValueContext.Provider>
      </ThemeVariablesContext.Provider>
    );
  },
);

export * from './types';
export * from './hook';
export * from './themes';
export * from './tokens';
export * from './vars';
