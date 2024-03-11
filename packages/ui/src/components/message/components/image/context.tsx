import React, { useContext } from 'react';

export interface MessageImageContextValue {
  width: number;
  height: number;
}

export const MessageImageContext = React.createContext<MessageImageContextValue>({
  width: 0,
  height: 0
});

export const MessageImageProvider: React.FC<MessageImageContextValue & React.PropsWithChildren> = ({
  children,
  ...value
}) => (
  <MessageImageContext.Provider value={value}>
    {children}
  </MessageImageContext.Provider>
);

export const useMessageImage = () => useContext(MessageImageContext);

export const MessageImageConsumer = MessageImageContext.Consumer;
