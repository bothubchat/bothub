import React, { useCallback, useState } from 'react';
import {
  TextAreaFieldBlock, 
  TextAreaFieldErrorText, 
  TextAreaFieldLabel, 
  TextAreaFieldSkeleton, 
  TextAreaFieldStyled, 
  TextAreaFieldTextArea 
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export interface TextAreaFieldProps extends React.ComponentProps<'textarea'> {
  className?: string;
  label?: string | boolean;
  fullWidth?: boolean;
  error?: string | boolean;
  disabled?: boolean;
  skeleton?: boolean;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ 
  className, label, fullWidth = false, error, disabled = false, skeleton = false, 
  onFocus, onBlur, ...props 
}) => {
  const [isFocus, setIsFocus] = useState(false);
    
  const handleFocus = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocus(true);
    onFocus?.(event);
  }, [onFocus]);
  const handleBlur = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocus(false);
    onBlur?.(event);
  }, [onBlur]);

  return (
    <TextAreaFieldStyled
      $fullWidth={fullWidth}
      $disabled={disabled}
      className={className}
    >
      {label && (
        <TextAreaFieldLabel>
          {!skeleton && label}
          {skeleton && (
            <Skeleton width={100} />
          )}
        </TextAreaFieldLabel>
      )}
      {!skeleton && (
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
      )}
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
      {error && (
        <TextAreaFieldErrorText>{error}</TextAreaFieldErrorText>
      )}
    </TextAreaFieldStyled>
  );
};
