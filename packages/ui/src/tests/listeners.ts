import { vi } from 'vitest';

const isCapture = (options?: boolean | EventListenerOptions) =>
  typeof options === 'boolean' ? options : !!options?.capture;

/**
 * Следит, какие слушатели событий types висят на window и document.
 * Возвращает подсчёт на текущий момент: { 'window scroll capture': 2 }.
 * Шпионов снимает vi.restoreAllMocks().
 */
export const trackGlobalListeners = (types: string[]) => {
  const listeners = new Map<string, Set<EventListenerOrEventListenerObject>>();

  const track = (name: string, target: EventTarget) => {
    const add = target.addEventListener.bind(target);
    const remove = target.removeEventListener.bind(target);
    const getListeners = (
      type: string,
      options?: boolean | EventListenerOptions,
    ) => {
      const key = `${name} ${type}${isCapture(options) ? ' capture' : ''}`;
      const set = listeners.get(key) ?? new Set();
      listeners.set(key, set);
      return set;
    };

    vi.spyOn(target, 'addEventListener').mockImplementation(
      (type, listener, options) => {
        if (listener && types.includes(type)) {
          getListeners(type, options).add(listener);
        }
        add(type, listener, options);
      },
    );
    vi.spyOn(target, 'removeEventListener').mockImplementation(
      (type, listener, options) => {
        if (listener && types.includes(type)) {
          getListeners(type, options).delete(listener);
        }
        remove(type, listener, options);
      },
    );
  };

  track('window', window);
  track('document', document);

  return () => {
    const counts: Record<string, number> = {};
    listeners.forEach((set, key) => {
      if (set.size > 0) {
        counts[key] = set.size;
      }
    });
    return counts;
  };
};
