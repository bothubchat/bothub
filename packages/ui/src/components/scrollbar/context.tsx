import React, { useContext } from 'react';
import { ScrollbarShadowsProps } from './types';

export interface ScrollbarContextValue {
  scrollbarSize: number;
  scrollShadows?: ScrollbarShadowsProps;
  setScroll: () => void;
  disabled: boolean;
  isLeft: boolean;
  isRight: boolean;
  isTop: boolean;
  isBottom: boolean;
}

export const ScrollbarContext = React.createContext<ScrollbarContextValue>({
  scrollbarSize: 6,
  setScroll: () => {},
  disabled: false,
  isLeft: false,
  isRight: false,
  isTop: false,
  isBottom: false
});

export const ScrollbarProvider: React.FC<
  ScrollbarContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <ScrollbarContext.Provider value={value}>
    {children}
  </ScrollbarContext.Provider>
);

export const useScrollbar = () => useContext(ScrollbarContext);
