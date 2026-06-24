import { RefObject } from 'react';
import { useEventListener } from '@/ui/hooks';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void,
) => {
  useEventListener<MouseEvent>(document, 'mousedown', (event) => {
    const el = ref.current;

    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });

  useEventListener<TouchEvent>(document, 'touchstart', (event) => {
    const el = ref.current;

    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
};
