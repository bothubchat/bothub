import React, { useCallback } from 'react';
import {
  BadgeProgressBackground,
  BadgeProgressContent,
  BadgeProgressLine,
  BadgeProgressLineFilled,
  BadgeProgressLoader,
  BadgeProgressStyled,
  BadgeProgressText
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { BadgeProgressColor } from './types';
import { useTheme } from '@/ui/theme';
import { useTooltip } from '@/ui/components/tooltip';

export interface BadgeProgressProps extends React.ComponentProps<'div'> {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  color?: BadgeProgressColor;
}

export const BadgeProgress: React.FC<BadgeProgressProps> = ({
  className,
  value = null,
  min = 0,
  max = 100,
  color = 'primary',
  children,
  ...props
}) => {
  const theme = useTheme();

  const range: number = max - min;
  let percent: number | null;

  if (value !== null) {
    percent = ((value - min) / range) * 100;
  } else {
    percent = null;
  }

  let loaderColor: string;
  switch (color) {
    case 'primary':
      loaderColor = theme.default.colors.base.white;
      break;
    case 'white-green':
      loaderColor = theme.colors.gpt3;
      break;
    case 'white-purple':
      loaderColor = theme.colors.gpt4;
      break;
    case 'white-blue':
      loaderColor = theme.colors.accent.primary;
      break;
    default:
      loaderColor = color;
      break;
  }

  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  const handleMouseEnter = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      props.onMouseEnter?.(event);
      handleTooltipMouseEnter(event);
    },
    [props.onMouseEnter, handleTooltipMouseEnter]
  );
  const handleMouseLeave = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      props.onMouseLeave?.(event);
      handleTooltipMouseLeave(event);
    },
    [props.onMouseLeave, handleTooltipMouseLeave]
  );

  return (
    <BadgeProgressStyled
      {...props}
      $color={color}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BadgeProgressBackground>
        <BadgeProgressLine $color={color}>
          {percent !== null && (
            <BadgeProgressLineFilled
              style={{
                width: `${percent}%`
              }}
            />
          )}
        </BadgeProgressLine>
      </BadgeProgressBackground>
      <BadgeProgressContent>
        <IconProvider fill={loaderColor}>
          <BadgeProgressLoader />
        </IconProvider>
        {typeof children === 'string' && (
          <BadgeProgressText>{children}</BadgeProgressText>
        )}
        {typeof children !== 'string' && children}
      </BadgeProgressContent>
    </BadgeProgressStyled>
  );
};

export * from './types';
export * from './styled';
