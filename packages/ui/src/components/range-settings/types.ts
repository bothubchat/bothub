export type RangeSettingsValue = number;

export type RangeSettingsProps = {
  className?: string;
  min?: number;
  max?: number;
  step?: number | null;
  value?: RangeSettingsValue;
  defaultValue?: RangeSettingsValue;
  disabled?: boolean;
  onChange?: (value: RangeSettingsValue) => void;
  onChangeComplete?: (value: RangeSettingsValue) => void;
};
