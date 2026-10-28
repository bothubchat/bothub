import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCopiedState } from './useCopiedState';

describe('useCopiedState', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('stays copied until reset without a time', () => {
    const { result } = renderHook(() => useCopiedState());

    act(() => result.current.markCopied());
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(result.current.copied).toBe(true);

    act(() => result.current.resetCopied());
    expect(result.current.copied).toBe(false);
  });

  test('a new copy restarts the time', () => {
    const { result } = renderHook(() => useCopiedState(1000));

    act(() => result.current.markCopied());
    act(() => {
      vi.advanceTimersByTime(800);
    });
    act(() => result.current.markCopied());
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.copied).toBe(false);
  });

  test('clears the timer on unmount', () => {
    const { result, unmount } = renderHook(() => useCopiedState(1000));

    act(() => result.current.markCopied());
    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
