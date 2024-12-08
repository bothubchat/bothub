import React, { useContext } from 'react';
import {
  MessageCodeCopyEventHandler, MessageColor, MessageContextCopyEventHandler, MessageVariant 
} from './types';

export interface MessageContextValue {
  variant: MessageVariant;
  color: MessageColor;
  typing: boolean;
  onCopy?: MessageContextCopyEventHandler;
  onCodeCopy?: MessageCodeCopyEventHandler;
}

export const MessageContext = React.createContext<MessageContextValue>({
  variant: 'user',
  color: 'default',
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
