import React, { useContext } from 'react';
import { MessageCopyEventHandler } from './types';

export interface MessageContextValue {
  message: string;
  onCopy?: MessageCopyEventHandler;
  onCodeCopy?: MessageCopyEventHandler;
}

export const MessageContext = React.createContext<MessageContextValue>({
  message: ''
});

export const MessageProvider: React.FC<MessageContextValue & React.PropsWithChildren> = ({
  children,
  ...value
}) => (
  <MessageContext.Provider value={value}>
    {children}
  </MessageContext.Provider>
);

export const useMessage = () => useContext(MessageContext);

export const MessageConsumer = MessageContext.Consumer;
