import { describe, expect, test } from 'vitest';
import { hexToRgb } from './hexToRgb';

describe('Transforms HEX to RGB', () => {
  test('#123456 format', () => {
    expect(hexToRgb('#123456')).toEqual(expect.arrayContaining([18, 52, 86]));
  });

  test('#ABCDEF format', () => {
    expect(hexToRgb('#ABCDEF')).toEqual(
      expect.arrayContaining([171, 205, 239])
    );
  });

  test('#ABCDEF with alpha-channel', () => {
    expect(hexToRgb('#ABCDEFAA')).toEqual(
      expect.arrayContaining([171, 205, 239])
    );
  });

  test('#ABC format', () => {
    expect(hexToRgb('#ABC')).toEqual(expect.arrayContaining([170, 187, 204]));
  });
});
