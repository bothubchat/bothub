import { expect, test, describe } from 'vitest';
import { hasSubstring } from './index';

describe('hasSubstring', () => {
  test('words must have substrings, case ignored', () => {
    expect(hasSubstring('React', 're')).toBeTruthy();
    expect(hasSubstring('Vue', 'v')).toBeTruthy();
    expect(hasSubstring('styled-components', 'ed-c')).toBeTruthy();
    expect(hasSubstring('Node.JS', 'js')).toBeTruthy();
  });

  test('words should not have substrings', () => {
    expect(hasSubstring('React', 'rect')).toBeFalsy();
    expect(hasSubstring('Vue', 'vi')).toBeFalsy();
    expect(hasSubstring('styled-components', '-styled')).toBeFalsy();
    expect(hasSubstring('Node.JS', 'next')).toBeFalsy();
  });
});
