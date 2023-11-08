import React, {
  forwardRef, useCallback, useImperativeHandle, useRef 
} from 'react';
import { AnimationProps, HoverHandlers, TapHandlers } from 'framer-motion';
import { ButtonStyled } from './styled';
import { useTheme } from '@/ui/theme';
import { IconProvider, IconProviderProps, isIconComponent } from '@/ui/components/icon';
import { ButtonCorner, ButtonSize, ButtonVariant } from './types';
import { useTooltip } from '@/ui/components/tooltip';
import { Skeleton } from '@/ui/components/skeleton';

export interface ButtonRef {
  element: HTMLButtonElement | null;
}

export type ButtonProps = 
  Omit<React.ComponentProps<'button'>, 'ref' | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> & {
    disabled?: boolean;
    fullWidth?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    corner?: ButtonCorner;
    startIcon?: React.ReactNode | null;
    endIcon?: React.ReactNode | null;
    iconSize?: number;
    iconFill?: string;
    skeleton?: boolean;
    children?: React.ReactNode;
  };

export const Button = forwardRef<ButtonRef, ButtonProps>(({
  children, 
  fullWidth = false, 
  variant = 'primary',
  type = 'button',
  size = 'small', 
  corner = 'brick', 
  startIcon = null, 
  endIcon = null, 
  iconSize,
  iconFill,
  disabled = false, 
  skeleton = false,
  ...props 
}, ref) => {
  const theme = useTheme();

  const elementRef = useRef<HTMLButtonElement>(null);

  const childrenArray: React.ReactNode[] = React.Children.toArray(children);
  const isIconButton: boolean = React.isValidElement(childrenArray[0]) 
    ? isIconComponent(childrenArray[0].type) : false;
  if (typeof iconSize !== 'number') {
    switch (size) {
      case 'md':
        iconSize = 20;
        break;
      default:
        iconSize = 18;
        break;
    }
  }
  if (typeof iconFill !== 'string' && variant !== 'text') {
    if (disabled) {
      iconFill = theme.colors.grayScale.gray1;
    } else {
      iconFill = theme.colors.base.white;
    }
  }
  
  const iconProps: IconProviderProps = {
    size: iconSize,
    fill: iconFill
  };
  let animationProps: AnimationProps & HoverHandlers & TapHandlers;
  if (disabled || skeleton) {
    switch (variant) {
      case 'primary':
        animationProps = {
          initial: {
            background: theme.colors.grayScale.gray2
          },
          animate: {
            background: theme.colors.grayScale.gray2
          }
        };
        break;
      case 'secondary':
        animationProps = {
          initial: {
            background: theme.colors.grayScale.gray4
          },
          animate: {
            background: theme.colors.grayScale.gray4
          }
        };
        break;
      case 'text':
        animationProps = {
          initial: {
            background: 'rgba(255, 255, 255, 0)'
          },
          animate: {
            background: 'rgba(255, 255, 255, 0)'
          }
        };
        break;
    }
  } else {
    switch (variant) {
      case 'primary':
        animationProps = {
          initial: {
            background: theme.colors.accent.primary
          },
          animate: {
            background: theme.colors.accent.primary
          },
          whileHover: {
            background: theme.colors.accent.strong
          },
          whileTap: {
            background: theme.colors.accent.strongDown,
            transform: 'translateY(1px)'
          }
        };
        break;
      case 'secondary':
        animationProps = {
          initial: {
            background: theme.colors.grayScale.gray4,
            boxShadow: `0px 0px 0px 1px ${theme.colors.grayScale.gray2} inset`
          },
          animate: {
            background: theme.colors.grayScale.gray4,
            boxShadow: `0px 0px 0px 1px ${theme.colors.grayScale.gray2} inset`
          },
          whileHover: {
            background: theme.colors.grayScale.gray2,
            boxShadow: '0px 1px 1px 0px rgba(255, 255, 255, 0.40) inset'
          },
          whileTap: {
            background: theme.colors.grayScale.gray3,
            transform: 'translateY(1px)'
          }
        };
        break;
      case 'text':
        animationProps = {
          initial: {
            background: 'rgba(255, 255, 255, 0)',
            boxShadow: 'none'
          },
          animate: {
            background: 'rgba(255, 255, 255, 0)',
            boxShadow: 'none'
          },
          whileTap: {
            transform: 'translateY(1px)'
          }
        };
        break;
    }
  }

  const {
    handleTooltipMouseEnter,
    handleTooltipMouseLeave
  } = useTooltip();

  const handleMouseEnter = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    props.onMouseEnter?.(event);
    handleTooltipMouseEnter(event);
  }, [props.onMouseEnter, handleTooltipMouseEnter]);
  const handleMouseLeave = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    props.onMouseLeave?.(event);
    handleTooltipMouseLeave(event);
  }, [props.onMouseLeave, handleTooltipMouseLeave]);

  useImperativeHandle(ref, () => {
    const element: HTMLButtonElement | null = elementRef.current;

    return { element };
  }, [elementRef]);

  return (
    <ButtonStyled 
      {...props}
      $variant={variant}
      $icon={isIconButton}
      $size={size}
      $corner={corner}
      $fullWidth={fullWidth}
      $iconFill={iconFill}
      $skeleton={skeleton}
      type={type}
      disabled={disabled}
      {...animationProps}
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {startIcon ? (
        <IconProvider {...iconProps}>
          {startIcon}
        </IconProvider>
      ) : null}
      {!skeleton && (
        <IconProvider {...iconProps}>
          {children}
        </IconProvider>
      )}
      {skeleton && (
        <Skeleton 
          width={70} 
          height={17.5} 
          colors={[
            theme.colors.base.white
          ]}
          opacity={[
            0.15,
            0.45
          ]}
        />
      )}
      {endIcon ? (
        <IconProvider {...iconProps}>
          {endIcon}
        </IconProvider>
      ) : null}
    </ButtonStyled>
  );
});

export * from './types';
