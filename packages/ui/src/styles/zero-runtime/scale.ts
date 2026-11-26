import type { StyleRule } from '@vanilla-extract/css';
import {
  MIN_FONT_SIZE,
  MIN_LINE_HEIGHT,
} from '@/ui/styles/manager/plugin/index';

/**
 * Custom properties BothubStyleSheetManager sets on :root, so that static
 * CSS scales like the styles its stylis plugin rewrites. Without the manager
 * they are unset and the values stay as written.
 */
export const scaleProperties = {
  /** `1` inside BothubStyleSheetManager (any variant). */
  enabled: '--bothub-ui-scale-on',
  /** The `main` variant doesn't scale fonts below these sizes. */
  fontSizeMin: '--bothub-ui-font-size-min',
  lineHeightMin: '--bothub-ui-line-height-min',
} as const;

// `--bothub-scale` with the manager, 1 without it. Resolved on the element
// itself, like `var(--bothub-scale, 1)` in the stylis plugins.
const scaleFactor = `(1 + var(${scaleProperties.enabled}, 0) * (var(--bothub-scale, 1) - 1))`;

const unscaledProperties = new Set(['background', 'background-image']);

const toCssProperty = (property: string): string =>
  property.startsWith('--')
    ? property
    : property
        .replace(/^(Webkit|Moz|Ms|O)(?=[A-Z])/, (prefix) => `-${prefix}`)
        .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/**
 * A declaration value as the stylis plugins of BothubStyleSheetManager would
 * render it: every `Npx` but ±1px is multiplied by the scale, font sizes and
 * line heights of the `main` variant don't go below its minimums.
 */
export function scaleValue(property: string, value: string): string {
  const cssProperty = toCssProperty(property);
  if (unscaledProperties.has(cssProperty)) {
    return value;
  }

  return value.replace(/([-0-9.]+)px/g, (_match, number: string) => {
    const px = +number;
    if (Math.abs(px) <= 1) {
      return `${px}px`;
    }

    const scaled = `calc(${scaleFactor} * ${px}px)`;
    if (cssProperty === 'font-size') {
      return `max(${scaled}, var(${scaleProperties.fontSizeMin}, 0px))`;
    }
    if (cssProperty === 'line-height') {
      return `max(${scaled}, var(${scaleProperties.lineHeightMin}, 0px))`;
    }
    return scaled;
  });
}

const nestedRuleKeys = new Set([
  'selectors',
  '@media',
  '@supports',
  '@container',
  '@layer',
]);

type StyleValue = StyleRule[keyof StyleRule];

function scaleEntry(property: string, value: StyleValue): StyleValue {
  if (typeof value === 'string') {
    return scaleValue(property, value);
  }
  if (Array.isArray(value)) {
    return value.map((item) =>
      typeof item === 'string' ? scaleValue(property, item) : item,
    ) as StyleValue;
  }
  return value;
}

/**
 * Applies `scaleValue` to every declaration of a vanilla-extract style,
 * custom properties (`vars`), selectors and conditional rules included.
 * Write lengths as strings (`'12px'`): numbers are left as they are.
 */
export function scaled<Rule extends StyleRule>(rule: Rule): Rule {
  const result: Record<string, unknown> = {};

  Object.entries(rule).forEach(([key, value]) => {
    if (nestedRuleKeys.has(key) && value && typeof value === 'object') {
      result[key] = Object.fromEntries(
        Object.entries(value as Record<string, StyleRule>).map(
          ([condition, nestedRule]) => [condition, scaled(nestedRule)],
        ),
      );
    } else if (key === 'vars' && value && typeof value === 'object') {
      result[key] = Object.fromEntries(
        Object.entries(value as Record<string, string>).map(
          ([name, varValue]) => [name, scaleValue(name, varValue)],
        ),
      );
    } else {
      result[key] = scaleEntry(key, value as StyleValue);
    }
  });

  return result as Rule;
}

/**
 * What BothubStyleSheetManager sets on :root for the static styles. Lengths
 * are written as `N * 1px`: the manager's own stylis plugin, which also
 * processes this rule, leaves ±1px alone.
 */
export function getScaleDeclarations(
  variant: 'main' | 'dashboard',
): Record<string, string> {
  return {
    [scaleProperties.enabled]: '1',
    ...(variant === 'main' && {
      [scaleProperties.fontSizeMin]: `calc(${MIN_FONT_SIZE} * 1px)`,
      [scaleProperties.lineHeightMin]: `calc(${MIN_LINE_HEIGHT} * 1px)`,
    }),
  };
}
