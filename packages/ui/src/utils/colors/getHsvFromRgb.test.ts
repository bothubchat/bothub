import { expect, test, describe } from 'vitest';

import { getHsvFromRgb } from './getHsvFromRgb';

describe('Transforms RGB to HSV', () => {
  test('rgb(12, 18, 25)', () => {
    expect(getHsvFromRgb([12, 18, 25])).toEqual(
      expect.arrayContaining([212, 52, 9.8])
    );
  });

  test('rgb(240, 10, 10)', () => {
    expect(getHsvFromRgb([240, 10, 10])).toEqual(
      expect.arrayContaining([0, 95.8, 94.1])
    );
  });

  test('rgb(19, 119, 233)', () => {
    expect(getHsvFromRgb([19, 119, 233])).toEqual(
      expect.arrayContaining([212, 91.8, 91.4])
    );
  });
});
