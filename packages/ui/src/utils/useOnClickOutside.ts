import { useEffect, RefObject } from 'react';
import { useEventCallback } from './useEventCallback';

type Event = MouseEvent | TouchEvent;

// Не смог нормально завести react-use, что бы он работал в остальных приложениях,
// поэтому скопипастил хук сюда
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void,
  enabled: boolean = true,
) => {
  // The latest handler is called without resubscribing, so inline handlers are fine.
  const handleOutside = useEventCallback(handler);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handleOutside(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, enabled, handleOutside]);
};
