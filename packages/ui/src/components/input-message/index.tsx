import React, {
  useState, useCallback, useRef, useEffect 
} from 'react';
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

    const message: string = event.currentTarget.innerText;

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

  useEffect(() => {
    const contentEditableEl: HTMLElement | null = contentEditableRef.current;

    if (contentEditableEl !== null && isFocus) {
      const target: Text = document.createTextNode('');

      contentEditableEl.appendChild(target);
      
      if (target !== null && target.nodeValue !== null) {
        const selection: Selection | null = window.getSelection();

        if (selection !== null) {
          const range: Range = document.createRange();

          range.setStart(target, target.nodeValue.length);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        if (contentEditableEl instanceof HTMLElement) {
          contentEditableEl.focus();
        }
      }
    }
  }, [message]);

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
        <InputMessageContentEditable
          $placeholder={isPlaceholderMode}
          ref={(element) => {
            contentEditableRef.current = element;
          }}
          contentEditable={disabled ? undefined : 'plaintext-only' as any} // eslint-disable-line @typescript-eslint/no-explicit-any
          dangerouslySetInnerHTML={{ __html: isPlaceholderMode ? (placeholder ?? '') : message }}
          onInput={handleChange}
          onBlur={handleChange}
        />
        <InputMessageSendButton
          ref={sendButtonRef} 
          disabled={disabled || sendDisabled}
          onClick={handleSend} 
        />
      </InputMessageContent>
    </InputMessageStyled>
  );
};
