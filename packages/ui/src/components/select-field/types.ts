import React from 'react';
import { TooltipProps } from '@/ui/components/tooltip';

export type SelectFieldChangeEventHandler = (
  item: SelectFieldDataItem | null
) => unknown;

export type SelectFieldValueChangeEventHandler = (
  value: string | null
) => unknown;

export type SelectFieldMultiChangeEventHandler = (
  items: SelectFieldDataItem[]
) => unknown;

export type SelectFieldMultiValueChangeEventHandler = (
  value: string[]
) => unknown;

export type SelectFieldOptionClickEventHandler = (
  item: SelectFieldDataItem
) => unknown;

export type SelectFieldInputChangeEventHandler = (value: string) => unknown;

export type SelectFieldItemType =
  | 'item'
  | 'divider'
  | 'collapse'
  | 'empty'
  | 'label'
  | 'radio';

export type SelectFieldDataItemSimple = string;

export type SelectFieldDataItemComplex = {
  id?: number | string;
  type?: SelectFieldItemType;
  color?: string;
  value?: string;
  icon?: React.ReactNode;
  label?: string | null;
  bold?: boolean;
  disabled?: boolean;
  end?: React.ReactNode;
  tooltip?: TooltipProps;
  open?: boolean;
  backgroundHoverColor?: 'gradient' | 'primary';
  data?: SelectFieldDataItem[];
  best_model?: boolean;
  noSelect?: boolean;
  description?: string;
  selected?: boolean;
  radioName?: string;
  onClick?: SelectFieldOptionClickEventHandler;
};

export type SelectFieldDataItem = string | SelectFieldDataItemComplex;

export type SelectFieldData = SelectFieldDataItem[];

export type SelectFieldSize = 'small' | 'md' | 'large';

export type SelectFieldPlacement =
  | 'bottom-left'
  | 'bottom-center'
  | 'top-left'
  | 'top-right';

export type SelectFieldInputType = 'text' | 'search';

export type ResetStyleStateType = string | number | boolean | null;

export type SelectedItem = SelectFieldDataItem | null;

export type ValueType = SelectFieldDataItem | SelectFieldDataItem[] | null;

export type ValueSetter = (value: ValueType) => void;
