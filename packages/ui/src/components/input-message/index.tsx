import React, {
  useState, useCallback, useRef, useEffect 
} from 'react';
import ContentEditable from 'react-contenteditable';
import {
  InputMessageContent, 
  InputMessageSendButton,
  InputMessageStyled, 
  InputMessageContentEditable
} from './styled';
import { ButtonRef } from '@/ui/components/button';

export interface InputMessageProps {
  className?: string;
  placeholder?: string;
  message?: string;
  disabled?: boolean;
  tabIndex?: number;
  sendDisabled?: boolean;
  onChange?: (message: string) => unknown;
  onSend?: (messageText: string) => unknown;
}

export const InputMessage: React.FC<InputMessageProps> = ({
  className, 
  placeholder, 
  message: 
  initialMessage, 
  disabled = false, 
  tabIndex = 0, 
  sendDisabled = false, 
  onChange, 
  onSend
}) => {
  const [message, setMessage] = typeof initialMessage === 'string' ? [initialMessage, onChange] : useState('');
  const [isFocus, setIsFocus] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const contentEditableRef = useRef<HTMLElement | null>(null);
  const sendButtonRef = useRef<ButtonRef>(null);
  const isPlaceholderMode = message === '' && !isFocus;

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled
      && !(event.target instanceof HTMLButtonElement)
      && !(event.target instanceof SVGElement)
      && !(event.target instanceof SVGPathElement)
    ) {
      setIsFocus(true);
    }
  }, [disabled]);
  const handleChange = useCallback((
    event: React.FormEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>
  ) => {
    if (!isFocus) {
      return;
    }

    const message: string = event.currentTarget.innerHTML;

    setMessage?.(message);
  }, [setMessage, isFocus]);
  const handleSend = useCallback(() => {
    const contentEditableEl: HTMLElement | null = contentEditableRef.current;
    
    if (contentEditableEl === null) {
      return;
    }

    const messageText: string = contentEditableEl.innerText;
    onSend?.(messageText);
    setMessage?.('');
    setIsFocus(false);
  }, [onSend, contentEditableRef, setMessage]);
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.stopPropagation();
    
    if (isFocus && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }, [isFocus, handleSend]);
  const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const sendButton: ButtonRef | null = sendButtonRef.current;

    if (
      sendButton !== null 
      && sendButton.element !== null 
      && sendButton.element.contains(event.target)
    ) {
      return;
    }
    if (disabled) {
      return;
    }

    setIsFocus(true);
  }, [disabled, sendButtonRef]);
  const handleBlur = useCallback(() => {
    setIsFocus(false);
  }, []);

  useEffect(() => {
    const contentEditableEl: HTMLElement | null = contentEditableRef.current;

    if (contentEditableEl !== null) {
      if (isFocus) {
        contentEditableEl.focus();
      } else {
        contentEditableEl.blur();
      }
    }
  }, [isFocus]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const [isInited, setIsInited] = useState(false);

  useEffect(() => {
    setIsInited(true);
  }, []);

  return (
    <InputMessageStyled
      $active={isFocus}
      $disabled={disabled}
      ref={elementRef}
      className={className}
      tabIndex={tabIndex}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      <InputMessageContent>
        {isInited && (
          <InputMessageContentEditable
            $placeholder={isPlaceholderMode}
            as={ContentEditable}
            innerRef={contentEditableRef}
            html={(isPlaceholderMode ? placeholder : message) ?? ''}
            disabled={disabled}
            onChange={handleChange}
          />
        )}
        {!isInited && (
          <InputMessageContentEditable
            $placeholder={isPlaceholderMode}
          >
            {(isPlaceholderMode ? placeholder : message) ?? ''}
          </InputMessageContentEditable>
        )}
        <InputMessageSendButton
          ref={sendButtonRef} 
          disabled={disabled || sendDisabled}
          onClick={handleSend} 
        />
      </InputMessageContent>
    </InputMessageStyled>
  );
};
