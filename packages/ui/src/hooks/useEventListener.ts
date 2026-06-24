import { RefObject, useEffect } from 'react';
import { useEvent } from './useEvent';

export type UseEventListenerTarget =
  | Window
  | Document
  | EventTarget
  | RefObject<EventTarget | null>
  | null
  | undefined;

export type UseEventListenerOptions = {
  enabled?: boolean;
} & AddEventListenerOptions;

const getTargetElement = (
  target: UseEventListenerTarget,
): EventTarget | null => {
  if (target == null) {
    return null;
  }

  if ('current' in target) {
    return target.current;
  }

  return target;
};

export const useEventListener = <E extends Event = Event>(
  target: UseEventListenerTarget,
  eventName: string,
  handler: (event: E) => void,
  {
    enabled = true,
    capture,
    passive,
    once,
    signal,
  }: UseEventListenerOptions = {},
): void => {
  const stableHandler = useEvent(handler);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const element = getTargetElement(target);

    if (element == null) {
      return;
    }

    const listener: EventListener = (event) => {
      stableHandler(event as E);
    };

    const options: AddEventListenerOptions = {
      capture,
      passive,
      once,
      signal,
    };

    element.addEventListener(eventName, listener, options);

    return () => {
      element.removeEventListener(eventName, listener, options);
    };
  }, [
    target,
    eventName,
    stableHandler,
    enabled,
    capture,
    passive,
    once,
    signal,
  ]);
};
