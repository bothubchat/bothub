import { useCallback, useRef, useState } from 'react';
import { useEventCallback } from './useEventCallback';

export type ControllableStateSetter<T> = (next: T | ((prev: T) => T)) => void;

export interface UseControllableStateOptions<T> {
  /** Controlled value. `undefined` switches the state to uncontrolled mode. */
  value?: T;
  defaultValue: T | (() => T);
  onChange?: (value: T) => void;
}

/**
 * State that can be either controlled by the parent (`value`) or kept inside
 * the component (`defaultValue`). Hooks are always called in the same order,
 * so the mode may switch between renders without breaking React.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, ControllableStateSetter<T>] {
  const [innerValue, setInnerValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : innerValue;

  const currentValueRef = useRef(currentValue);
  currentValueRef.current = currentValue;
  const isControlledRef = useRef(isControlled);
  isControlledRef.current = isControlled;

  const handleChange = useEventCallback(onChange);

  const setValue = useCallback<ControllableStateSetter<T>>(
    (next) => {
      const nextValue =
        typeof next === 'function'
          ? (next as (prev: T) => T)(currentValueRef.current)
          : next;

      currentValueRef.current = nextValue;
      if (!isControlledRef.current) {
        setInnerValue(nextValue);
      }
      handleChange(nextValue);
    },
    [handleChange],
  );

  return [currentValue, setValue];
}
