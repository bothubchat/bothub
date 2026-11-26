import React, { useCallback } from 'react';
import { IconProvider } from '@/ui/components/icon';
import { Skeleton } from '@/ui/components/skeleton';
import { Typography } from '@/ui/components/typography';
import { useTheme } from '@/ui/theme';
import { BadgeVariant } from './types';
import { ErrorIcon } from '@/ui/icons/error';
import { useTooltip } from '@/ui/components/tooltip/context';
import { badge, badgeSkeleton, badgeText } from './badge.css';
import { BADGE_TEXT_CLASS_NAME } from './constants';

export interface BadgeProps extends React.ComponentProps<'div'> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  iconSize?: number;
  brick?: boolean;
  rounded?: boolean;
  skeleton?: boolean;
}

const badgeTextClassName = `${badgeText} ${BADGE_TEXT_CLASS_NAME}`;

export const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  icon,
  iconSize,
  brick = false,
  skeleton = false,
  className,
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

  // A styled() wrapper with `forwardedAs` picks the element, as it did when
  // Badge rendered a styled component.
  const { as: Component = 'div', ...elementProps } = props as typeof props & {
    as?: React.ElementType;
  };
  // `rounded` has never changed the styles; it doesn't reach the DOM either.
  delete elementProps.rounded;
  const classes = badge({ variant, brick, skeleton });

  return (
    <Component
      {...elementProps}
      className={className ? `${classes} ${className}` : classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IconProvider
        size={iconSize ?? 16}
        fill={iconFill}
      >
        {icon ?? (variant === 'error' ? <ErrorIcon /> : null)}
      </IconProvider>
      {skeleton && (
        <Skeleton
          width={60}
          height={12}
          className={badgeSkeleton}
        />
      )}
      {!skeleton && (
        <>
          {typeof children !== 'string' && children}
          {typeof children === 'string' && (
            <Typography
              variant="body-s-medium"
              className={badgeTextClassName}
            >
              {children}
            </Typography>
          )}
        </>
      )}
    </Component>
  );
};

export * from './types';
export * from './styled';
export * from './progress';
