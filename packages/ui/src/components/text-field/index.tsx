import React, { useCallback, useRef, useState } from 'react';
import {
  TextFieldErrorText,
  TextFieldInput,
  TextFieldBlock,
  TextFieldLabel,
  TextFieldStyled,
  TextFieldSkeleton,
  TextFieldClearButton,
  TextFieldColorPreview,
  TextFieldColor,
  TextFieldColorInput
} from './styled';
import { IconProvider, IconProviderProps } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { SearchCircleIcon } from '@/ui/icons/search-circle';
import { TextFieldType } from './types';
import { Skeleton } from '@/ui/components/skeleton';

export type TextFieldValueChangeEventHandler = (value: string) => unknown;

export interface TextFieldProps
  extends Omit<
    React.ComponentProps<typeof TextFieldStyled>,
    | 'onChange'
    | 'onFocus'
    | 'onBlur'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | '$fullWidth'
    | '$disabled'
  > {
  label?: string | boolean | React.ReactNode;
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
  readonly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onValueChange?: TextFieldValueChangeEventHandler;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  defaultValue,
  error,
  name,
  type,
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  skeleton = false,
  onChange,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onValueChange,
  readonly = false,
  ...props
}) => {
  const theme = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
      setIsFocus(true);
    },
    [onFocus]
  );
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
      setIsFocus(false);
    },
    [onBlur]
  );
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      onMouseEnter?.(event);
      setIsHover(true);
    },
    [onMouseEnter]
  );
  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      onMouseLeave?.(event);
      setIsHover(false);
    },
    [onMouseLeave]
  );

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
    },
    [onChange, onValueChange]
  );

  const handleClear = useCallback(() => {
    const inputEl: HTMLInputElement | null = inputRef.current;

    if (inputEl !== null) {
      inputEl.value = '';
      onValueChange?.('');
    }
  }, [onChange]);

  const iconProps: IconProviderProps = {
    size: 16,
    ...(disabled && {
      fill: theme.colors.grayScale.gray1
    }),
    ...(!disabled && {
      fill:
        theme.mode === 'light'
          ? theme.default.colors.accent.primary
          : theme.colors.base.white
    })
  };

  return (
    <TextFieldStyled
      {...props}
      $fullWidth={fullWidth}
      $disabled={disabled}
    >
      {label && skeleton && (
        <TextFieldLabel>
          <Skeleton width={100} />
        </TextFieldLabel>
      )}
      {typeof label === 'string' && !skeleton && (
        <TextFieldLabel>{label}</TextFieldLabel>
      )}
      {typeof label !== 'string' && !skeleton && label}
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
          {type === 'color' &&
            typeof CSS === 'object' &&
            typeof CSS.supports === 'function' &&
            CSS.supports('background', value ?? '#000') && (
              <TextFieldColor>
                <TextFieldColorInput
                  value={value ?? '#000'}
                  onChange={handleChange}
                />
                <TextFieldColorPreview $color={value ?? '#000'} />
              </TextFieldColor>
            )}
          <TextFieldInput
            ref={inputRef}
            value={value}
            {...(type === 'color' && {
              type: 'text'
            })}
            {...(type !== 'color' && { type })}
            name={name}
            readOnly={readonly}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {type === 'search' && value && (
            <TextFieldClearButton onClick={handleClear} />
          )}
          {type !== 'search' && endIcon && (
            <IconProvider {...iconProps}>{endIcon}</IconProvider>
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
      {error && <TextFieldErrorText>{error}</TextFieldErrorText>}
    </TextFieldStyled>
  );
};

export * from './types';
export * from './styled';
