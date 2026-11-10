import { createContext, useContext } from 'react';

/**
 * `true` for the code of a streamed message whose fence is not closed yet.
 * That code changes on every chunk, so it is highlighted on a throttle (plain
 * text if it has no language) and as complete once its fence is closed.
 */
export const MessageCodeTypingContext = createContext(false);

export const useMessageCodeTyping = () => useContext(MessageCodeTypingContext);
