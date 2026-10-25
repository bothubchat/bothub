import type { Theme } from './types';

/**
 * Set on the theme by the root ThemeProvider when CSS variables are enabled:
 * styles then read colors through `var(--bothub-…)` instead of literal
 * values, so their CSS is the same in every theme.
 */
export const themeCssVariablesKey: unique symbol = Symbol(
  'bothub.themeCssVariables',
);

type ThemeWithCssVariablesFlag = Theme & {
  [themeCssVariablesKey]?: boolean;
};

const variablePrefix = '--bothub';
const variableRoots = ['colors', 'default.colors', 'tokens'] as const;

const toKebabCase = (value: string): string =>
  value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const pathSegments = new Map<string, string[]>();

function getSegments(path: string): string[] {
  let segments = pathSegments.get(path);
  if (!segments) {
    segments = path.split('.');
    pathSegments.set(path, segments);
  }
  return segments;
}

function getThemeValue(theme: Theme, path: string): string {
  return getSegments(path).reduce<unknown>(
    (value, segment) => (value as Record<string, unknown>)?.[segment],
    theme,
  ) as string;
}

/** `colors.grayScale.gray4` → `--bothub-colors-gray-scale-gray4` */
export function themeVariableName(path: string): string {
  return `${variablePrefix}-${getSegments(path).map(toKebabCase).join('-')}`;
}

/**
 * A theme color for a style: `var(--bothub-…)` when the theme comes from a
 * root ThemeProvider with CSS variables, the literal value otherwise.
 */
export function themeVar(theme: Theme, path: string): string {
  if ((theme as ThemeWithCssVariablesFlag)[themeCssVariablesKey]) {
    return `var(${themeVariableName(path)})`;
  }
  return getThemeValue(theme, path);
}

export function isThemeWithCssVariables(theme: Theme): boolean {
  return !!(theme as ThemeWithCssVariablesFlag)[themeCssVariablesKey];
}

export function withThemeCssVariablesFlag(theme: Theme): Theme {
  // Not enumerable: a theme spread from this one, like a preview with its own
  // colors, must get literal values, not the variables of the outer theme.
  return Object.defineProperty({ ...theme }, themeCssVariablesKey, {
    value: true,
    enumerable: false,
  });
}

/** Every color, default color and token of the theme as a CSS variable. */
export function createThemeCssVariables(theme: Theme): Record<string, string> {
  const variables: Record<string, string> = {};

  const collect = (value: unknown, path: string) => {
    if (typeof value === 'string') {
      variables[themeVariableName(path)] = value;
      return;
    }
    if (value && typeof value === 'object') {
      Object.entries(value).forEach(([key, child]) =>
        collect(child, `${path}.${key}`),
      );
    }
  };

  variableRoots.forEach((root) => collect(getThemeValue(theme, root), root));

  return variables;
}
