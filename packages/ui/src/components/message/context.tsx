import React, { useContext } from 'react';
import { MessageCopyEventHandler } from './types';

export interface MessageContextValue {
  message: string;
  typing: boolean;
  onCopy?: MessageCopyEventHandler;
  onCodeCopy?: MessageCopyEventHandler;
}

export const MessageContext = React.createContext<MessageContextValue>({
  message: '',
  typing: false
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
