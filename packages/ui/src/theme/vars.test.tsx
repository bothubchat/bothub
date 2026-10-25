import { describe, expect, test } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, styled } from 'styled-components';
import { ThemeProvider } from './index';
import { standardDark } from './themes';
import {
  createThemeCssVariables,
  isThemeWithCssVariables,
  themeVar,
  themeVariableName,
  withThemeCssVariablesFlag,
} from './vars';
import { useTheme } from './hook';

const Box = styled.div`
  color: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray4')};
  background: ${({ theme }) => themeVar(theme, 'tokens.surfaceElevated')};
`;

const renderCss = (element: React.ReactElement) => {
  const sheet = new ServerStyleSheet();
  try {
    renderToString(sheet.collectStyles(element));
    return sheet.getStyleTags();
  } finally {
    sheet.seal();
  }
};

describe('theme CSS variables', () => {
  test('variable names follow the theme path', () => {
    expect(themeVariableName('colors.grayScale.gray4')).toBe(
      '--bothub-colors-gray-scale-gray4',
    );
    expect(themeVariableName('tokens.surfaceElevated')).toBe(
      '--bothub-tokens-surface-elevated',
    );
  });

  test('themeVar returns literal values unless the theme is flagged', () => {
    expect(themeVar(standardDark, 'colors.grayScale.gray4')).toBe(
      standardDark.colors.grayScale.gray4,
    );
    expect(
      themeVar(
        withThemeCssVariablesFlag(standardDark),
        'colors.grayScale.gray4',
      ),
    ).toBe('var(--bothub-colors-gray-scale-gray4)');
  });

  test('a theme spread from a flagged one gets literal values', () => {
    const flagged = withThemeCssVariablesFlag(standardDark);

    expect(isThemeWithCssVariables(flagged)).toBe(true);
    expect(isThemeWithCssVariables({ ...flagged })).toBe(false);
  });

  test('every color, default color and token becomes a variable', () => {
    const variables = createThemeCssVariables(standardDark);

    expect(variables['--bothub-colors-accent-primary']).toBe(
      standardDark.colors.accent.primary,
    );
    expect(variables['--bothub-default-colors-base-white']).toBe(
      standardDark.default.colors.base.white,
    );
    expect(variables['--bothub-tokens-surface-elevated']).toBe(
      standardDark.tokens.surfaceElevated,
    );
    expect(variables['--bothub-colors-custom-message-user-background']).toBe(
      standardDark.colors.custom.message.user.background,
    );
  });

  test('ThemeProvider with cssVariables sets them on :root', () => {
    const css = renderCss(
      <ThemeProvider
        mode="light"
        cssVariables
      >
        <Box />
      </ThemeProvider>,
    );

    expect(css).toContain(':root{');
    expect(css).toContain('--bothub-colors-gray-scale-gray4:#F5F6F7;');
    expect(css).toContain('color:var(--bothub-colors-gray-scale-gray4);');
  });

  test('styles are the same in both modes with cssVariables', () => {
    const boxCss = (mode: 'dark' | 'light') =>
      renderCss(
        <ThemeProvider
          mode={mode}
          cssVariables
        >
          <Box />
        </ThemeProvider>,
      ).replace(/:root\{[^}]*\}/, '');

    expect(boxCss('dark')).toBe(boxCss('light'));
  });

  test('nested providers keep literal colors', () => {
    let nestedFlagged: boolean | null = null;
    const Probe = () => {
      nestedFlagged = isThemeWithCssVariables(useTheme());
      return null;
    };

    const css = renderCss(
      <ThemeProvider cssVariables>
        <ThemeProvider
          mode="light"
          cssVariables
        >
          <Probe />
          <Box />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(nestedFlagged).toBe(false);
    expect(css).toContain('color:#F5F6F7;');
  });

  test('without cssVariables styles keep literal values', () => {
    const css = renderCss(
      <ThemeProvider mode="dark">
        <Box />
      </ThemeProvider>,
    );

    expect(css).not.toContain(':root{');
    expect(css).toContain(`color:${standardDark.colors.grayScale.gray4};`);
  });
});

describe('themeVar paths in the components', () => {
  test('point to existing colors and tokens', async () => {
    const { readdirSync, readFileSync } = await import('fs');
    const { join } = await import('path');
    const sourceRoot = join(__dirname, '..');
    const paths = new Set<string>();

    const walk = (folder: string) => {
      readdirSync(folder, { withFileTypes: true }).forEach((entry) => {
        const entryPath = join(folder, entry.name);
        if (entry.isDirectory()) {
          walk(entryPath);
        } else if (/\.tsx?$/.test(entry.name)) {
          const source = readFileSync(entryPath, 'utf8');
          [
            ...source.matchAll(/themeVar\(\s*[\w.]+,\s*'([^']+)'\s*\)/g),
          ].forEach(([, path]) => paths.add(path));
        }
      });
    };
    walk(sourceRoot);

    expect(paths.size).toBeGreaterThan(50);
    const missing = [...paths].filter(
      (path) => typeof themeVar(standardDark, path) !== 'string',
    );
    expect(missing).toEqual([]);
  });
});
