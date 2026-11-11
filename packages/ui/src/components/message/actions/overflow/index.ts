import { useEffect, useRef, useState } from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/ui/utils';
import { getVisibleCount } from './fit';

interface Fit {
  /** Сколько действий помещается в ряд */
  count: number;
  /** Место одной кнопки вместе с зазором */
  slot: number;
}

const ALL_FIT: Fit = { count: Infinity, slot: 0 };

const getWidth = (element: Element | null) =>
  element?.getBoundingClientRect().width ?? 0;

/**
 * Следит, сколько действий помещается в ряд под сообщением.
 *
 * Ряд сжимается, когда строке тесно, а на место спрятанных действий встаёт
 * невидимый распор: ширина ряда вместе с распором и есть место, которое
 * строка может отдать действиям
 */
export const useActionsOverflow = (total: number, hasMenu: boolean) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const reserveRef = useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = useState<Fit>(ALL_FIT);

  const measure = useEventCallback(() => {
    const row = rowRef.current;
    const size = getWidth(row?.querySelector('button') ?? null);

    // Ряд скрыт или не нарисован: мерить нечего
    if (!row || size === 0) {
      return;
    }

    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const count = getVisibleCount({
      total,
      available: getWidth(row) + getWidth(reserveRef.current),
      size,
      gap,
      hasMenu,
    });
    const slot = size + gap;

    setFit((current) =>
      current.count === count && current.slot === slot
        ? current
        : { count, slot },
    );
  });

  const visibleCount = Math.min(fit.count, total);
  const hiddenCount = total - visibleCount;
  const hasReserve = hiddenCount > 0;

  // До первой отрисовки: ряд не должен мелькнуть непоместившимся
  useIsomorphicLayoutEffect(() => {
    measure();
  }, [total, hasMenu, measure]);

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(() => measure());

    [rowRef.current, reserveRef.current].forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [hasReserve, measure]);

  return {
    rowRef,
    reserveRef,
    visibleCount,
    hiddenCount,
    /** Сколько места просит распор: под все спрятанные действия */
    reserveWidth: hiddenCount * fit.slot,
  };
};

export * from './fit';
export * from './flatten';
