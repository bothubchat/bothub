import React, { useCallback, useState } from 'react';
import {
  TextFieldErrorText,
  TextFieldInput, 
  TextFieldBlock, 
  TextFieldLabel, 
  TextFieldStyled, 
  TextFieldSkeleton
} from './styled';
import { IconProvider, IconProviderProps } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { SearchCircleIcon } from '@/ui/icons';
import { TextFieldType } from './types';
import { Skeleton } from '@/ui/components/skeleton';

export type TextFieldValueChangeEventHandler = (value: string) => unknown;

export interface TextFieldProps extends Omit<React.ComponentProps<typeof TextFieldStyled>, 'onChange' | 'onFocus' | 'onBlur' | 'onMouseEnter' | 'onMouseLeave' | '$fullWidth' | '$disabled'> {
  label?: string | boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: string | boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  name?: string;
  type?: TextFieldType;
  disabled?: boolean;
  skeleton?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onValueChange?: TextFieldValueChangeEventHandler;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label, placeholder, value, defaultValue, error, name, 
  type, fullWidth = false, disabled = false, startIcon, endIcon, skeleton = false,
  onChange, onFocus, onBlur, onMouseEnter, onMouseLeave, onValueChange,
  ...props 
}) => {
  const theme = useTheme();

  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
    setIsFocus(true);
  }, [onFocus]);
  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    setIsFocus(false);
  }, [onBlur]);
  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
    onMouseEnter?.(event);
    setIsHover(true);
  }, [onMouseEnter]);
  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
    onMouseLeave?.(event);
    setIsHover(false);
  }, [onMouseLeave]);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    onChange?.(event);
    onValueChange?.(event.target.value);
  }, [onChange, onValueChange]);

  const iconProps: IconProviderProps = {
    size: 16,
    fill: theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white
  };

  return (
    <TextFieldStyled 
      {...props} 
      $fullWidth={fullWidth}
      $disabled={disabled}
    >
      {label && (
        <TextFieldLabel>
          {!skeleton && label}
          {skeleton && (
            <Skeleton width={100} />
          )}
        </TextFieldLabel>
      )}
      {!skeleton && (
        <TextFieldBlock 
          $error={!!error} 
          $hover={isHover} 
          $focus={isFocus}
          $disabled={disabled}
          $skeleton={false}
        >
          {(type === 'search' || startIcon) && (
            <IconProvider {...iconProps}>
              {startIcon}
              {type === 'search' && <SearchCircleIcon />}
            </IconProvider>
          )}
          <TextFieldInput 
            value={value}
            type={type}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {endIcon && (
            <IconProvider {...iconProps}>
              {endIcon}
            </IconProvider>
          )}
        </TextFieldBlock>
      )}
      {skeleton && (
        <TextFieldBlock
          $error={false}
          $hover={false}
          $focus={false}
          $disabled={false}
          $skeleton
        >
          <TextFieldSkeleton />
        </TextFieldBlock>
      )}
      {error && (
        <TextFieldErrorText>{error}</TextFieldErrorText>
      )}
    </TextFieldStyled>
  );
};

export * from './types';
