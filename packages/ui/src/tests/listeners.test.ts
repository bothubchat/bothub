import { afterEach, describe, expect, test, vi } from 'vitest';
import { trackGlobalListeners } from './listeners';

describe('trackGlobalListeners', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('counts listeners of the given events until they are removed', () => {
    const countListeners = trackGlobalListeners(['scroll', 'click']);
    const listener = () => {};

    window.addEventListener('scroll', listener, true);
    window.addEventListener('scroll', listener, true);
    window.addEventListener('scroll', listener);
    document.addEventListener('click', listener, { capture: true });
    window.addEventListener('resize', listener);
    expect(countListeners()).toEqual({
      'window scroll capture': 1,
      'window scroll': 1,
      'document click capture': 1,
    });

    window.removeEventListener('scroll', listener, true);
    document.removeEventListener('click', listener, true);
    expect(countListeners()).toEqual({ 'window scroll': 1 });

    window.removeEventListener('scroll', listener);
    window.removeEventListener('resize', listener);
    expect(countListeners()).toEqual({});
  });
});
