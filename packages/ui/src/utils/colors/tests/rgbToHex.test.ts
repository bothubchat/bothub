import { expect, test, describe } from 'vitest';
import { rgbToHex } from '../rgbToHex';

describe('Converts RGB to HEX', () => {
  test('rgb(12, 18, 25)', () => {
    expect(rgbToHex([12, 18, 25])).toEqual('#0C1219');
  });

  test('rgb(255, 0, 0)', () => {
    expect(rgbToHex([255, 0, 0])).toEqual('#FF0000');
  });

  test('rgb(141, 194, 255)', () => {
    expect(rgbToHex([141, 194, 255])).toEqual('#8DC2FF');
  });
});
