import React from 'react';
import {
  SelectFieldData,
  SelectFieldDataItem,
  SelectFieldSize,
} from '@/ui/components/select-field/types';

export type SelectFieldOptionClickEventHandler = (
  item: SelectFieldDataItem,
) => unknown;

export type SelectFieldGroupCheckboxClickEventHandler = (
  item: SelectFieldDataItem,
) => unknown;

export interface SelectFieldOptionsProps extends React.ComponentProps<'div'> {
  value: SelectFieldDataItem | SelectFieldDataItem[] | null;
  data: SelectFieldData;
  size: SelectFieldSize;
  disableSelect?: boolean;
  selectedColor?: string;
  onGroupCheckboxClick?: SelectFieldGroupCheckboxClickEventHandler;
  onOptionClick?: SelectFieldOptionClickEventHandler;
}
