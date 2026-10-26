import React, { forwardRef, useCallback, useMemo } from 'react';
import { ButtonStyled, ButtonText } from './styled';
import { useTheme } from '@/ui/theme';
import { IconProvider, isIconComponent } from '@/ui/components/icon';
import {
  ButtonComponent,
  ButtonCorner,
  ButtonSize,
  ButtonVariant,
} from './types';
import { useTooltip } from '@/ui/components/tooltip';
import { Skeleton } from '@/ui/components/skeleton';
import { InfoIcon } from '@/ui/icons/info';
import { isBrightColor } from './utils';

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
  to?: string;
  color?: string;
  disableHoverColor?: boolean;
  children?: React.ReactNode;
};

const skeletonOpacity: [number, number] = [0.15, 0.45];

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
      iconSize: iconSizeProp,
      iconFill: iconFillProp,
      disabled = false,
      skeleton = false,
      color,
      to,
      disableHoverColor = false,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    const childrenArray: React.ReactNode[] = React.Children.toArray(children);
    const isIconButton: boolean = React.isValidElement(childrenArray[0])
      ? isIconComponent(childrenArray[0].type)
      : false;

    let iconSize: number;
    if (typeof iconSizeProp === 'number') {
      iconSize = iconSizeProp;
    } else {
      switch (size) {
        case 'md':
          iconSize = 20;
          break;
        default:
          iconSize = 18;
          break;
      }
    }

    const iconFill = useMemo<string | undefined>(() => {
      if (
        typeof iconFillProp === 'string' ||
        variant === 'text' ||
        variant === 'help'
      ) {
        return iconFillProp;
      }
      if (disabled) {
        return theme.colors.grayScale.gray1;
      }

      switch (variant) {
        case 'primary':
          if (theme.scheme === 'custom') {
            if (isBrightColor(theme.colors.accent.primary)) {
              return isBrightColor(theme.colors.custom.interface.text)
                ? theme.tokens.textOnBright
                : theme.colors.custom.interface.text;
            }

            return isBrightColor(theme.colors.custom.interface.text)
              ? theme.colors.custom.interface.text
              : theme.default.colors.base.white;
          }

          return theme.bright
            ? theme.tokens.textOnBright
            : theme.default.colors.base.white;
        default:
          return theme.colors.base.white;
      }
    }, [iconFillProp, variant, disabled, theme]);

    const skeletonColors = useMemo<[string]>(
      () => [theme.colors.base.white],
      [theme.colors.base.white],
    );

    const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();
    const isNativeButton = component === 'button';

    const { onMouseEnter, onMouseLeave } = props;
    const handleMouseEnter = useCallback<
      React.MouseEventHandler<HTMLButtonElement>
    >(
      (event) => {
        onMouseEnter?.(event);
        handleTooltipMouseEnter(event);
      },
      [onMouseEnter, handleTooltipMouseEnter],
    );
    const handleMouseLeave = useCallback<
      React.MouseEventHandler<HTMLButtonElement>
    >(
      (event) => {
        onMouseLeave?.(event);
        handleTooltipMouseLeave(event);
      },
      [onMouseLeave, handleTooltipMouseLeave],
    );
    // `disabled` does nothing on a/span/label, so block clicks (and link
    // navigation or label activation) by hand.
    const handleDisabledClick = useCallback<
      React.MouseEventHandler<HTMLButtonElement>
    >((event) => {
      event.preventDefault();
    }, []);

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
        {...(isNativeButton && {
          type,
          disabled,
        })}
        {...(!isNativeButton &&
          disabled && {
            'aria-disabled': true,
            onClick: handleDisabledClick,
          })}
        {...(to && { to })}
        {...(component === 'a' && { href: props.href })}
        {...(component === 'label' && { htmlFor: props.htmlFor })}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {startIcon ? (
          <IconProvider
            size={iconSize}
            fill={iconFill}
          >
            {startIcon}
          </IconProvider>
        ) : null}
        {!skeleton && (
          <IconProvider
            size={iconSize}
            fill={iconFill}
          >
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
            colors={skeletonColors}
            opacity={skeletonOpacity}
          />
        )}
        {endIcon ? (
          <IconProvider
            size={iconSize}
            fill={iconFill}
          >
            {endIcon}
          </IconProvider>
        ) : null}
      </ButtonStyled>
    );
  },
);

export * from './types';
export * from './styled';
