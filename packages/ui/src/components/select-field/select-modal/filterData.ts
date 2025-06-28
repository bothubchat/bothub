import { hasSubstring } from '@/ui/utils';
import { SelectFieldData } from '../types';

export const filterData = (
  data: SelectFieldData,
  searchValue: string
): SelectFieldData =>
  data.filter((item) => {
    if (!searchValue) return true;

    if (typeof item === 'string') {
      return hasSubstring(item, searchValue);
    }

    if (item.label) {
      const result = hasSubstring(item.label, searchValue);

      if (result) {
        return true;
      }

      if (item.type === 'collapse' && item.data) {
        let result = false;

        for (const child of item.data) {
          if (result) break;

          if (typeof child === 'string') {
            result = hasSubstring(child, searchValue);
          }

          if (typeof child !== 'string' && child.label) {
            result = hasSubstring(child.label, searchValue);
          }
        }

        return result;
      }
    }

    return false;
  });
