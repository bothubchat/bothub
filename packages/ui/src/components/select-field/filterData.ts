import { hasSubstring } from '@/ui/utils';
import { SelectFieldData } from './types';

export const filterData = (
  data: SelectFieldData,
  searchValue: string
): SelectFieldData =>
  data.filter((item) => {
    if (typeof item === 'string') {
      return hasSubstring(item, searchValue);
    }

    if (item.type === 'collapse' && item.data) {
      let result = false;

      if (item.label) {
        result = hasSubstring(item.label, searchValue);
      }

      for (const child of item.data) {
        if (result) break;

        if (typeof child === 'string') {
          result = hasSubstring(child, searchValue);
        } else if (child.label) {
          result = hasSubstring(child.label, searchValue);
        }
      }

      return result;
    }

    if (item.label) {
      return hasSubstring(item.label, searchValue);
    }

    return true;
  });
