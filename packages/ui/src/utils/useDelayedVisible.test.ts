import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import {
  useDelayedVisible,
  UseDelayedVisibleDefaultProps,
} from './useDelayedVisible';

const useHook = ({
  visible,
  hideDelay,
  showDelay,
}: {
  visible: boolean;
  hideDelay?: number;
  showDelay?: number;
}) => useDelayedVisible(visible, showDelay, hideDelay);

const { showDelay, hideDelay } = UseDelayedVisibleDefaultProps;

// Fake timers: real ones made the delays flaky under a loaded test run.
describe('useDelayedVisible', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('starts visible', () => {
    const { result } = renderHook(useHook, {
      initialProps: { visible: true },
    });

    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);
  });

  test('starts hidden', () => {
    const { result } = renderHook(useHook, {
      initialProps: { visible: false },
    });

    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(false);
  });

  test('becomes visible only after showDelay', () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: { visible: false },
    });

    rerender({ visible: true });
    act(() => {
      vi.advanceTimersByTime(showDelay - 1);
    });

    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);
  });

  test('hides only after hideDelay', () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: { visible: true },
    });

    rerender({ visible: false });
    act(() => {
      vi.advanceTimersByTime(hideDelay - 1);
    });

    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(false);
  });

  test('uses a hideDelay changed while hiding', () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: { visible: true, hideDelay: 1000 },
    });

    rerender({ visible: false, hideDelay: 1000 });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    rerender({ visible: false, hideDelay: 50 });
    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current.delayedVisible).toBe(false);
  });
});
