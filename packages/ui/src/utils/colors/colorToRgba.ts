import { rgbToHex } from './rgbToHex';

const rgbPattern =
  /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(?:\d*\.?\d+%?)\s*)?\)$/i;

const hexPattern = /^#([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;

const clampAlpha = (alpha: number): number => {
  if (Number.isNaN(alpha)) {
    return 1;
  }

  return Math.min(1, Math.max(0, alpha));
};

const clampChannel = (channel: number): number =>
  Math.min(255, Math.max(0, channel));

/**
 * Returns `color` as `#RRGGBBAA` with the given alpha. Supports HEX
 * (`#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`) and `rgb()`/`rgba()`; the alpha of
 * the source color is replaced.
 *
 * It is called from styles, so it never throws: an alpha out of range is
 * clamped, and a color it cannot parse is returned unchanged.
 */
export function colorToRgba(color: string, alpha = 1): string {
  const newAlpha = Math.round(clampAlpha(alpha) * 255)
    .toString(16)
    .padStart(2, '0');

  const value = color.trim();

  const rgbMatch = value.match(rgbPattern);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch
      .slice(1, 4)
      .map((channel) => clampChannel(Number.parseInt(channel, 10)));

    return `${rgbToHex([r, g, b])}${newAlpha}`;
  }

  const hexMatch = value.match(hexPattern);
  if (hexMatch) {
    let hex = hexMatch[1];

    // Convert #RGB(A) -> #RRGGBB(AA)
    if (hex.length <= 4) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    // Ignore the alpha channel of #RRGGBBAA
    return `#${hex.substring(0, 6)}${newAlpha}`;
  }

  return color;
}
