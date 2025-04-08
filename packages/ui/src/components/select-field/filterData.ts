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
    if ('label' in item && item.label) {
      return hasSubstring(item.label, searchValue);
    }
    return true;
  });
