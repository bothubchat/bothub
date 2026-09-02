import React, { useContext, useMemo } from 'react';
import {
  MessageCodeCopyEventHandler,
  MessageColor,
  MessageContextCopyEventHandler,
  MessageVariant,
} from './types';

export interface MessageContextValue {
  variant: MessageVariant;
  color: MessageColor;
  typing: boolean;
  onCopy?: MessageContextCopyEventHandler;
  onCodeCopy?: MessageCodeCopyEventHandler;
}

export const MessageContext = React.createContext<
  MessageContextValue | undefined
>(undefined);

export const MessageProvider: React.FC<
  MessageContextValue & React.PropsWithChildren
> = ({ children, ...value }) => {
  const { variant, color, typing, onCopy, onCodeCopy } = value;
  const contextValue = useMemo(
    () => ({ variant, color, typing, onCopy, onCodeCopy }),
    [color, onCodeCopy, onCopy, typing, variant],
  );

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error('useMessage must be used within MessageProvider.');
  }

  return context;
};

export const MessageConsumer = MessageContext.Consumer;
