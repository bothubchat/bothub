import { describe, expect, test } from 'vitest';
import { calculateAccentColors } from '../calculateAccentColors';

describe('Calculates accent colors', () => {
  test('Standard accent primary - #1C64F2', () => {
    const colors = calculateAccentColors('#1C64F2');

    expect(colors).toHaveProperty('primary');
    expect(colors).toHaveProperty('primaryLight');
    expect(colors).toHaveProperty('strong');
    expect(colors).toHaveProperty('strongDown');
  });

  test('Red accent primary - #F32929', () => {
    const colors = calculateAccentColors('#F32929');

    expect(colors).toHaveProperty('primary');
    expect(colors).toHaveProperty('primaryLight');
    expect(colors).toHaveProperty('strong');
    expect(colors).toHaveProperty('strongDown');
  });
});
