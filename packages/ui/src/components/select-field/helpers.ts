import { SelectFieldDataItem } from './types';

/**
 * Identity of a select item: its value, then its id. The object itself is used
 * only when the item has neither, so a new `data` array with equal items still
 * matches the selected ones.
 */
export const getSelectFieldItemKey = (item: SelectFieldDataItem): unknown => {
  if (typeof item === 'string') {
    return item;
  }

  return item.value ?? item.id ?? item;
};

export const getSelectFieldSelectedKeys = (
  value: SelectFieldDataItem | SelectFieldDataItem[] | null | undefined,
): Set<unknown> => {
  if (!value) {
    return new Set();
  }

  if (Array.isArray(value)) {
    return new Set(value.map(getSelectFieldItemKey));
  }

  return new Set([getSelectFieldItemKey(value)]);
};
