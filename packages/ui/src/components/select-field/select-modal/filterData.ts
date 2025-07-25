import { hasSubstring } from '@/ui/utils';
import { SelectFieldData } from '../types';

export const filterData = (
  data: SelectFieldData,
  searchValue: string,
): SelectFieldData =>
  data
    .map((item) => {
      if (typeof item === 'string') {
        return hasSubstring(item, searchValue) ? item : null;
      }

      if (item.type === 'collapse' && item.data) {
        const children = item.data
          .map((child) => {
            if (typeof child === 'string') {
              return hasSubstring(child, searchValue) ? child : null;
            }
            if (child.label) {
              return hasSubstring(child.label, searchValue) ? child : null;
            }
            return child;
          })
          .filter((child) => child !== null);

        const hasRelevantChildren = children.length > 0;

        return hasRelevantChildren
          ? {
              ...item,
              data: children,
            }
          : null;
      }

      if (item.label) {
        return hasSubstring(item.label, searchValue) ? item : null;
      }

      return item;
    })
    .filter((item) => item !== null);
