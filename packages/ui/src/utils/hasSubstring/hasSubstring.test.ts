import { expect, test, describe } from 'vitest';
import { hasSubstring } from './index';

const array = ['React', 'Vue', 'styled-components', 'Node.JS'];

describe('hasSubstring', () => {
  test('words must have substrings, case ignored', () => {
    expect(hasSubstring(array[0], 're')).toBeTruthy();
    expect(hasSubstring(array[1], 'v')).toBeTruthy();
    expect(hasSubstring(array[2], 'ed-c')).toBeTruthy();
    expect(hasSubstring(array[3], 'js')).toBeTruthy();
  });

  test('words in arrays must have substrings, case ignored', () => {
    expect(hasSubstring(array, 're')).toBeTruthy();
    expect(hasSubstring(array, 'v')).toBeTruthy();
    expect(hasSubstring(array, 'ed-c')).toBeTruthy();
    expect(hasSubstring(array, 'js')).toBeTruthy();
  });

  test('words should not have substrings', () => {
    expect(hasSubstring(array[0], 'rect')).toBeFalsy();
    expect(hasSubstring(array[1], 'vi')).toBeFalsy();
    expect(hasSubstring(array[2], '-styled')).toBeFalsy();
    expect(hasSubstring(array[3], 'next')).toBeFalsy();
  });
});
