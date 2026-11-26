import { describe, expect, test } from 'vitest';
import type { Element as StylisElement, Middleware } from 'stylis';
import {
  BothubStyleSheetDashboardPlugin,
  BothubStyleSheetMainPlugin,
} from '@/ui/styles/manager/plugin';
import { getScaleDeclarations, scaled, scaleValue } from './scale';

type Variables = Record<string, string>;

// Substitutes var() like the browser does: the variable if set, else the
// fallback.
function resolveVariables(value: string, variables: Variables): string {
  const start = value.indexOf('var(');
  if (start === -1) {
    return value;
  }

  let depth = 0;
  let comma = -1;
  let end = start + 4;
  for (; end < value.length; end++) {
    const char = value[end];
    if (char === '(') depth++;
    if (char === ')') {
      if (depth === 0) break;
      depth--;
    }
    if (char === ',' && depth === 0 && comma === -1) comma = end;
  }

  const name = value.slice(start + 4, comma === -1 ? end : comma).trim();
  const fallback = comma === -1 ? '' : value.slice(comma + 1, end).trim();
  const replacement = name in variables ? variables[name] : fallback;

  return resolveVariables(
    value.slice(0, start) + replacement + value.slice(end + 1),
    variables,
  );
}

// The used value of a length, in px: enough CSS math (calc, max, px) for
// what the plugins and `scaleValue` produce.
function toPx(value: string, variables: Variables): number {
  const expression = resolveVariables(value, variables)
    .replace(/calc\(/g, '(')
    .replace(/max\(/g, 'Math.max(')
    .replace(/(\d)px/g, '$1');

  // A test-only evaluator of the arithmetic above
  // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
  return Function(`return ${expression}`)() as number;
}

// Values separated by spaces outside parentheses: `0px calc(...)`.
function splitValue(value: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  [...value].forEach((char) => {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (char === ' ' && depth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += char;
    }
  });
  parts.push(current);

  return parts.filter(Boolean);
}

function usedValue(value: string, variables: Variables): string[] {
  return splitValue(value).map((part) =>
    /^(calc|max|var)\(|^-?[\d.]+px$/.test(part)
      ? toPx(part, variables).toFixed(6)
      : part,
  );
}

function runPlugin(plugin: Middleware, property: string, value: string) {
  const element = {
    type: 'decl',
    props: property,
    value: `${property}:${value};`,
  } as unknown as StylisElement;
  plugin(element, 0, [], () => '');

  return element.value.slice(property.length + 1, -1);
}

const declarations: [string, string][] = [
  ['font-size', '14px'],
  ['font-size', '46px'],
  ['line-height', '23.4px'],
  ['line-height', '18px'],
  ['gap', '6px'],
  ['padding', '0px 12px'],
  ['margin', '-4px 1.5px'],
  ['border-radius', '1px'],
  ['border', '1px solid red'],
  ['width', 'var(--bothub-skeleton-width, var(--skeleton-width, 40px))'],
  ['--skeleton-height', '22px'],
  ['background', '12px'],
  ['background-image', 'linear-gradient(red 10px, blue 20px)'],
];

const managers = [
  { variant: 'main', plugin: BothubStyleSheetMainPlugin },
  { variant: 'dashboard', plugin: BothubStyleSheetDashboardPlugin },
] as const;

const scales = [1, 0.95, 0.85, 0.8, 0.66, 0.6];

describe('zero-runtime scale', () => {
  test.each(managers)(
    'computes what the $variant stylis plugin renders',
    ({ variant, plugin }) => {
      scales.forEach((scale) => {
        const variables = {
          ...getScaleDeclarations(variant),
          '--bothub-scale': String(scale),
        };

        declarations.forEach(([property, value]) => {
          expect(
            usedValue(scaleValue(property, value), variables),
            `${property}: ${value} at ${scale}`,
          ).toEqual(
            usedValue(runPlugin(plugin, property, value), {
              '--bothub-scale': String(scale),
            }),
          );
        });
      });
    },
  );

  test('keeps the values as written without the manager', () => {
    scales.forEach((scale) => {
      const variables = { '--bothub-scale': String(scale) };

      declarations.forEach(([property, value]) => {
        expect(usedValue(scaleValue(property, value), variables)).toEqual(
          usedValue(value, variables),
        );
      });
    });
  });

  test('the manager declarations survive its own stylis plugin', () => {
    managers.forEach(({ variant, plugin }) => {
      Object.entries(getScaleDeclarations(variant)).forEach(
        ([property, value]) => {
          expect(runPlugin(plugin, property, value)).toBe(value);
        },
      );
    });
  });

  test('scaled() reaches nested rules and custom properties', () => {
    const rule = scaled({
      gap: '6px',
      flexShrink: 0,
      vars: { '--skeleton-width': '200px' },
      selectors: { '&:hover': { paddingLeft: '4px' } },
      '@media': { '(max-width: 550px)': { fontSize: '12px' } },
    });

    expect(rule.gap).toBe(scaleValue('gap', '6px'));
    expect(rule.flexShrink).toBe(0);
    expect(rule.vars?.['--skeleton-width']).toBe(
      scaleValue('--skeleton-width', '200px'),
    );
    expect(rule.selectors?.['&:hover'].paddingLeft).toBe(
      scaleValue('padding-left', '4px'),
    );
    expect(rule['@media']?.['(max-width: 550px)'].fontSize).toBe(
      scaleValue('font-size', '12px'),
    );
  });
});
