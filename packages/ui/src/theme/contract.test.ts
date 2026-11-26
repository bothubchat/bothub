import { describe, expect, test } from 'vitest';
import { vars } from './contract.css';
import { standardDark, standardLight } from './themes';
import { createThemeCssVariables, themeVariableName } from './vars';
import { zeroRuntimeThemePaths } from './zero-runtime';

const leaves = (value: unknown, path: string[] = []): [string, string][] =>
  typeof value === 'string'
    ? [[path.join('.'), value]]
    : Object.entries(value as object).flatMap(([key, child]) =>
        leaves(child, [...path, key]),
      );

describe('theme contract', () => {
  test('references the variables ThemeProvider sets', () => {
    leaves(vars).forEach(([path, value]) => {
      expect(value).toBe(`var(${themeVariableName(path)})`);
    });
  });

  test('has a variable for every theme value and nothing else', () => {
    const contractNames = leaves(vars)
      .map(([path]) => themeVariableName(path))
      .sort();

    [standardDark, standardLight].forEach((theme) => {
      expect(Object.keys(createThemeCssVariables(theme)).sort()).toEqual(
        contractNames,
      );
    });
  });

  test('names the colors components use', () => {
    expect(vars.colors.grayScale.gray4).toBe(
      'var(--bothub-colors-gray-scale-gray4)',
    );
    expect(vars.default.colors.base.white).toBe(
      'var(--bothub-default-colors-base-white)',
    );
    expect(vars.tokens.interfaceText).toBe(
      'var(--bothub-tokens-interface-text)',
    );
  });

  test('the root provider sets every variable zero-runtime styles read', async () => {
    const { readdirSync, readFileSync } = await import('fs');
    const { join } = await import('path');
    const used = new Set<string>();

    const walk = (folder: string) => {
      readdirSync(folder, { withFileTypes: true }).forEach((entry) => {
        const entryPath = join(folder, entry.name);
        if (entry.isDirectory()) {
          walk(entryPath);
        } else if (
          entry.name.endsWith('.css.ts') &&
          entry.name !== 'contract.css.ts'
        ) {
          const source = readFileSync(entryPath, 'utf8');
          [...source.matchAll(/\bvars\.([\w.]+)/g)].forEach(([, path]) =>
            used.add(path),
          );
        }
      });
    };
    walk(join(__dirname, '..'));

    expect(used.size).toBeGreaterThan(5);
    expect([...used].sort()).toEqual([...zeroRuntimeThemePaths].sort());
    const contractPaths = new Set(leaves(vars).map(([path]) => path));
    zeroRuntimeThemePaths.forEach((path) => {
      expect(contractPaths.has(path)).toBe(true);
    });
  });
});
