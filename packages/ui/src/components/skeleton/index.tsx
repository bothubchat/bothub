import React from 'react';
import { SkeletonStyled } from './styled';
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

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant,
  width,
  height,
  fullWidth = false,
  colors,
  opacity
}) => (
  <SkeletonStyled
    $variant={variant}
    $width={width}
    $height={height}
    $fullWidth={fullWidth}
    $opacity={opacity}
    $colors={colors}
    className={className}
  />
);

Skeleton.displayName = 'Skeleton';

export * from './types';
