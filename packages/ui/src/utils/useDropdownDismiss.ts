import { RefObject, useEffect } from 'react';
import { useEventCallback } from './useEventCallback';
import { useOnClickOutside } from './useOnClickOutside';

export interface UseDropdownDismissOptions {
  /**
   * `mousedown` closes as soon as the press starts outside. `click` lets a
   * click on options rendered in a portal land before the dropdown closes.
   */
  outsideEvent?: 'mousedown' | 'click';
  /** Also closes on a scroll outside the dropdown. */
  closeOnScroll?: boolean;
}

/**
 * Closes an open dropdown on a press outside it and when the window loses
 * focus. The document and the window are listened to only while `enabled`.
 */
export const useDropdownDismiss = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onDismiss: () => void,
  enabled: boolean,
  {
    outsideEvent = 'mousedown',
    closeOnScroll = false,
  }: UseDropdownDismissOptions = {},
) => {
  const dismiss = useEventCallback(onDismiss);

  useOnClickOutside(ref, dismiss, enabled && outsideEvent === 'mousedown');

  useEffect(() => {
    if (!enabled) return;

    const handleBlur = () => dismiss();

    const handleClick = (event: Event) => {
      const element = ref.current;

      if (element && !element.contains(event.target as Node)) {
        dismiss();
      }
    };

    const handleScroll = (event: Event) => {
      const element = ref.current;

      if (element && element.contains(event.target as Node)) {
        return;
      }

      dismiss();
    };

    window.addEventListener('blur', handleBlur);
    if (outsideEvent === 'click') {
      document.addEventListener('click', handleClick);
    }
    if (closeOnScroll) {
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [ref, enabled, outsideEvent, closeOnScroll, dismiss]);
};
