import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useControllableState,
  useEventCallback,
  useIsomorphicLayoutEffect,
} from '@/ui/utils';
import { isMobileDevice } from './utils';

export type MessageSubmitKey = 'enter' | 'ctrlEnter';

export const TEXTAREA_MIN_HEIGHT = 'calc(var(--bothub-scale, 1) * 22px)';

interface UseInputProps {
  initialMessage?: string;
  disabled?: boolean;
  sendDisabled?: boolean;
  autoFocus?: boolean;
  messageSubmitKey?: MessageSubmitKey;
  onChange?: (value: string) => unknown;
  onSendMessage?: () => unknown;
  onTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => unknown;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => unknown;
}

export const useInput = ({
  initialMessage,
  disabled,
  sendDisabled,
  autoFocus,
  messageSubmitKey = 'enter',
  onChange,
  onSendMessage,
  onTextAreaChange,
  onKeyDown,
  onFocus,
  onBlur,
}: UseInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocus, setIsFocus] = useState((!disabled && autoFocus) ?? false);
  const [message, setMessage] = useControllableState({
    value: initialMessage,
    defaultValue: '',
    onChange,
  });

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
      setMessage(event.target.value);
      onTextAreaChange?.(event);
    },
    [setMessage, onTextAreaChange],
  );

  useEffect(() => {
    const textareaEl = textareaRef.current;
    if (!textareaEl || disabled) return;

    const shouldFocus = !disabled && !!autoFocus;

    // Тот же setState на маунте даёт лишний рендер при первом вводе
    if (isFocus !== shouldFocus) {
      setIsFocus(shouldFocus);
    }

    if (shouldFocus) {
      textareaEl.focus();
    } else if (document.activeElement === textareaEl) {
      textareaEl.blur();
    }
  }, [disabled, autoFocus]);

  const insertNewlineAtCursor = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    const allText = el.value;
    const currentPos = el.selectionStart ?? 0;
    const beforeText = allText.slice(0, currentPos);
    const afterText = allText.slice(currentPos);

    setMessage(`${beforeText}\n${afterText}`);
    setCursorPosition(el, currentPos + 1);
  }, [setMessage]);

  // Пропс onKeyDown вместо addEventListener: подписка не пересоздаётся на
  // каждый ввод, а onKeyDown потребителя срабатывает
  const handleKeyDown = useEventCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(event);

      if (
        event.defaultPrevented ||
        sendDisabled ||
        event.key !== 'Enter' ||
        // Enter подтверждает ввод IME (китайский, японский), а не отправляет
        event.nativeEvent.isComposing
      ) {
        return;
      }

      const isMobile = isMobileDevice();
      if (isMobile) {
        return;
      }

      if (event.shiftKey) {
        return;
      }

      const ctrlOrMeta = event.ctrlKey || event.metaKey;

      if (messageSubmitKey === 'enter') {
        // Останавливаем только обработанные клавиши, остальные всплывают
        event.preventDefault();
        event.stopPropagation();

        if (ctrlOrMeta) {
          insertNewlineAtCursor();
          return;
        }
        onSendMessage?.();
        return;
      }

      // messageSubmitKey === 'ctrlEnter'
      if (ctrlOrMeta) {
        event.preventDefault();
        event.stopPropagation();
        onSendMessage?.();
      }
    },
  );

  const autosizedRef = useRef<{
    textarea: HTMLTextAreaElement | null;
    message: string;
  }>({ textarea: null, message: '' });

  // Высота по содержимому до отрисовки и без второго коммита: пишем в DOM,
  // читаем scrollHeight один раз. Пересчёт при новом тексте или новом
  // элементе (textarea могла смонтироваться заново)
  useIsomorphicLayoutEffect(() => {
    const textareaEl = textareaRef.current;
    const autosized = autosizedRef.current;

    if (
      textareaEl === null ||
      (autosized.textarea === textareaEl && autosized.message === message)
    ) {
      return;
    }
    autosizedRef.current = { textarea: textareaEl, message };

    textareaEl.style.height = TEXTAREA_MIN_HEIGHT;
    textareaEl.style.height = `${textareaEl.scrollHeight}px`;
  });

  return {
    textareaRef,
    isFocus,
    message,
    setMessage,
    handleFocus,
    handleBlur,
    handleClick,
    handleChange,
    handleKeyDown,
  };
};

function setCursorPosition(input: HTMLTextAreaElement, start: number) {
  setTimeout(() => {
    input.selectionStart = start;
    input.selectionEnd = start;
  }, 1);
}
