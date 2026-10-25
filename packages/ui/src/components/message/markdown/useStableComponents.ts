import { useRef } from 'react';
import { MessageComponentsProps } from '@/ui/components/message/components';

const isShallowEqual = <T extends object>(
  a: T | undefined,
  b: T | undefined,
): boolean => {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }

  const keys = Object.keys(a) as (keyof T)[];

  return (
    keys.length === Object.keys(b).length &&
    keys.every((key) => Object.is(a[key], b[key]))
  );
};

export const isSameComponents = (
  a: MessageComponentsProps,
  b: MessageComponentsProps,
): boolean =>
  isShallowEqual(a.code, b.code) &&
  isShallowEqual(a.document, b.document) &&
  isShallowEqual(a.image, b.image);

/**
 * Callers pass `components` as an object literal, new on every render of a
 * streamed message, and every code block and image of the message reads it:
 * a new object with the same values keeps the previous one.
 */
export const useStableComponents = (
  components: MessageComponentsProps,
): MessageComponentsProps => {
  const stable = useRef(components);

  if (!isSameComponents(stable.current, components)) {
    stable.current = components;
  }

  return stable.current;
};
