import React, { useContext } from 'react';
import { MessageListVariant } from './types';

export interface MessageListContextValue {
  variant: MessageListVariant;
}

export const MessageListContext = React.createContext<MessageListContextValue>({
  variant: 'dot',
});

export const MessageListProvider: React.FC<
  MessageListContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <MessageListContext.Provider value={value}>
    {children}
  </MessageListContext.Provider>
);

export const useMessageList = () => useContext(MessageListContext);

export const MessageListConsumer = MessageListContext.Consumer;
