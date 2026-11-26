import type { Theme } from './types';
import { createThemeCssVariables, themeVariableName } from './vars';

// Not exported from the package: what the root ThemeProvider sets on :root
// for zero-runtime styles.

/**
 * The theme values zero-runtime styles read (`vars.…` in `*.css.ts`). The
 * root ThemeProvider sets only these on :root while `cssVariables` is off,
 * instead of every color and token. A test keeps the list in sync with the
 * styles.
 */
export const zeroRuntimeThemePaths: readonly string[] = [
  'colors.accent.primary',
  'colors.critic',
  'colors.grayScale.gray1',
  'colors.grayScale.gray2',
  'colors.green',
  'default.colors.base.white',
  'tokens.badgeBackground',
  'tokens.interfaceText',
  'tokens.skeletonFrom',
  'tokens.skeletonTo',
];

/** The CSS variables of `zeroRuntimeThemePaths`. */
export function createZeroRuntimeCssVariables(
  theme: Theme,
): Record<string, string> {
  const variables = createThemeCssVariables(theme);

  return Object.fromEntries(
    zeroRuntimeThemePaths.map((path) => {
      const name = themeVariableName(path);
      return [name, variables[name]];
    }),
  );
}
