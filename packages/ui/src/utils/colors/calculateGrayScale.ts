import { ThemeGrayScaleColors } from '@/ui/theme';
import { hexToRgb } from './hexToRgb';
import { rgbToHsv } from './rgbToHsv';
import { rgbToHex } from './rgbToHex';
import { hsvToRgb } from './hsvToRgb';
import { isBright } from './isBright';

const grayScaleHsv = {
  dark: {
    gray1: [224, 31.2, 55.3],
    gray2: [224, 50, 38.4],
    gray3: [224, 50, 26.7],
    gray5: [221, 33, 43.9],
    gray6: [221, 25.4, 72.5],
    gray7: [221, 51.6, 12.2]
  },
  light: {
    gray1: [205, 9.9, 75.3],
    gray2: [203, 6, 85.5],
    gray3: [207, 3.9, 89.4],
    gray4: [210, 0.8, 96.9],
    gray5: [221, 33, 43.9],
    gray6: [210, 9.1, 95.3],
    gray7: [210, 2.6, 89.8]
  }
};

export const calculateGrayScale = ({
  newGray1,
  interfaceBackground
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
