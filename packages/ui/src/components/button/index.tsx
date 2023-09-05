import React from 'react';
import { ButtonStyled } from './styled';
import { useTheme } from '@/theme';
import { IconProvider, IconProviderProps, isIconComponent } from '@/components/icon';
import { ButtonCorner, ButtonSize } from './types';

export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  disabled?: boolean;
  fullWidth?: boolean;
  size?: ButtonSize;
  corner?: ButtonCorner;
  startIcon?: React.ReactNode | null;
  endIcon?: React.ReactNode | null;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children, fullWidth = false, size = 'small', corner = 'brick', startIcon = null, endIcon = null, disabled = false, ...props 
}) => {
  const theme = useTheme();

  const childrenArray: React.ReactNode[] = React.Children.toArray(children);
  const isIconButton: boolean = React.isValidElement(childrenArray[0]) 
    ? isIconComponent(childrenArray[0].type) : false;
  let iconSize: number;
  switch (size) {
    case 'md':
      iconSize = 20;
      break;
    default:
      iconSize = 18;
      break;
  }
  const iconProps: IconProviderProps = {
    size: iconSize,
    fill: disabled ? theme.colors.grayScale.gray1 : theme.colors.base.white
  };

  return (
    <ButtonStyled 
      {...props}
      $icon={isIconButton}
      $size={size}
      $corner={corner}
      $fullWidth={fullWidth}
      disabled={disabled}
      initial={{
        background: disabled ? theme.colors.grayScale.gray2 : theme.colors.accent.primary
      }}
      animate={{
        background: disabled ? theme.colors.grayScale.gray2 : theme.colors.accent.primary
      }}
      whileHover={!disabled ? {
        background: theme.colors.accent.strong
      } : undefined}
      whileTap={!disabled ? {
        background: theme.colors.accent.strongDown,
        transform: 'translateY(1px)'
      } : undefined}
    >
      {startIcon ? (
        <IconProvider {...iconProps}>
          {startIcon}
        </IconProvider>
      ) : null}
      <IconProvider {...iconProps}>{children}</IconProvider>
      {endIcon ? (
        <IconProvider {...iconProps}>
          {endIcon}
        </IconProvider>
      ) : null}
    </ButtonStyled>
  );
};

export * from './types';
