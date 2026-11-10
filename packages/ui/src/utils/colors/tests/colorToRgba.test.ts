import { describe, expect, test } from 'vitest';
import { colorToRgba } from '../colorToRgba';

describe('colorToRgba', () => {
  test('adds alpha to HEX colors', () => {
    expect(colorToRgba('#123456', 0.2)).toBe('#12345633');
    expect(colorToRgba('#abc', 0.5)).toBe('#aabbcc80');
    expect(colorToRgba('#abcd', 1)).toBe('#aabbccff');
  });

  test('replaces the alpha of #RRGGBBAA', () => {
    expect(colorToRgba('#12345699', 0.2)).toBe('#12345633');
  });

  test('pads a one-digit alpha', () => {
    expect(colorToRgba('#123456', 0.02)).toBe('#12345605');
    expect(colorToRgba('#123456', 0)).toBe('#12345600');
  });

  test('converts rgb() and rgba() with a fractional alpha', () => {
    expect(colorToRgba('rgb(18, 52, 86)', 0.2)).toBe('#12345633');
    expect(colorToRgba('rgba(18,52,86,0.5)', 0.2)).toBe('#12345633');
    expect(colorToRgba('rgba(18, 52, 86, 1)', 1)).toBe('#123456ff');
  });

  test('never throws', () => {
    expect(colorToRgba('#12', 0.5)).toBe('#12');
    expect(colorToRgba('red', 0.5)).toBe('red');
    expect(colorToRgba('var(--color)', 0.5)).toBe('var(--color)');
    expect(colorToRgba('#123456', 2)).toBe('#123456ff');
    expect(colorToRgba('#123456', -1)).toBe('#12345600');
  });
});
