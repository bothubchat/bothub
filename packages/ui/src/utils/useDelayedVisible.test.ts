import { describe, expect, test } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useDelayedVisible,
  UseDelayedVisibleDefaultProps
} from './useDelayedVisible';

const useHook = ({
  visible,
  hideDelay,
  showDelay
}: {
  visible: boolean;
  hideDelay?: number;
  showDelay?: number;
}) => useDelayedVisible(visible, showDelay, hideDelay);

describe('useDelayedVisible', () => {
  test.concurrent('should have correct default values', () => {
    const { result } = renderHook(useHook, {
      initialProps: {
        visible: true
      }
    });
    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);
  });

  test.concurrent('should have correct default values', () => {
    const { result } = renderHook(useHook, {
      initialProps: {
        visible: false
      }
    });
    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(false);
  });

  test.concurrent('should become visible only after showDelay', async () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: {
        visible: false
      }
    });
    expect(result.current.delayedVisible).toBe(false);
    expect(result.current.mounted).toBe(false);

    rerender({ visible: true });

    await waitFor(
      () => {
        expect(result.current.delayedVisible).toBe(false);
        expect(result.current.mounted).toBe(true);
      },
      {
        timeout: UseDelayedVisibleDefaultProps.showDelay / 2
      }
    );

    await waitFor(
      () => {
        expect(result.current.delayedVisible).toBe(true);
        expect(result.current.mounted).toBe(true);
      },
      {
        timeout: UseDelayedVisibleDefaultProps.showDelay + 15
      }
    );
  });

  test.concurrent('should hide after only hideDelay', async () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: {
        visible: true
      }
    });
    expect(result.current.delayedVisible).toBe(true);
    expect(result.current.mounted).toBe(true);

    rerender({ visible: false });

    await waitFor(
      () => {
        expect(result.current.delayedVisible).toBe(true);
        expect(result.current.mounted).toBe(true);
      },
      {
        timeout: UseDelayedVisibleDefaultProps.hideDelay / 2
      }
    );

    await waitFor(
      () => {
        expect(result.current.delayedVisible).toBe(false);
        expect(result.current.mounted).toBe(false);
      },
      { timeout: UseDelayedVisibleDefaultProps.hideDelay + 15 }
    );
  });
});
