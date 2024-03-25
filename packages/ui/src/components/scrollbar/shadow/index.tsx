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
  const { scrollbarSize, scrollShadows, disabled } = useScrollbar();

  const size: number = props.size ?? scrollShadows?.size ?? 60;
  const color: string = props.color ?? scrollShadows?.color ?? theme.colors.grayScale.gray4;
  const isLeft: boolean = side === 'left';
  const isRight: boolean = side === 'right';
  const isTop: boolean = side === 'top';
  const isBottom: boolean = side === 'bottom';

  const style: Record<string, string> = {
    background: `linear-gradient(to ${side}, rgba(0, 0, 0, 0), ${color})`
  };

  const initialStyle: Record<string, string | number> = {
    opacity: 0
  };
  if (isLeft || isRight) {
    initialStyle.width = 0;
  } else if (isTop || isBottom) {
    initialStyle.height = 0;
  }

  const animateStyle: Record<string, string | number> = {
    opacity: 1
  };
  if (isLeft || isRight) {
    initialStyle.width = size;
  } else if (isTop || isBottom) {
    initialStyle.height = size;
  }

  return (
    <ScrollbarShadowStyled 
      $side={side}
      $scrollbarSize={scrollbarSize}
      $disabled={disabled}
    >
      <ScrollbarShadowContent
        style={style}
        initial={initialStyle}
        animate={animateStyle}
        exit={initialStyle}
      />
    </ScrollbarShadowStyled>
  );
};

export * from './types';
