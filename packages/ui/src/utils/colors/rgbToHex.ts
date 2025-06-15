export const rgbToHex = (rgb: [number, number, number]): string => {
  if (rgb.length !== 3) {
    throw Error('RGB array should have 3 elements. Source: rgbToHex function');
  }

  const result = [];

  for (const x of rgb) {
    const hex = x.toString(16).padStart(2, '0');
    result.push(hex);
  }

  return `#${result.join('').toUpperCase()}`;
};
