import React from 'react';
import { IconProvider, useIconOrNull } from './context';
import { IconStyled } from './styled';
import { useTooltip } from '@/ui/components/tooltip';

export interface IconProps
  extends Omit<
    React.ComponentProps<'svg'>,
    'ref' | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  size?: number;
  fill?: string;
  enableTooltip?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  size: defaultSize = 18,
  fill: defaultFill,
  enableTooltip = false,
  ...props
}) => {
  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  const { size = defaultSize } = useIconOrNull() ?? { size: defaultSize };

  const iconNode: React.ReactNode = (
    <IconStyled
      {...props}
      width={size}
      height={size}
      {...(defaultFill === 'none' && {
        fill: 'none',
      })}
      {...(enableTooltip && {
        onMouseEnter: handleTooltipMouseEnter,
        onMouseLeave: handleTooltipMouseLeave,
      })}
    />
  );

  if (typeof defaultFill === 'string' && defaultFill !== 'none') {
    return (
      <IconProvider
        size={size}
        fill={defaultFill}
      >
        {iconNode}
      </IconProvider>
    );
  }

  return iconNode;
};

export * from './context';
export * from './component';
export * from './styled';
