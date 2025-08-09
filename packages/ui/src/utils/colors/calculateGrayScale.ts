import { THEMES, ThemeGrayScaleColors } from '@/ui/theme';
import { hexToRgb } from './hexToRgb';
import { rgbToHsv } from './rgbToHsv';
import { rgbToHex } from './rgbToHex';
import { hsvToRgb } from './hsvToRgb';
import { isBright } from './isBright';

const grayScaleHsv = {
  dark: {
    gray1: rgbToHsv(hexToRgb(THEMES.standard.dark.colors.grayScale.gray1)),
    gray2: rgbToHsv(hexToRgb(THEMES.standard.dark.colors.grayScale.gray2)),
    gray3: rgbToHsv(hexToRgb(THEMES.standard.dark.colors.grayScale.gray3)),
    gray5: rgbToHsv(hexToRgb(THEMES.standard.dark.colors.grayScale.gray5)),
    gray6: rgbToHsv(hexToRgb(THEMES.standard.dark.colors.grayScale.gray6)),
    gray7: rgbToHsv(hexToRgb(THEMES.standard.dark.colors.grayScale.gray7)),
  },
  light: {
    gray1: rgbToHsv(hexToRgb(THEMES.standard.light.colors.grayScale.gray1)),
    gray2: rgbToHsv(hexToRgb(THEMES.standard.light.colors.grayScale.gray2)),
    gray3: rgbToHsv(hexToRgb(THEMES.standard.light.colors.grayScale.gray3)),
    gray5: rgbToHsv(hexToRgb(THEMES.standard.light.colors.grayScale.gray5)),
    gray6: rgbToHsv(hexToRgb(THEMES.standard.light.colors.grayScale.gray6)),
    gray7: rgbToHsv(hexToRgb(THEMES.standard.light.colors.grayScale.gray7)),
  },
};

export const calculateGrayScale = ({
  newGray1,
  interfaceBackground,
}: {
  newGray1: string;
  interfaceBackground: string;
}): Omit<ThemeGrayScaleColors, 'gray4'> => {
  let originalHsv: Record<string, Array<number>>;

  if (isBright(interfaceBackground)) {
    originalHsv = grayScaleHsv.light;
  } else {
    originalHsv = grayScaleHsv.dark;
  }

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
