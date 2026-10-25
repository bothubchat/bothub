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

type IconSvgProps = React.ComponentProps<typeof IconStyled>;

// Only icons with `enableTooltip` subscribe to the tooltip context, so the
// rest don't rerender when a Tooltip above them does.
const IconWithTooltip: React.FC<IconSvgProps> = (props) => {
  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  return (
    <IconStyled
      {...props}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    />
  );
};

export const Icon: React.FC<IconProps> = ({
  size: defaultSize = 18,
  fill: defaultFill,
  enableTooltip = false,
  ...props
}) => {
  const size = useIconOrNull()?.size ?? defaultSize;
  const IconComponent = enableTooltip ? IconWithTooltip : IconStyled;

  const iconNode: React.ReactNode = (
    <IconComponent
      {...props}
      width={size}
      height={size}
      {...(defaultFill === 'none' && {
        fill: 'none',
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
