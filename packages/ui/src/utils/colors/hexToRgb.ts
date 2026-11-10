const hexPattern = /^#([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;

/**
 * Parses `#RGB`, `#RGBA`, `#RRGGBB` or `#RRGGBBAA` (the alpha is ignored).
 * Throws for anything else.
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  const match = hexPattern.exec(hex.trim());

  if (match === null) {
    throw new Error('Invalid HEX. Source: hexToRgb function');
  }

  const digits = match[1];
  const isShort = digits.length <= 4;

  const channels = isShort
    ? digits
        .slice(0, 3)
        .split('')
        .map((digit) => digit + digit)
    : [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6)];

  const [r, g, b] = channels.map((channel) => Number.parseInt(channel, 16));

  return [r, g, b];
};
