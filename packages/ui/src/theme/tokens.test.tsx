import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from './index';
import { THEMES, standardDark, standardLight } from './themes';
import {
  createThemeTokens,
  themeTokenDefinitions,
  withThemeTokens,
} from './tokens';
import { useTheme } from './hook';
import type { Theme } from './types';

describe('theme tokens', () => {
  test('resolve the mode-specific value', () => {
    expect(standardLight.tokens.surfaceElevated).toBe(
      standardLight.default.colors.base.white,
    );
    expect(standardDark.tokens.surfaceElevated).toBe(
      standardDark.colors.grayScale.gray4,
    );
    expect(standardDark.tokens.hoverOverlay).toBe('rgba(255, 255, 255, 0.05)');
  });

  test('every theme has every token', () => {
    const names = Object.keys(themeTokenDefinitions);

    Object.values(THEMES).forEach(({ dark, light }) => {
      [dark, light].forEach((theme) => {
        expect(Object.keys(theme.tokens).sort()).toEqual([...names].sort());
        Object.values(theme.tokens).forEach((value) =>
          expect(typeof value).toBe('string'),
        );
      });
    });
  });

  test('schemes get tokens from their own colors', () => {
    const { dark } = THEMES.strawberry;

    expect(dark.tokens).toEqual(createThemeTokens(dark));
    expect(dark.tokens.surfaceElevated).toBe(dark.colors.grayScale.gray4);
    expect(dark.tokens.surfaceElevated).not.toBe(
      standardDark.tokens.surfaceElevated,
    );
  });

  test('withThemeTokens recomputes tokens copied from another theme', () => {
    const spread = withThemeTokens({
      ...standardDark,
      colors: {
        ...standardDark.colors,
        grayScale: { ...standardDark.colors.grayScale, gray4: '#123456' },
      },
    });

    expect(spread.tokens.surfaceElevated).toBe('#123456');
  });

  test('ThemeProvider computes tokens of a custom theme', () => {
    let received: Theme | null = null;
    const Probe = () => {
      received = useTheme();
      return null;
    };
    const customTheme = {
      ...standardLight,
      scheme: 'custom' as const,
      colors: {
        ...standardLight.colors,
        accent: { ...standardLight.colors.accent, primary: '#ff0000' },
      },
    };

    render(
      <ThemeProvider
        scheme="custom"
        mode="light"
        customTheme={customTheme}
      >
        <Probe />
      </ThemeProvider>,
    );

    expect(received!.tokens.accentAdaptive).toBe('#ff0000');
  });
});
