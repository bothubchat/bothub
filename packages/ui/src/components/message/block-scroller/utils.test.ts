import { describe, expect, test } from 'vitest';
import { getHorizontalEdges, isSameEdges } from './utils';

describe('getHorizontalEdges', () => {
  test('shows no edges when the content fits', () => {
    expect(
      getHorizontalEdges(
        { scrollLeft: 0, scrollWidth: 300, clientWidth: 300 },
        60,
      ),
    ).toEqual({ left: false, right: false });
  });

  test('shows the right edge at the start of a wide content', () => {
    expect(
      getHorizontalEdges(
        { scrollLeft: 0, scrollWidth: 600, clientWidth: 300 },
        60,
      ),
    ).toEqual({ left: false, right: true });
  });

  test('shows both edges in the middle', () => {
    expect(
      getHorizontalEdges(
        { scrollLeft: 150, scrollWidth: 600, clientWidth: 300 },
        60,
      ),
    ).toEqual({ left: true, right: true });
  });

  test('shows the left edge at the end, also after a fractional scroll', () => {
    expect(
      getHorizontalEdges(
        { scrollLeft: 300, scrollWidth: 600, clientWidth: 300 },
        60,
      ),
    ).toEqual({ left: true, right: false });
    expect(
      getHorizontalEdges(
        { scrollLeft: 299.6, scrollWidth: 600, clientWidth: 300 },
        60,
      ),
    ).toEqual({ left: true, right: false });
  });

  test('ignores an overflow of one pixel', () => {
    expect(
      getHorizontalEdges(
        { scrollLeft: 0, scrollWidth: 301, clientWidth: 300 },
        60,
      ),
    ).toEqual({ left: false, right: false });
  });

  test('shows no edges when the block is narrower than a shadow', () => {
    expect(
      getHorizontalEdges(
        { scrollLeft: 10, scrollWidth: 600, clientWidth: 50 },
        60,
      ),
    ).toEqual({ left: false, right: false });
  });
});

describe('isSameEdges', () => {
  test('compares both edges', () => {
    expect(
      isSameEdges({ left: true, right: false }, { left: true, right: false }),
    ).toBe(true);
    expect(
      isSameEdges({ left: true, right: false }, { left: true, right: true }),
    ).toBe(false);
    expect(
      isSameEdges({ left: false, right: true }, { left: true, right: true }),
    ).toBe(false);
  });
});
