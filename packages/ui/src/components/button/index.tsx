import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef
} from 'react';
import { ButtonStyled, ButtonText } from './styled';
import { useTheme } from '@/ui/theme';
import {
  IconProvider,
  IconProviderProps,
  isIconComponent
} from '@/ui/components/icon';
import {
  ButtonComponent,
  ButtonCorner,
  ButtonSize,
  ButtonVariant
} from './types';
import { useTooltip } from '@/ui/components/tooltip';
import { Skeleton } from '@/ui/components/skeleton';
import { InfoIcon } from '@/ui/icons/info';

export type ButtonProps = Omit<
  React.ComponentProps<'button'>,
  'ref' | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
> & {
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
  href?: string;
  color?: string;
  disableHoverColor?: boolean;
  children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
  (
    {
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
      color,
      disableHoverColor = false,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const elementRef = useRef<HTMLButtonElement | null>(null);

    const childrenArray: React.ReactNode[] = React.Children.toArray(children);
    const isIconButton: boolean = React.isValidElement(childrenArray[0])
      ? isIconComponent(childrenArray[0].type)
      : false;
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
    if (
      typeof iconFill !== 'string' &&
      variant !== 'text' &&
      variant !== 'help'
    ) {
      if (disabled) {
        iconFill = theme.colors.grayScale.gray1;
      } else {
        switch (variant) {
          case 'primary':
            if (theme.scheme === 'custom') {
              iconFill = theme.colors.custom.interface.text;
              break;
            }

            iconFill = theme.bright
              ? theme.mode === 'dark'
                ? theme.colors.base.black
                : theme.default.colors.base.black
              : theme.default.colors.base.white;
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

    const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

    const handleMouseEnter = useCallback<
      React.MouseEventHandler<HTMLButtonElement>
    >(
      (event) => {
        props.onMouseEnter?.(event);
        handleTooltipMouseEnter(event);
      },
      [props.onMouseEnter, handleTooltipMouseEnter]
    );
    const handleMouseLeave = useCallback<
      React.MouseEventHandler<HTMLButtonElement>
    >(
      (event) => {
        props.onMouseLeave?.(event);
        handleTooltipMouseLeave(event);
      },
      [props.onMouseLeave, handleTooltipMouseLeave]
    );

    useImperativeHandle(ref, () => elementRef.current as HTMLButtonElement, [
      elementRef.current
    ]);

    return (
      <ButtonStyled
        {...props}
        disabled={disabled}
        type={type}
        $variant={variant}
        $icon={isIconButton}
        $size={size}
        $corner={corner}
        $fullWidth={fullWidth}
        $iconFill={iconFill}
        $skeleton={skeleton}
        $disabled={disabled}
        $disableHoverColor={disableHoverColor}
        $color={color}
        as={component}
        {...(component === 'button' && {
          type,
          disabled
        })}
        {...(component === 'a' && { href: props.href })}
        {...(component === 'label' && { htmlFor: props.htmlFor })}
        ref={elementRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {startIcon ? (
          <IconProvider {...iconProps}>{startIcon}</IconProvider>
        ) : null}
        {!skeleton && (
          <IconProvider {...iconProps}>
            {variant === 'help' && <InfoIcon />}
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
            colors={[theme.colors.base.white]}
            opacity={[0.15, 0.45]}
          />
        )}
        {endIcon ? <IconProvider {...iconProps}>{endIcon}</IconProvider> : null}
      </ButtonStyled>
    );
  }
);

export * from './types';
export * from './styled';
