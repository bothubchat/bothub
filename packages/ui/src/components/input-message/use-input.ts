import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/ui/utils';
import { isMobileDevice, isTouchDevice } from './utils';
import {
  autosizeTextarea,
  supportsFieldSizing,
  type AutosizeState,
} from './autosize';

export type MessageSubmitKey = 'enter' | 'ctrlEnter';

export const TEXTAREA_MIN_HEIGHT = 'calc(var(--bothub-scale, 1) * 22px)';

/** Фокус «ничей» или уже в поле: возвращаем его, не отбирая у другого поля */
const canRestoreFocus = (el: HTMLElement) => {
  const active = document.activeElement;
  return active === null || active === document.body || active === el;
};

interface UseInputProps {
  message: string;
  setMessage: (message: string) => unknown;
  disabled?: boolean;
  sendDisabled?: boolean;
  autoFocus?: boolean;
  messageSubmitKey?: MessageSubmitKey;
  onSendMessage?: () => unknown;
  onTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => unknown;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => unknown;
}

export const useInput = ({
  message,
  setMessage,
  disabled,
  sendDisabled,
  autoFocus,
  messageSubmitKey = 'enter',
  onSendMessage,
  onTextAreaChange,
  onKeyDown,
  onFocus,
  onBlur,
}: UseInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocus, setIsFocus] = useState((!disabled && autoFocus) ?? false);
  // Сколько раз пытались отправить с клавиатуры, пока отправка недоступна
  const [sendBlockedCount, setSendBlockedCount] = useState(0);

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

    // Браузер может снять фокус с заблокированного поля без blur.
    // Тот же setState на маунте даёт лишний рендер при первом вводе
    const hasFocus = document.activeElement === textareaEl;
    if (hasFocus !== isFocus) setIsFocus(hasFocus);
    // isFocus читаем на момент смены disabled, а не следим за ним
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, autoFocus]);

  useEffect(() => {
    if (!sendDisabled && sendBlockedCount !== 0) setSendBlockedCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendDisabled]);

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

      // Enter, которым подтверждают ввод через IME, не отправляет сообщение.
      // Safari к этому моменту уже закончил композицию и отдаёт keyCode 229
      if (
        event.defaultPrevented ||
        event.key !== 'Enter' ||
        event.nativeEvent.isComposing ||
        event.keyCode === 229
      ) {
        return;
      }

      if (isMobileDevice() || event.shiftKey) {
        return;
      }

      const ctrlOrMeta = event.ctrlKey || event.metaKey;
      const isSubmit = messageSubmitKey === 'enter' ? !ctrlOrMeta : ctrlOrMeta;

      if (!isSubmit) {
        // Ctrl+Enter / Cmd+Enter в режиме 'enter' — перенос строки,
        // Enter в режиме 'ctrlEnter' переносит строку сам
        if (messageSubmitKey === 'enter') {
          event.preventDefault();
          event.stopPropagation();
          insertNewlineAtCursor();
        }
        return;
      }

      // Останавливаем только обработанные клавиши, остальные всплывают
      event.preventDefault();
      event.stopPropagation();

      // Отправка недоступна: не переносим строку, а показываем причину
      if (sendDisabled) {
        setSendBlockedCount((count) => count + 1);
        return;
      }

      onSendMessage?.();
    },
  );

  // Высота поля и текст, для которых она посчитана
  const autosizedRef = useRef<AutosizeState>({
    textarea: null,
    message: '',
    height: 0,
  });

  // Где есть field-sizing: content, высоту по тексту считает CSS (styled.tsx).
  // Иначе — до отрисовки и без второго коммита, при новом тексте или новом
  // элементе (textarea могла смонтироваться заново)
  useIsomorphicLayoutEffect(() => {
    const textareaEl = textareaRef.current;
    const autosized = autosizedRef.current;

    if (
      textareaEl === null ||
      supportsFieldSizing() ||
      (autosized.textarea === textareaEl && autosized.message === message)
    ) {
      return;
    }

    autosizedRef.current = autosizeTextarea(
      textareaEl,
      message,
      autosized,
      TEXTAREA_MIN_HEIGHT,
    );
  });

  return {
    textareaRef,
    isFocus,
    sendBlockedCount,
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
