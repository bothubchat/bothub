import React, { useContext, useMemo } from 'react';
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
  isBottom: false,
});

export const ScrollbarProvider: React.FC<
  ScrollbarContextValue & React.PropsWithChildren
> = ({
  children,
  scrollbarSize,
  scrollShadows,
  setScroll,
  disabled,
  isLeft,
  isRight,
  isTop,
  isBottom,
}) => {
  const value = useMemo<ScrollbarContextValue>(
    () => ({
      scrollbarSize,
      scrollShadows,
      setScroll,
      disabled,
      isLeft,
      isRight,
      isTop,
      isBottom,
    }),
    [
      scrollbarSize,
      scrollShadows,
      setScroll,
      disabled,
      isLeft,
      isRight,
      isTop,
      isBottom,
    ],
  );

  return (
    <ScrollbarContext.Provider value={value}>
      {children}
    </ScrollbarContext.Provider>
  );
};

export const useScrollbar = () => useContext(ScrollbarContext);
