import React, { useCallback, useState } from 'react';
import { RangeSettingsSlider } from './styled';
import type { RangeSettingsProps, RangeSettingsValue } from './types';

function defaultSingle(min: number, max: number, step: number | null): number {
  const raw = min + (max - min) / 2;
  if (step == null || step <= 0) {
    return Math.min(max, Math.max(min, raw));
  }
  const n = Math.round((raw - min) / step);
  return Math.min(max, Math.max(min, min + n * step));
}

function normalizeValue(
  next: number | number[],
  fallback: number,
): RangeSettingsValue {
  if (typeof next === 'number') {
    return next;
  }
  if (Array.isArray(next) && next.length > 0) {
    return next[0];
  }
  return fallback;
}

export const RangeSettings: React.FC<RangeSettingsProps> = ({
  className,
  min = 0,
  max = 100,
  step = 1,
  value: valueProp,
  defaultValue,
  disabled = false,
  onChange,
  onChangeComplete,
}) => {
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState<RangeSettingsValue>(
    () => defaultValue ?? defaultSingle(min, max, step),
  );

  const value = isControlled ? valueProp : uncontrolled;

  const handleChange = useCallback(
    (next: number | number[]) => {
      const nextValue = normalizeValue(next, value);
      if (!isControlled) {
        setUncontrolled(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange, value],
  );

  const handleChangeComplete = useCallback(
    (next: number | number[]) => {
      onChangeComplete?.(normalizeValue(next, value));
    },
    [onChangeComplete, value],
  );

  return (
    <RangeSettingsSlider
      className={className}
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      $disabled={disabled}
      onChange={handleChange}
      onChangeComplete={handleChangeComplete}
    />
  );
};

export * from './types';
export * from './styled';
