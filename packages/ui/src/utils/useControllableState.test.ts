import { describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useControllableState } from './useControllableState';

describe('useControllableState', () => {
  test('keeps its own state when uncontrolled', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 1, onChange }),
    );

    act(() => result.current[1](2));
    expect(result.current[0]).toBe(2);
    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(3);
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  test('follows the value prop when controlled', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }: { value?: number }) =>
        useControllableState({ value, defaultValue: 0, onChange }),
      { initialProps: { value: 5 } },
    );

    act(() => result.current[1](6));
    expect(result.current[0]).toBe(5);
    expect(onChange).toHaveBeenCalledWith(6);

    rerender({ value: 6 });
    expect(result.current[0]).toBe(6);
  });

  test('switches between modes without breaking hooks order', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value?: number }) =>
        useControllableState({ value, defaultValue: 0 }),
      { initialProps: { value: undefined as number | undefined } },
    );

    expect(result.current[0]).toBe(0);
    rerender({ value: 10 });
    expect(result.current[0]).toBe(10);
    rerender({ value: undefined });
    expect(result.current[0]).toBe(0);
  });
});
