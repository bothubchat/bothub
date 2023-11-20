export type SelectFieldDataItem = string | {
  id?: number | string;
  color?: string;
  value: string;
  label?: string | null;
};

export type SelectFieldData = SelectFieldDataItem[];
