import React, { useContext, useMemo } from 'react';
import { ScrollbarRef, SetScrollFunction } from '@/ui/components/scrollbar';

export interface MessagesContextValue {
  setScroll: SetScrollFunction;
}

export type MessagesScrollValue =
  React.MutableRefObject<ScrollbarRef | null> | null;

export const MessagesContext = React.createContext<MessagesContextValue>({
  setScroll: () => {},
});

export const MessagesScrollContext =
  React.createContext<MessagesScrollValue>(null);

export const MessagesProvider: React.FC<
  MessagesContextValue & React.PropsWithChildren
> = ({ children, setScroll }) => {
  const value = useMemo(() => ({ setScroll }), [setScroll]);

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export const MessagesScrollProvider: React.FC<
  { scrollbarRef: MessagesScrollValue } & React.PropsWithChildren
> = ({ children, scrollbarRef }) => (
  <MessagesScrollContext.Provider value={scrollbarRef}>
    {children}
  </MessagesScrollContext.Provider>
);

export const useMessages = () => useContext(MessagesContext);

export const useScrollbarRef = () => useContext(MessagesScrollContext);
