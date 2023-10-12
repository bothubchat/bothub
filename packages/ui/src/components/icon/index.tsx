import React from 'react';
import { AnimationProps } from 'framer-motion';
import { useIconOrNull } from './context';
import { IconStyled } from './styled';

export interface IconProps extends Omit<React.ComponentProps<'svg'>, 'ref' | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'>, AnimationProps {
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ size: defaultSize = 18, ...props }) => {
  const { size = defaultSize } = useIconOrNull() ?? { size: defaultSize };

  return <IconStyled {...props} width={size} height={size} />;
};

export * from './context';
export * from './component';
export * from './styled';
