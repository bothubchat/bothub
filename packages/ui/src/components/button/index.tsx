import React, {
  forwardRef, useCallback, useImperativeHandle, useRef 
} from 'react';
import {
  AnimationProps, HoverHandlers, TapHandlers, motion 
} from 'framer-motion';
import { ButtonStyled, ButtonText } from './styled';
import { useTheme } from '@/ui/theme';
import { IconProvider, IconProviderProps, isIconComponent } from '@/ui/components/icon';
import {
  ButtonComponent, ButtonCorner, ButtonSize, ButtonVariant 
} from './types';
import { useTooltip } from '@/ui/components/tooltip';
import { Skeleton } from '@/ui/components/skeleton';
import { InfoIcon } from '@/ui/icons/info';

export type ButtonProps = 
  Omit<React.ComponentProps<'button'>, 'ref' | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> & {
    disabled?: boolean;
    fullWidth?: boolean;
    variant?: ButtonVariant;
    component?: ButtonComponent;
    size?: ButtonSize;
    corner?: ButtonCorner;
    startIcon?: React.ReactNode | null;
    endIcon?: React.ReactNode | null;
    iconSize?: number;
    iconFill?: string;
    skeleton?: boolean;
    htmlFor?: string;
    children?: React.ReactNode;
  };

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(({
  children, 
  fullWidth = false, 
  variant = 'primary',
  component = 'button',
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

  const elementRef = useRef<HTMLButtonElement | null>(null);

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
  if (typeof iconFill !== 'string' && variant !== 'text' && variant !== 'help') {
    if (disabled) {
      iconFill = theme.colors.grayScale.gray1;
    } else {
      switch (variant) {
        case 'primary':
          iconFill = theme.default.colors.base.white;
          break;
        default:
          iconFill = theme.colors.base.white;
          break;
      }
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
      case 'primary-transparent':
        animationProps = {
          initial: {
            background: theme.colors.grayScale.gray2,
            opacity: 1
          },
          animate: {
            background: theme.colors.grayScale.gray2,
            opacity: 1
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
          }
        };
        break;
      case 'text':
      case 'help':
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
      case 'primary-transparent':
        animationProps = {
          variants: {
            default: {
              background: theme.colors.accent.primary,
              opacity: 0.5
            },
            hover: {
              opacity: 1
            },
            tap: {
              transform: 'translateY(1px)'
            }
          },
          initial: 'default',
          animate: 'default',
          whileHover: 'hover',
          whileTap: 'tap'
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
      case 'help':
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

  useImperativeHandle(
    ref, 
    () => (
      elementRef.current as HTMLButtonElement
    ), 
    [elementRef.current]
  );

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
      $disabled={disabled}
      as={motion[component]}
      {...(component === 'button' && {
        type,
        disabled
      })}
      {...(component === 'label' && { htmlFor: props.htmlFor })}
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
          {variant === 'help' && (
            <InfoIcon />
          )}
          {variant !== 'help' && (
            <>
              {typeof children === 'string' && (
                <ButtonText
                  $variant={variant}
                  $size={size}
                  $disabled={disabled}
                >
                  {children}
                </ButtonText>
              )}
              {typeof children !== 'string' && children}
            </>
          )}
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
export * from './styled';
