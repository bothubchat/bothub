import React, { useCallback } from 'react';
import { BadgeSkeleton, BadgeStyled, BadgeText } from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { BadgeVariant } from './types';
import { ErrorIcon } from '@/ui/icons/error';
import { useTooltip } from '@/ui/components/tooltip';

export interface BadgeProps extends React.ComponentProps<'div'> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  iconSize?: number;
  brick?: boolean;
  rounded?: boolean;
  skeleton?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  icon,
  iconSize,
  brick = false,
  rounded = true,
  skeleton = false,
  children,
  ...props
}) => {
  const theme = useTheme();

  let iconFill: string;
  switch (variant) {
    case 'info':
      iconFill = theme.colors.base.white;
      break;
    default:
      iconFill = theme.default.colors.base.white;
      break;
  }

  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  const { onMouseEnter, onMouseLeave } = props;
  const handleMouseEnter = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      onMouseEnter?.(event);
      handleTooltipMouseEnter(event);
    },
    [onMouseEnter, handleTooltipMouseEnter],
  );
  const handleMouseLeave = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      onMouseLeave?.(event);
      handleTooltipMouseLeave(event);
    },
    [onMouseLeave, handleTooltipMouseLeave],
  );

  return (
    <BadgeStyled
      $variant={variant}
      $brick={brick}
      $rounded={rounded}
      $skeleton={skeleton}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IconProvider
        size={iconSize ?? 16}
        fill={iconFill}
      >
        {icon ?? (variant === 'error' ? <ErrorIcon /> : null)}
      </IconProvider>
      {skeleton && <BadgeSkeleton />}
      {!skeleton && (
        <>
          {typeof children !== 'string' && children}
          {typeof children === 'string' && (
            <BadgeText $variant={variant}>{children}</BadgeText>
          )}
        </>
      )}
    </BadgeStyled>
  );
};

export * from './types';
export * from './styled';
export * from './progress';
