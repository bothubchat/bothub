import React, { useCallback, useState } from 'react';
import {
  TextAreaFieldBlock,
  TextAreaFieldErrorText,
  TextAreaFieldLabel,
  TextAreaFieldSkeleton,
  TextAreaFieldStyled,
  TextAreaFieldTextArea,
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export interface TextAreaFieldBlockProps {
  focus: boolean;
  error: boolean;
  skeleton: boolean;
  disabled: boolean;
  textarea: {
    disabled: boolean;
    onFocus: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  } & Omit<React.ComponentProps<'textarea'>, 'contentEditable'>;
}

export interface TextAreaFieldProps extends React.ComponentProps<'textarea'> {
  className?: string;
  label?: string | boolean | React.ReactNode;
  fullWidth?: boolean;
  error?: string | boolean;
  disabled?: boolean;
  skeleton?: boolean;
  renderTextAreaBlock?: (props: TextAreaFieldBlockProps) => React.ReactNode;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  className,
  label,
  fullWidth = false,
  error,
  disabled = false,
  skeleton = false,
  onFocus,
  onBlur,
  renderTextAreaBlock,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocus(true);
      onFocus?.(event);
    },
    [onFocus]
  );
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocus(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  return (
    <TextAreaFieldStyled
      $fullWidth={fullWidth}
      $disabled={disabled}
      className={className}
    >
      {label && skeleton && (
        <TextAreaFieldLabel>
          <Skeleton width={100} />
        </TextAreaFieldLabel>
      )}
      {typeof label === 'string' && !skeleton && (
        <TextAreaFieldLabel>{label}</TextAreaFieldLabel>
      )}
      {typeof label !== 'string' && !skeleton && label}
      {!skeleton
        && (renderTextAreaBlock ? (
          renderTextAreaBlock({
            focus: isFocus,
            error: !!error,
            disabled,
            skeleton: false,
            textarea: {
              ...props,
              disabled,
              onFocus: handleFocus,
              onBlur: handleBlur,
            }
          })
        ) : (
          <TextAreaFieldBlock
            $focus={isFocus}
            $error={!!error}
            $disabled={disabled}
            $skeleton={false}
          >
            <TextAreaFieldTextArea
              {...props}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </TextAreaFieldBlock>
        ))}
      {skeleton && (
        <TextAreaFieldBlock
          $focus={false}
          $error={false}
          $disabled={false}
          $skeleton
        >
          <TextAreaFieldSkeleton />
        </TextAreaFieldBlock>
      )}
      {error && <TextAreaFieldErrorText>{error}</TextAreaFieldErrorText>}
    </TextAreaFieldStyled>
  );
};

export * from './styled';
