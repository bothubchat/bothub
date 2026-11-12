/** Подходит ли экран под медиазапрос прямо сейчас. Без окна — нет */
export const matchesMedia = (query: string): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(query).matches;

/** Наведения нет: подсказка по нему осталась бы висеть после касания */
export const isTouchOnly = () => matchesMedia('(hover: none)');

export const prefersReducedMotion = () =>
  matchesMedia('(prefers-reduced-motion: reduce)');
