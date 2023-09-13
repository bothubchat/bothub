import React, { useCallback, useState } from 'react';
import {
  TextFieldErrorText,
  TextFieldInput, TextFieldInputContainer, TextFieldLabel, TextFieldStyled 
} from './styled';
import { IconProvider, IconProviderProps } from '../icon';
import { useTheme } from '../../theme';
import { TextFieldType } from './types';

export interface TextFieldProps extends Omit<React.ComponentProps<typeof TextFieldStyled>, 'onChange' | 'onFocus' | 'onBlur' | 'onMouseEnter' | 'onMouseLeave' | '$fullWidth'> {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: string | boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  name?: string;
  type?: TextFieldType;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
  onMouseEnter?: (event: React.MouseEvent<HTMLInputElement>) => unknown;
  onMouseLeave?: (event: React.MouseEvent<HTMLInputElement>) => unknown;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label, placeholder, value, defaultValue, error, name, type, fullWidth = false, startIcon, endIcon,
  onChange, onFocus, onBlur, onMouseEnter, onMouseLeave, 
  ...props 
}) => {
  const theme = useTheme();

  const isLabel = !!label;
  const isError = !!error;

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

  const iconProps: IconProviderProps = {
    size: 16,
    fill: theme.colors.base.white
  };

  return (
    <TextFieldStyled {...props} $fullWidth={fullWidth}>
      {isLabel && <TextFieldLabel>{label}</TextFieldLabel>}
      <TextFieldInputContainer $error={isError} $hover={isHover} $focus={isFocus}>
        {startIcon && (
          <IconProvider {...iconProps}>
            {startIcon}
          </IconProvider>
        )}
        <TextFieldInput 
          value={value}
          type={type}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
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
      </TextFieldInputContainer>
      {isError && <TextFieldErrorText>{error}</TextFieldErrorText>}
    </TextFieldStyled>
  );
};

export * from './types';
