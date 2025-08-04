import { rgbToHex } from './rgbToHex';

export function colorToRgba(color: string, alpha = 1): string {
  if (alpha < 0 || alpha > 1) {
    throw new Error('Alpha value must be between 0 and 1');
  }

  const newAlpha = Math.round(alpha * 255).toString(16);

  let r: number;
  let g: number;
  let b: number;

  // If color is already in RGBA, only change alpha
  if (color.startsWith('rgba(')) {
    const rgbaMatch = color.match(/rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)/);
    if (rgbaMatch) {
      [, r, g, b] = rgbaMatch.map((num) => Number.parseInt(num));

      return `#${rgbToHex([r, g, b])}${newAlpha}`;
    }
  }

  // If color is in RGB, add alpha
  if (color.startsWith('rgb(')) {
    const rgbMatch = color.match(/rgb\((\d+), ?(\d+), ?(\d+)\)/);
    if (rgbMatch) {
      [, r, g, b] = rgbMatch.map((num) => Number.parseInt(num));

      return `#${rgbToHex([r, g, b])}${newAlpha}`;
    }
    throw new Error('Invalid RGB format. Expected rgb(r, g, b)');
  }

  if (color.startsWith('#')) {
    let hex = color.substring(1);

    // Convert #RGB -> #RRGGBB
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    // Handle #RRGGBBAA format
    if (hex.length === 8) {
      // Ignoring alpha-channel
      hex = hex.substring(0, 6);
    }

    // Check HEX length
    if (hex.length !== 6) {
      throw new Error(
        'Invalid HEX format. Expected #RRGGBB, #RGB, or #RRGGBBAA',
      );
    }

    return `#${hex}${newAlpha}`;
  }

  throw new Error(
    'Unsupported color format. Please use HEX (#RRGGBB) or RGB (rgb(r, g, b))',
  );
}
