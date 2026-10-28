import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Whether something was just copied, for a check mark in place of the copy
 * icon. With `resetAfter` the mark goes away by itself after that many
 * milliseconds, a new copy restarts the time.
 */
export const useCopiedState = (resetAfter?: number) => {
  const [copied, setCopied] = useState(false);
  // A ref, not state: the unmount cleanup has to see the latest timer
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const markCopied = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setCopied(true);

    if (resetAfter !== undefined) {
      timeoutRef.current = setTimeout(() => setCopied(false), resetAfter);
    }
  }, [resetAfter]);

  const resetCopied = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setCopied(false);
  }, []);

  return { copied, markCopied, resetCopied };
};
