import React, { useContext } from 'react';
import { SetScrollFunction } from '@/ui/components/scrollbar';

export interface MessagesContextValue {
  setScroll: SetScrollFunction;
}

export const MessagesContext = React.createContext<MessagesContextValue>({
  setScroll: () => {}
});

export const MessagesProvider: React.FC<MessagesContextValue & React.PropsWithChildren
> = ({
  children,
  ...value
}) => (
  <MessagesContext.Provider value={value}>
    {children}
  </MessagesContext.Provider>
);

export const useMessages = () => useContext(MessagesContext);
