import { hexToRgb } from './hexToRgb';

/**
 * Whether a HEX color is bright. It is called from styles, so it never
 * throws: a color it cannot parse counts as dark.
 */
export const isBright = (hex: string) => {
  let rgb: [number, number, number];

  try {
    rgb = hexToRgb(hex);
  } catch {
    return false;
  }

  const [r, g, b] = rgb;

  // sRGB values
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;

  // Linear RGB values
  const R = sR <= 0.03928 ? sR / 12.92 : ((sR + 0.055) / 1.055) ** 2.4;
  const G = sG <= 0.03928 ? sG / 12.92 : ((sG + 0.055) / 1.055) ** 2.4;
  const B = sB <= 0.03928 ? sB / 12.92 : ((sB + 0.055) / 1.055) ** 2.4;

  return 0.21 * R + 0.72 * G + 0.07 * B > 0.5;
};
