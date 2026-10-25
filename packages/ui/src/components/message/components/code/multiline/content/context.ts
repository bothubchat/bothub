import { createContext } from 'react';

/**
 * Set by the markdown renderer for a block that is finished while the message
 * is still typed: its code is highlighted as final right away.
 */
export const MessageCodeCompleteContext = createContext(false);
