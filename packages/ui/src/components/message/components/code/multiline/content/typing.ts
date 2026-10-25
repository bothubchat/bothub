import { createContext, useContext } from 'react';

/**
 * `true` for the code of a streamed message whose fence is not closed yet.
 * That code changes on every chunk, so it is shown as plain text and
 * highlighted once it is complete.
 */
export const MessageCodeTypingContext = createContext(false);

export const useMessageCodeTyping = () => useContext(MessageCodeTypingContext);
