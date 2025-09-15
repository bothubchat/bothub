import { useCallback, useEffect, useRef, useState } from 'react';
import { isMobileDevice } from './utils';

interface UseInputProps {
  initialMessage?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  altKeyDefaultValue?: boolean;
  onChange?: (value: string) => unknown;
  onSendMessage?: () => unknown;
  onTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSetAlternativeKeyValue?: (value: boolean) => unknown;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => unknown;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => unknown;
}

export const useInput = ({
  initialMessage,
  disabled,
  autoFocus,
  altKeyDefaultValue,
  onChange,
  onSendMessage,
  onTextAreaChange,
  onSetAlternativeKeyValue,
  onFocus,
  onBlur,
}: UseInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const altKeyButtonRef = useRef<HTMLDivElement | null>(null);

  const [isFocus, setIsFocus] = useState((!disabled && autoFocus) ?? false);
  const [height, setHeight] = useState('calc(var(--bothub-scale, 1) * 22px)');
  const [message, setMessage] =
    typeof initialMessage === 'string'
      ? [initialMessage, onChange]
      : useState('');

  const [isAltKey, setIsAltKey] = useState(altKeyDefaultValue ?? false);
  const [isAltKeyModalShown, setAltKeyModalShown] = useState<boolean>(false);

  const handleDefaultKey = useCallback(() => {
    setIsAltKey(false);
    onSetAlternativeKeyValue?.(false);
    setAltKeyModalShown(false);
  }, []);

  const handleAlternativeKey = useCallback(() => {
    setIsAltKey(true);
    onSetAlternativeKeyValue?.(true);
    setAltKeyModalShown(false);
  }, []);

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
  }, [disabled, autoFocus]);

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

    const handleKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();

      const isMobile = isMobileDevice();
      if (isMobile && event.key === 'Enter') {
        return;
      }
      const newLineKey = isAltKey ? 'enter' : 'ctrl/shift+enter';

      let keyboardEvent = '';
      if (event.key === 'Enter' && (event.shiftKey || event.ctrlKey)) {
        keyboardEvent = 'ctrl/shift+enter';
      } else if (event.key === 'Enter') {
        keyboardEvent = 'enter';
      } else {
        return;
      }

      if (isFocus && event.key === 'Enter') {
        if (keyboardEvent === newLineKey) {
          // handle only ctrlKey, other cases are handled by browsers
          if (event.ctrlKey) {
            event.preventDefault();

            const el = textareaRef.current;
            if (!el) return;

            const allText = el.value;
            const currentPos = el.selectionStart;
            const beforeText = allText.slice(0, currentPos);
            const afterText = allText.slice(currentPos);

            setMessage?.(`${beforeText}\n${afterText}`);
            setCursorPosition(el, currentPos + 1);
          }
        }
        // Message is submitted
        if (newLineKey !== keyboardEvent && keyboardEvent !== '') {
          event.preventDefault();
          onSendMessage?.();
          setHeight('calc(var(--bothub-scale, 1) * 22px)');
        }
      }
    };

    textareaEl.addEventListener('keydown', handleKeyDown);
    return () => {
      textareaEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocus, message, onSendMessage, setMessage]);

  useEffect(() => {
    const textareaEl = textareaRef.current;
    if (textareaEl === null) return;

    textareaEl.style.height = 'calc(var(--bothub-scale, 1) * 22px)';
    textareaEl.style.height = `${textareaEl.scrollHeight}px`;

    setHeight(`${textareaEl.scrollHeight}px`);
  }, [message, autoFocus]);

  return {
    textareaRef,
    altKeyButtonRef,
    isFocus,
    isAltKey,
    height,
    message,
    isAltKeyModalShown,
    setHeight,
    setMessage,
    setAltKeyModalShown,
    handleDefaultKey,
    handleAlternativeKey,
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
