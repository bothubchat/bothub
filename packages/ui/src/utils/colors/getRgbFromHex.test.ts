import { describe, expect, test } from 'vitest';
import { getRgbFromHex } from './getRgbFromHex';

describe('Transforms HEX to RGB', () => {
  test('#123456 format', () => {
    expect(getRgbFromHex('#123456')).toEqual(
      expect.arrayContaining([18, 52, 86])
    );
  });

  test('#ABCDEF format', () => {
    expect(getRgbFromHex('#ABCDEF')).toEqual(
      expect.arrayContaining([171, 205, 239])
    );
  });

  test('#ABCDEF with alpha-channel', () => {
    expect(getRgbFromHex('#ABCDEFAA')).toEqual(
      expect.arrayContaining([171, 205, 239])
    );
  });

  test('#ABC format', () => {
    expect(getRgbFromHex('#ABC')).toEqual(
      expect.arrayContaining([170, 187, 204])
    );
  });
});
