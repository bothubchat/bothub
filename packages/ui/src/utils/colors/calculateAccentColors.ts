import { ThemeAccentColors, defaultTheme } from '@/ui/theme';
import { hexToRgb } from './hexToRgb';
import { rgbToHex } from './rgbToHex';

const originalRgb: Record<string, [number, number, number]> = {
  primary: hexToRgb(defaultTheme.colors.accent.primary),
  primaryLight: hexToRgb(defaultTheme.colors.accent.primaryLight),
  strong: hexToRgb(defaultTheme.colors.accent.strong),
  strongDown: hexToRgb(defaultTheme.colors.accent.strongDown)
};

export const calculateAccentColors = (
  newPrimary: string
): ThemeAccentColors => {
  const newPrimaryRgb = hexToRgb(newPrimary);

  const result: Record<string, string> = { primary: newPrimary };

  const keys = ['primaryLight', 'strong', 'strongDown'] as const;

  for (const key of keys) {
    const [rRef, gRef, bRef] = originalRgb[key];
    const [rBasePrimary, gBasePrimary, bBasePrimary] = originalRgb.primary;

    const deltaR = rRef - rBasePrimary;
    const deltaG = gRef - gBasePrimary;
    const deltaB = bRef - bBasePrimary;

    const newR = Math.max(0, Math.min(255, newPrimaryRgb[0] + deltaR));
    const newG = Math.max(0, Math.min(255, newPrimaryRgb[1] + deltaG));
    const newB = Math.max(0, Math.min(255, newPrimaryRgb[2] + deltaB));

    result[key] = rgbToHex([newR, newG, newB]);
  }

  return result as unknown as ThemeAccentColors;
};
