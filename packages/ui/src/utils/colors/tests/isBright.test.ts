import { describe, test, expect } from 'vitest';
import { isBright } from '../isBright';

describe('Determines brightness', () => {
  test('Pure red - #FF0000', () => {
    expect(isBright('#FF0000')).toBeFalsy();
  });
  test('Pure green - #00FF00', () => {
    expect(isBright('#00FF00')).toBeTruthy();
  });
  test('Pure yellow - #FFFF00', () => {
    expect(isBright('#FFFF00')).toBeTruthy();
  });
  test('Dark red - #591E1E', () => {
    expect(isBright('#591E1E')).toBeFalsy();
  });
  test('Dark green - #165F19', () => {
    expect(isBright('#165F19')).toBeFalsy();
  });
});
