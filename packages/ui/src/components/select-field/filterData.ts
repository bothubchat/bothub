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

    if (item.label) {
      return hasSubstring(item.label, searchValue);
    }

    if (item.type === 'collapse' && item.data) {
      for (const child of item.data) {
        let result = false;

        if (typeof child === 'string') {
          result = hasSubstring(child, searchValue);
        } else if (child.label) {
          result = hasSubstring(child.label, searchValue);
        }

        if (result) {
          return true;
        }
      }

      return false;
    }

    return true;
  });
