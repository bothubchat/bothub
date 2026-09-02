import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
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

describe('useDelayedVisible', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('should have correct default values', () => {
    const { result } = renderHook(useHook, {
      initialProps: {
        visible: true,
      },
    });
    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);
  });

  test('should have correct default values', () => {
    const { result } = renderHook(useHook, {
      initialProps: {
        visible: false,
      },
    });
    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(false);
  });

  test('should become visible only after showDelay', () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: {
        visible: false,
      },
    });
    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(false);

    act(() => {
      rerender({ visible: true });
    });

    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(true);

    act(() => {
      vi.advanceTimersByTime(UseDelayedVisibleDefaultProps.showDelay - 1);
    });
    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);
  });

  test('should hide after only hideDelay', () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: {
        visible: true,
      },
    });
    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);

    act(() => {
      rerender({ visible: false });
    });

    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);

    act(() => {
      vi.advanceTimersByTime(UseDelayedVisibleDefaultProps.hideDelay - 1);
    });
    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(false);
  });

  test('cleans timers when visibility changes before timeout ends', () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: {
        visible: false,
      },
    });

    act(() => {
      rerender({ visible: true });
      vi.advanceTimersByTime(UseDelayedVisibleDefaultProps.showDelay - 1);
      rerender({ visible: false });
      vi.advanceTimersByTime(1);
    });

    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(false);
  });
});
