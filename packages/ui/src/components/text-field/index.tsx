import React, { useCallback, useMemo, useRef, useState } from 'react';
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
  TextFieldColorInput,
  TextFieldShowpassButton
} from './styled';
import { IconProvider, IconProviderProps } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { SearchCircleIcon } from '@/ui/icons/search-circle';
import { TextFieldType, Variant } from './types';
import { Skeleton } from '@/ui/components/skeleton';
import { EyeIcon } from '@/ui/icons';

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
    | 'autoFocus'
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
  variant?: Variant;
  autoFocus?: boolean;
  autoComplete?: React.ComponentProps<'input'>['autoComplete'];
  inputStyles?: React.CSSProperties;
  clearable?: boolean;
  bigClearButton?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  onValueChange?: TextFieldValueChangeEventHandler;
  onClearButtonClick?: () => void;
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
  onClearButtonClick,
  readonly = false,
  variant = 'primary',
  autoFocus,
  autoComplete,
  inputStyles,
  clearable = false,
  bigClearButton = false,
  ...props
}) => {
  const theme = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (onClearButtonClick) {
      onClearButtonClick();
    }
  }, [onChange]);

  const handlePasswordToggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

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
  const getInputType = () => {
    if (type === 'password') return showPassword ? 'text' : 'password';
    if (type === 'color') return 'text';
    return type;
  };

  const inputType = useMemo(() => getInputType(), [type, showPassword]);

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
          $variant={variant}
          style={inputStyles}
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
            type={inputType}
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
            $variant={variant}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
          />
          {!!value && type === 'password' && (
            <TextFieldShowpassButton
              onClick={handlePasswordToggle}
              type="button"
              data-test="show-password"
            >
              <EyeIcon
                fill={theme.colors.grayScale.gray1}
                size={16}
              />
            </TextFieldShowpassButton>
          )}
          {(clearable || type === 'search') && value && (
            <TextFieldClearButton
              $big={bigClearButton}
              onClick={handleClear}
            />
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
          $variant={variant}
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
