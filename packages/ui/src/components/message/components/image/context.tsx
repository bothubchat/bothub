import React, { useContext, useMemo } from 'react';

export interface MessageImageContextValue {
  width?: number;
  height?: number;
}

export const MessageImageContext =
  React.createContext<MessageImageContextValue>({});

export const MessageImageProvider: React.FC<
  MessageImageContextValue & React.PropsWithChildren
> = ({ children, width, height }) => {
  const value = useMemo(() => ({ width, height }), [width, height]);

  return (
    <MessageImageContext.Provider value={value}>
      {children}
    </MessageImageContext.Provider>
  );
};

export const useMessageImage = () => useContext(MessageImageContext);

export const MessageImageConsumer = MessageImageContext.Consumer;
