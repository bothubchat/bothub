import type { ReactNode } from 'react';

export type RangeSettingsValue = number;

export type RangeSettingsProps = {
  className?: string;
  /** Произвольный элемент справа от слайдера (например `Switch`). */
  toggle?: ReactNode;
  min?: number;
  max?: number;
  step?: number | null;
  value?: RangeSettingsValue;
  defaultValue?: RangeSettingsValue;
  disabled?: boolean;
  onChange?: (value: RangeSettingsValue) => void;
  onChangeComplete?: (value: RangeSettingsValue) => void;
};
