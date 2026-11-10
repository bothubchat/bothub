import { describe, test, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { Backdrop } from './index';

const renderBackdrops = (first: boolean, second: boolean) => (
  <TestProvider>
    <Backdrop open={first} />
    <Backdrop open={second} />
  </TestProvider>
);

describe('Backdrop', () => {
  afterEach(() => {
    cleanup();
    document.body.style.removeProperty('overflow');
  });

  test('keeps the page locked until the last backdrop closes', () => {
    const { rerender } = customRender(<Backdrop open={false} />);

    rerender(renderBackdrops(true, true));
    expect(document.body.style.overflow).toBe('hidden');

    rerender(renderBackdrops(true, false));
    expect(document.body.style.overflow).toBe('hidden');

    rerender(renderBackdrops(false, false));
    expect(document.body.style.overflow).toBe('');
  });

  test('keeps the page locked while any backdrop is open, whichever closes first', () => {
    const { rerender } = customRender(<Backdrop open={false} />);

    rerender(renderBackdrops(true, false));
    rerender(renderBackdrops(true, true));
    rerender(renderBackdrops(false, true));
    expect(document.body.style.overflow).toBe('hidden');

    rerender(renderBackdrops(true, true));
    rerender(renderBackdrops(true, false));
    expect(document.body.style.overflow).toBe('hidden');

    rerender(renderBackdrops(false, false));
    expect(document.body.style.overflow).toBe('');
  });

  test('restores the previous overflow on unmount', () => {
    document.body.style.overflow = 'scroll';
    const { unmount } = customRender(<Backdrop open />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('scroll');
  });
});
