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

export interface ScrollbarLockedProps {
  side: ScrollbarLockedSide;
}

export type ScrollbarOverflow = 'auto' | 'visible';
