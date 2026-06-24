import { useCallback, useRef } from 'react';

export const useEvent = <T extends (...args: never[]) => unknown>(
  callback: T,
): T => {
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  return useCallback(
    (...args: Parameters<T>) => callbackRef.current(...args),
    [],
  ) as T;
};
