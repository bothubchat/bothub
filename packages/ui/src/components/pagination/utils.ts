import { useMemo } from 'react';

export const emptySpace = '...';

type RangeType = Array<{
  id: number | string;
  value: number | typeof emptySpace;
}>;

export const usePaginatorPages = (current: number, last: number) =>
  useMemo<RangeType>(() => {
    let delta = 1;
    if (current === 1) {
      delta = 3;
    } else if (current <= 2) {
      delta = 2;
    }

    if (last === 1) return [{ id: 1, value: 1 }];

    const left = current - delta;
    const right = current + delta + 1;
    const range: RangeType = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        if (i === left && i > 2) {
          range.push({
            id: range.length + 1,
            value: emptySpace
          });
        }
        range.push({ value: i, id: range.length + 1 });

        if (i === right - 1 && i < last - 1) {
          range.push({ value: emptySpace, id: range.length + 1 });
        }
      }
    }

    return range;
  }, [current, last]);
