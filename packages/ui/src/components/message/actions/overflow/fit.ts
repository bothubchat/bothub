export interface ActionsFit {
  /** Сколько действий в ряду всего */
  total: number;
  /** Ширина, доступная ряду вместе с кнопкой «ещё» */
  available: number;
  /** Ширина одной кнопки */
  size: number;
  /** Зазор между кнопками */
  gap: number;
  /** Кнопка «ещё» стоит в ряду и без спрятанных действий */
  hasMenu: boolean;
}

// Размеры дробные: полпикселя расхождения не повод прятать кнопку
const TOLERANCE = 0.5;

/**
 * Сколько действий помещается в ряд. Остальные уходят в меню «ещё», а его
 * кнопка занимает в ряду своё место
 */
export const getVisibleCount = ({
  total,
  available,
  size,
  gap,
  hasMenu,
}: ActionsFit): number => {
  const slot = size + gap;
  const room = available + gap + TOLERANCE;
  const buttons = total + (hasMenu ? 1 : 0);

  if (slot <= 0 || buttons * slot <= room) {
    return total;
  }

  // Ряд не поместился: одно место в нём теперь у кнопки «ещё»
  const fitted = Math.floor(room / slot) - 1;

  return Math.max(0, Math.min(fitted, total));
};
