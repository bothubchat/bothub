import React, { useCallback, useState } from 'react';
import {
  TextAreaFieldBlock, 
  TextAreaFieldErrorText, 
  TextAreaFieldLabel, 
  TextAreaFieldStyled, 
  TextAreaFieldTextArea 
} from './styled';

export interface TextAreaFieldProps extends React.ComponentProps<'textarea'> {
  className?: string;
  label?: string;
  fullWidth?: boolean;
  error?: string | boolean;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ 
  className, label, fullWidth = false, error, onFocus, onBlur, ...props 
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
      className={className}
    >
      {label && (
        <TextAreaFieldLabel>{label}</TextAreaFieldLabel>
      )}
      <TextAreaFieldBlock 
        $focus={isFocus}
        $error={!!error}  
      >
        <TextAreaFieldTextArea 
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </TextAreaFieldBlock>
      {error && (
        <TextAreaFieldErrorText>{error}</TextAreaFieldErrorText>
      )}
    </TextAreaFieldStyled>
  );
};
