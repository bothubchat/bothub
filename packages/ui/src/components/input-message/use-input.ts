import { useCallback, useEffect, useRef, useState } from 'react';
import { isMobileDevice, isTouchDevice } from './utils';

export type MessageSubmitKey = 'enter' | 'ctrlEnter';

/** Фокус «ничей» или уже в поле: возвращаем его, не отбирая у другого поля */
const canRestoreFocus = (el: HTMLElement) => {
  const active = document.activeElement;
  return active === null || active === document.body || active === el;
};

interface UseInputProps {
  initialMessage?: string;
  disabled?: boolean;
  sendDisabled?: boolean;
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
  sendDisabled,
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
  // Сколько раз пытались отправить с клавиатуры, пока отправка недоступна
  const [sendBlockedCount, setSendBlockedCount] = useState(0);
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

  // Был ли фокус в поле, когда его заблокировали: после разблокировки вернём его
  const restoreFocusRef = useRef(false);

  useEffect(() => {
    const textareaEl = textareaRef.current;
    if (!textareaEl) return;

    if (disabled) {
      // isFocus — состояние до блокировки: Chrome уже перевёл фокус на body,
      // Firefox и Safari оставили его на поле
      if (isFocus) restoreFocusRef.current = true;
      return;
    }

    const hadFocus = restoreFocusRef.current;
    restoreFocusRef.current = false;

    if (autoFocus) {
      textareaEl.focus();
    } else if (isTouchDevice()) {
      // На телефоне и планшете закрываем клавиатуру, как раньше
      if (document.activeElement === textareaEl) textareaEl.blur();
    } else if (hadFocus && canRestoreFocus(textareaEl)) {
      textareaEl.focus();
    }

    // Браузер может снять фокус с заблокированного поля без blur
    setIsFocus(document.activeElement === textareaEl);
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

      // Enter, которым подтверждают ввод через IME, не отправляет сообщение.
      // Safari к этому моменту уже закончил композицию и отдаёт keyCode 229
      if (event.key !== 'Enter' || event.isComposing || event.keyCode === 229) {
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
      const isSubmit = messageSubmitKey === 'enter' ? !ctrlOrMeta : ctrlOrMeta;

      if (!isSubmit) {
        // Ctrl+Enter / Cmd+Enter в режиме 'enter' — перенос строки,
        // Enter в режиме 'ctrlEnter' переносит строку сам
        if (messageSubmitKey === 'enter') {
          event.preventDefault();
          insertNewlineAtCursor();
        }
        return;
      }

      event.preventDefault();

      // Отправка недоступна: не переносим строку, а показываем причину
      if (sendDisabled) {
        setSendBlockedCount((count) => count + 1);
        return;
      }

      onSendMessage?.();
      setHeight('calc(var(--bothub-scale, 1) * 22px)');
    };

    textareaEl.addEventListener('keydown', handleKeyDown);
    return () => {
      textareaEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isFocus,
    message,
    messageSubmitKey,
    sendDisabled,
    onSendMessage,
    setMessage,
  ]);

  useEffect(() => {
    if (!sendDisabled) setSendBlockedCount(0);
  }, [sendDisabled]);

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
    sendBlockedCount,
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
