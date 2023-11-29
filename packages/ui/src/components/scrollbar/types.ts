import React from 'react';

export type ScrollbarVariant = 'primary' | 'secondary';

export interface ScrollbarShadowsProps {
  size?: number;
  color?: string; 
  left?: React.ReactNode;
  right?: React.ReactNode;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

export type ScrollbarLockedSide = 'bottom';

export interface SetScrollOptions {
  side: ScrollbarLockedSide;
}

export type SetScrollFunction = (options?: SetScrollOptions) => void;

export interface ScrollbarRef {
  element: Element | null;
  setScroll: SetScrollFunction;
}

export type ScrollbarOverflow = 'auto' | 'visible';
