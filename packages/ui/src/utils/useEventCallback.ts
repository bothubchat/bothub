import { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Returns a function with a stable identity that always calls the latest
 * `callback`. Use it for handlers passed to effects, listeners or memoized
 * children, so they don't resubscribe or rerender on every render.
 */
export function useEventCallback<Args extends unknown[], Result>(
  callback: ((...args: Args) => Result) | undefined,
): (...args: Args) => Result | undefined {
  const callbackRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args: Args) => callbackRef.current?.(...args), []);
}
