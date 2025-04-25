export function colorToRgba(color: string, alpha = 1): string {
  if (alpha < 0 || alpha > 1) {
    throw new Error('Alpha value must be between 0 and 1');
  }

  // If color is already in RGBA, only change alpha
  if (color.startsWith('rgba(')) {
    const rgbaMatch = color.match(/rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)/);
    if (rgbaMatch) {
      const [, r, g, b] = rgbaMatch;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  // If color is in RGB, add alpha
  if (color.startsWith('rgb(')) {
    const rgbMatch = color.match(/rgb\((\d+), ?(\d+), ?(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
        'Invalid HEX format. Expected #RRGGBB, #RGB, or #RRGGBBAA'
      );
    }

    // Convert HEX -> RGB
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);

    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
      throw new Error('Invalid HEX color');
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  throw new Error(
    'Unsupported color format. Please use HEX (#RRGGBB) or RGB (rgb(r, g, b))'
  );
}
