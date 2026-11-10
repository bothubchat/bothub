import { isBright } from '@/ui/utils/colors';

const brightness = new Map<string, boolean>();

/** `isBright` cached by color: theme colors repeat on every button render. */
export const isBrightColor = (color: string): boolean => {
  let value = brightness.get(color);
  if (typeof value === 'undefined') {
    value = isBright(color);
    brightness.set(color, value);
  }

  return value;
};
