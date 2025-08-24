export const rgbToHsv = (
  colors: [number, number, number],
): [number, number, number] => {
  const [r, g, b] = colors.map((num) => num / 255);

  // Find the maximum and minimum values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate hue
  let h;
  if (delta === 0) {
    // No color, achromatic (gray)
    h = 0;
  } else if (max === r) {
    // Between yellow and magenta
    h = ((g - b) / delta) % 6;
  } else if (max === g) {
    // Between cyan and yellow
    h = (b - r) / delta + 2;
  } else {
    // max === b
    // Between magenta and cyan
    h = (r - g) / delta + 4;
  }

  // Convert hue to degrees
  h = Math.round(h * 60);
  if (h < 0) h += 360;

  // Calculate saturation
  const s = max === 0 ? 0 : Math.round((delta / max) * 1000) / 10;

  // Value is the maximum component
  const v = Math.round(max * 1000) / 10;

  return [h, s, v];
};
