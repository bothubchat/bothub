import React from 'react';
import { ScrollbarShadowContent, ScrollbarShadowStyled } from './styled';
import { ScrollbarShadowSide } from './types';
import { useScrollbar } from '../context';
import { useTheme } from '@/ui/theme';

export interface ScrollbarShadowProps {
  side: ScrollbarShadowSide;
  size?: number;
  color?: string;
}

export const ScrollbarShadow: React.FC<ScrollbarShadowProps> = ({ side, ...props }) => {
  const theme = useTheme();
  const { scrollbarSize, scrollShadows } = useScrollbar();

  const size: number = props.size ?? scrollShadows?.size ?? 80;
  const color: string = props.color ?? scrollShadows?.color ?? theme.colors.grayScale.gray4;

  return (
    <ScrollbarShadowStyled 
      $side={side}
      $size={size}
      $scrollbarSize={scrollbarSize}
    >
      <ScrollbarShadowContent
        animate={{
          background: `linear-gradient(to ${side}, rgba(0, 0, 0, 0), ${color})`
        }}
        exit={{
          background: 'rgba(0, 0, 0, 0)'
        }}
      />
    </ScrollbarShadowStyled>
  );
};

export * from './types';
