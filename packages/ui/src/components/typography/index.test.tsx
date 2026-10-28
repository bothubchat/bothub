import { describe, test, expect } from 'vitest';
import { getTypographyStyles } from '.';

describe('typography', () => {
  test('builds the styles of a variant once', () => {
    expect(getTypographyStyles('body-m-medium')).toBe(
      getTypographyStyles('body-m-medium'),
    );
    expect(getTypographyStyles('h1')).not.toBe(
      getTypographyStyles('body-m-medium'),
    );
  });
});
