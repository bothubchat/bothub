import { createGlobalThemeContract } from '@vanilla-extract/css';
import { standardDark } from './themes';
import type { ThemeColors, ThemeTokens } from './types';
import { themeVariableName } from './vars';

/** The theme values ThemeProvider sets as CSS variables. */
export interface ThemeContractValues {
  colors: ThemeColors;
  default: { colors: ThemeColors };
  tokens: ThemeTokens;
}

type ThemeContractVars<Values> = {
  readonly [Key in keyof Values]: Values[Key] extends string
    ? `var(--${string})`
    : ThemeContractVars<Values[Key]>;
};

const contractShape: ThemeContractValues = {
  colors: standardDark.colors,
  default: { colors: standardDark.default.colors },
  tokens: standardDark.tokens,
};

/**
 * Theme colors and tokens for zero-runtime (vanilla-extract) styles:
 * `vars.colors.grayScale.gray4` is `var(--bothub-colors-gray-scale-gray4)`.
 *
 * It only names the variables, it doesn't set them: their values come from
 * the root ThemeProvider (`createThemeCssVariables`), the same way as for
 * styled-components styles with `cssVariables`. The shape is taken from a
 * theme when this file is compiled, so the compiled module is just strings.
 */
export const vars = createGlobalThemeContract(
  contractShape as unknown as Parameters<typeof createGlobalThemeContract>[0],
  (_value, path) => themeVariableName(path.join('.')).slice(2),
) as unknown as ThemeContractVars<ThemeContractValues>;
