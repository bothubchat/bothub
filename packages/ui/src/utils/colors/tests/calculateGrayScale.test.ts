import { describe, test, expect } from 'vitest';
import { calculateGrayScale } from '../calculateGrayScale';

describe('Calculates grayScale', () => {
  test('Default gray1 - #616D8D', () => {
    const grayScale = calculateGrayScale({
      newGray1: '#616D8D',
      interfaceBackground: '#000'
    });

    expect(grayScale).toHaveProperty('gray1');
    expect(grayScale).toHaveProperty('gray2');
    expect(grayScale).toHaveProperty('gray3');
    expect(grayScale).not.toHaveProperty('gray4');
    expect(grayScale).toHaveProperty('gray5');
    expect(grayScale).toHaveProperty('gray6');
    expect(grayScale).toHaveProperty('gray7');
  });
});
