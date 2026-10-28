import React from 'react';
import { SkeletonStyled, skeletonProperties } from './styled';
import { SkeletonVariant } from './types';

export interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  fullWidth?: boolean;
  colors?: [string, string?];
  opacity?: [number, number?];
}

const toCssSize = (value: number | string): string =>
  typeof value === 'number' || /^\d+(\.\d+)?$/.test(value)
    ? `${value}px`
    : value;

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant,
  width,
  height,
  fullWidth = false,
  colors,
  opacity,
}) => {
  const [colorFrom, colorTo] = colors ?? [];
  const [opacityFrom, opacityTo] = opacity ?? [];
  const style: Record<string, string> = {};
  if (fullWidth) {
    style[skeletonProperties.width] = '100%';
  } else if (typeof width === 'number' || typeof width === 'string') {
    style[skeletonProperties.width] = toCssSize(width);
  }
  if (typeof height === 'number' || typeof height === 'string') {
    style[skeletonProperties.height] = toCssSize(height);
  }
  if (typeof colorFrom === 'string') {
    style[skeletonProperties.colorFrom] = colorFrom;
  }
  if (typeof colorTo === 'string') {
    style[skeletonProperties.colorTo] = colorTo;
  }
  if (typeof opacityFrom === 'number') {
    style[skeletonProperties.opacityFrom] = String(opacityFrom);
  }
  if (typeof opacityTo === 'number') {
    style[skeletonProperties.opacityTo] = String(opacityTo);
  }

  return (
    <SkeletonStyled
      $variant={variant}
      className={className}
      style={style}
    />
  );
};

Skeleton.displayName = 'Skeleton';

export * from './types';
