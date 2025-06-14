export const hsvToRgb = ([h, s, v]: [number, number, number]): [
  number,
  number,
  number
] => {
  const normalizedH = ((h % 360) + 360) % 360;

  const clampedS = Math.max(0, Math.min(100, s)) / 100;
  const clampedV = Math.max(0, Math.min(100, v)) / 100;

  const hueSector = Math.floor(normalizedH / 60);
  const remainder = normalizedH / 60 - hueSector;

  const minValue = clampedV * (1 - clampedS);
  const mid1 = clampedV * (1 - clampedS * remainder);
  const mid2 = clampedV * (1 - clampedS * (1 - remainder));

  let r: number;
  let g: number;
  let b: number;

  switch (hueSector % 6) {
    case 0:
      [r, g, b] = [clampedV, mid2, minValue];
      break;
    case 1:
      [r, g, b] = [mid1, clampedV, minValue];
      break;
    case 2:
      [r, g, b] = [minValue, clampedV, mid2];
      break;
    case 3:
      [r, g, b] = [minValue, mid1, clampedV];
      break;
    case 4:
      [r, g, b] = [mid2, minValue, clampedV];
      break;
    default:
      [r, g, b] = [clampedV, minValue, mid1];
      break;
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};
