import React from 'react';
import { IconContextValue, useIconOrNull } from './context';
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
  /**
   * Color of the icon's `currentColor` parts when neither `fill` nor an
   * IconProvider sets one.
   */
  defaultColor?: string;
  /**
   * Which IconProvider color the `currentColor` parts take: most icons are
   * filled, outlined ones follow `stroke`.
   */
  colorChannel?: 'fill' | 'stroke';
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

/**
 * Colors an icon's parts get: a `fill` other than `none` replaces the ones
 * of an IconProvider above, as it always did.
 */
export const useIconColors = (
  fill: string | undefined,
): IconContextValue | undefined => {
  const context = useIconOrNull() ?? undefined;

  return typeof fill === 'string' && fill !== 'none' ? { fill } : context;
};

export const Icon: React.FC<IconProps> = ({
  size: defaultSize = 18,
  fill,
  enableTooltip = false,
  defaultColor,
  colorChannel = 'fill',
  style,
  ...props
}) => {
  const size = useIconOrNull()?.size ?? defaultSize;
  const IconComponent = enableTooltip ? IconWithTooltip : IconStyled;
  // Parts drawn with `currentColor` take it from the svg: a CSS color, unlike
  // the attributes, may also be a CSS variable
  const color = useIconColors(fill)?.[colorChannel] ?? defaultColor;

  return (
    <IconComponent
      {...props}
      width={size}
      height={size}
      {...(fill === 'none' && {
        fill: 'none',
      })}
      style={color === undefined ? style : { ...style, color }}
    />
  );
};

export * from './context';
export * from './component';
export * from './styled';
