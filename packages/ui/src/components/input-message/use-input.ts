import { useCallback, useEffect, useRef, useState } from 'react';
import { isMobileDevice } from './utils';

export type MessageSubmitKey = 'enter' | 'ctrlEnter';

interface UseInputProps {
  initialMessage?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  messageSubmitKey?: MessageSubmitKey;
  onChange?: (value: string) => unknown;
  onSendMessage?: () => unknown;
  onTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => unknown;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => unknown;
}

export const useInput = ({
  initialMessage,
  disabled,
  autoFocus,
  messageSubmitKey = 'enter',
  onChange,
  onSendMessage,
  onTextAreaChange,
  onFocus,
  onBlur,
}: UseInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocus, setIsFocus] = useState((!disabled && autoFocus) ?? false);
  const [height, setHeight] = useState('calc(var(--bothub-scale, 1) * 22px)');
  const [message, setMessage] =
    typeof initialMessage === 'string'
      ? [initialMessage, onChange]
      : useState('');

  const handleFocus = useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
    (event) => {
      setIsFocus(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
    (event) => {
      setIsFocus(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  }, [disabled]);

  const handleChange = useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >(
    (event) => {
      setMessage?.(event.target.value);
      onTextAreaChange?.(event);
    },
    [setMessage, onTextAreaChange],
  );

  useEffect(() => {
    const textareaEl = textareaRef.current;
    if (!textareaEl || disabled) return;

    const shouldFocus = !disabled && !!autoFocus;

    setIsFocus(shouldFocus);

    if (shouldFocus) {
      textareaEl.focus();
    } else if (document.activeElement === textareaEl) {
      textareaEl.blur();
    }
  }, [disabled, autoFocus]);

  useEffect(() => {
    const textareaEl: HTMLElement | null = textareaRef.current;

    if (textareaEl === null) {
      return;
    }

    const insertNewlineAtCursor = () => {
      const el = textareaRef.current;
      if (!el) return;

      const allText = el.value;
      const currentPos = el.selectionStart ?? 0;
      const beforeText = allText.slice(0, currentPos);
      const afterText = allText.slice(currentPos);

      setMessage?.(`${beforeText}\n${afterText}`);
      setCursorPosition(el, currentPos + 1);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();

      if (event.key !== 'Enter') {
        return;
      }

      const isMobile = isMobileDevice();
      if (isMobile) {
        return;
      }

      if (event.shiftKey) {
        return;
      }

      if (!isFocus) {
        return;
      }

      const ctrlOrMeta = event.ctrlKey || event.metaKey;

      if (messageSubmitKey === 'enter') {
        if (ctrlOrMeta) {
          event.preventDefault();
          insertNewlineAtCursor();
          return;
        }
        event.preventDefault();
        onSendMessage?.();
        setHeight('calc(var(--bothub-scale, 1) * 22px)');
        return;
      }

      // messageSubmitKey === 'ctrlEnter'
      if (ctrlOrMeta) {
        event.preventDefault();
        onSendMessage?.();
        setHeight('calc(var(--bothub-scale, 1) * 22px)');
      }
    };

    textareaEl.addEventListener('keydown', handleKeyDown);
    return () => {
      textareaEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocus, message, messageSubmitKey, onSendMessage, setMessage]);

  useEffect(() => {
    const textareaEl = textareaRef.current;
    if (textareaEl === null) return;

    textareaEl.style.height = 'calc(var(--bothub-scale, 1) * 22px)';
    textareaEl.style.height = `${textareaEl.scrollHeight}px`;

    setHeight(`${textareaEl.scrollHeight}px`);
  }, [message, autoFocus]);

  return {
    textareaRef,
    isFocus,
    height,
    message,
    setHeight,
    setMessage,
    handleFocus,
    handleBlur,
    handleClick,
    handleChange,
  };
};

function setCursorPosition(input: HTMLTextAreaElement, start: number) {
  setTimeout(() => {
    input.selectionStart = start;
    input.selectionEnd = start;
  }, 1);
}
