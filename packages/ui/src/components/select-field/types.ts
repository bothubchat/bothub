import React from 'react';
import { TooltipProps } from '@/ui/components/tooltip';

export type SelectFieldChangeEventHandler = (item: SelectFieldDataItem) => unknown;

export type SelectFieldValueChangeEventHandler = (value: string) => unknown;

export type SelectFieldMultiChangeEventHandler = (items: SelectFieldDataItem[]) => unknown;

export type SelectFieldMultiValueChangeEventHandler = (value: string[]) => unknown;

export type SelectFieldOptionClickEventHandler = (item: SelectFieldDataItem) => unknown;

export type SelectFieldInputChangeEventHandler = (value: string) => unknown;

export type SelectFieldItemType = 'item' | 'divider' | 'collapse' | 'empty';

export type SelectFieldDataItem = string | {
  id?: number | string;
  type?: SelectFieldItemType;
  color?: string;
  value?: string;
  icon?: React.ReactNode;
  label?: string | null;
  disabled?: boolean;
  end?: React.ReactNode;
  tooltip?: TooltipProps;
  open?: boolean;
  data?: SelectFieldDataItem[];
};

export type SelectFieldData = SelectFieldDataItem[];

export type SelectFieldSize = 'small' | 'md';

export type SelectFieldPlacement = 'bottom-left' | 'top-left' | 'top-right';

export type SelectFieldInputType = 'text' | 'search';
