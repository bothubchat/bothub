import { ThemeGrayScaleColors, defaultTheme } from '@/ui/theme';
import { hexToRgb } from './hexToRgb';
import { rgbToHsv } from './rgbToHsv';
import { rgbToHex } from './rgbToHex';
import { hsvToRgb } from './hsvToRgb';

const originalHsv: Record<string, [number, number, number]> = {
  gray1: rgbToHsv(hexToRgb(defaultTheme.colors.grayScale.gray1)),
  gray2: rgbToHsv(hexToRgb(defaultTheme.colors.grayScale.gray2)),
  gray3: rgbToHsv(hexToRgb(defaultTheme.colors.grayScale.gray3)),
  gray5: rgbToHsv(hexToRgb(defaultTheme.colors.grayScale.gray5)),
  gray6: rgbToHsv(hexToRgb(defaultTheme.colors.grayScale.gray6)),
  gray7: rgbToHsv(hexToRgb(defaultTheme.colors.grayScale.gray7))
};

export const calculateGrayScale = (
  newGray1: string
): Omit<ThemeGrayScaleColors, 'gray4'> => {
  const [hNew, sNew, vNew] = rgbToHsv(hexToRgb(newGray1));

  const result: Record<string, string> = { gray1: newGray1 };

  const keys = ['gray2', 'gray3', 'gray5', 'gray6', 'gray7'] as const;
  for (const key of keys) {
    const [, sRef, vRef] = originalHsv[key];
    const [, sBase, vBase] = originalHsv.gray1;

    const h = hNew;

    const s = Math.min(100, Math.round(sNew * (sRef / sBase)));
    const v = Math.min(100, Math.round(vNew * (vRef / vBase)));

    const rgb = hsvToRgb([h, s, v]);

    result[key] = rgbToHex(rgb);
  }

  return result as Omit<ThemeGrayScaleColors, 'gray4'>;
};
