import React, { useContext } from 'react';
import { MessageCopyEventHandler, MessageVariant } from './types';

export interface MessageContextValue {
  variant: MessageVariant;
  message: string;
  typing: boolean;
  onCopy?: MessageCopyEventHandler;
  onCodeCopy?: MessageCopyEventHandler;
}

export const MessageContext = React.createContext<MessageContextValue>({
  variant: 'user',
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
