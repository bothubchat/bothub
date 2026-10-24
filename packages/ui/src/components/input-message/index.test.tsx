import React from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import { createClipboardData, customRender, TestProvider } from '@/ui/tests';
import { InputMessage } from '.';

const image = new File(['png'], 'image.png', { type: 'image/png' });

const renderInput = (
  props: Partial<React.ComponentProps<typeof InputMessage>> = {},
) => {
  const onFilesChange = vi.fn();

  customRender(
    <InputMessage
      placeholder="Сообщение"
      files={[]}
      onFilesChange={onFilesChange}
      {...props}
    />,
  );
  // useFiles синхронизирует контролируемые files при монтировании
  onFilesChange.mockClear();

  return {
    onFilesChange,
    textarea: screen.getByPlaceholderText('Сообщение'),
  };
};

const voiceFile = (src: string) => ({
  src,
  duration: 3,
  waveData: [0.2, 0.6, 0.4],
  blob: new Blob(['voice'], { type: 'audio/webm' }),
});

describe('InputMessage controlled voice files', () => {
  // jsdom не умеет грузить аудио плеера голосового
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const renderVoice = (
    props: Partial<React.ComponentProps<typeof InputMessage>> = {},
  ) => {
    const onVoiceFilesChange = vi.fn();
    const onSend = vi.fn();
    const element = (voiceFiles = props.voiceFiles) => (
      <InputMessage
        placeholder="Сообщение"
        deleteVoiceAriaLabel="Удалить голосовое"
        sendAriaLabel="Отправить"
        voice
        onVoiceFilesChange={onVoiceFilesChange}
        onSend={onSend}
        {...props}
        voiceFiles={voiceFiles}
      />
    );
    const { rerender } = customRender(element());

    return {
      onVoiceFilesChange,
      onSend,
      rerender: (voiceFiles: ReturnType<typeof voiceFile>[]) =>
        rerender(<TestProvider>{element(voiceFiles)}</TestProvider>),
      tracks: () => screen.queryAllByLabelText('Удалить голосовое'),
    };
  };

  test('shows the voice files the parent passes', () => {
    const { tracks, onVoiceFilesChange } = renderVoice({
      voiceFiles: [voiceFile('blob:one')],
    });

    expect(tracks()).toHaveLength(1);
    expect(onVoiceFilesChange).not.toHaveBeenCalled();
  });

  test('asks the parent to clear them on send and shows them again when returned', () => {
    const recorded = [voiceFile('blob:one')];
    const { tracks, onVoiceFilesChange, onSend, rerender } = renderVoice({
      voiceFiles: recorded,
    });

    fireEvent.click(screen.getByLabelText('Отправить'));

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onVoiceFilesChange).toHaveBeenLastCalledWith([]);

    rerender([]);
    expect(tracks()).toHaveLength(0);

    // Отправка не удалась — родитель возвращает голосовое
    rerender(recorded);
    expect(tracks()).toHaveLength(1);
  });

  test('asks the parent to drop a deleted voice file', () => {
    const one = voiceFile('blob:one');
    const two = voiceFile('blob:two');
    const { tracks, onVoiceFilesChange } = renderVoice({
      voiceFiles: [one, two],
    });

    fireEvent.click(tracks()[0]);

    expect(onVoiceFilesChange).toHaveBeenLastCalledWith([two]);
  });
});

type InputMessageTestProps = Partial<React.ComponentProps<typeof InputMessage>>;

/** rerender перерисовывает с исходными пропсами и next поверх них */
const renderComposer = (props: InputMessageTestProps = {}) => {
  const onSend = vi.fn();
  const element = (next: InputMessageTestProps = {}) => (
    <InputMessage
      placeholder="Сообщение"
      sendAriaLabel="Отправить"
      // В открытом чате клиент выключает autoFocus
      autoFocus={false}
      onSend={onSend}
      {...props}
      {...next}
    />
  );
  const { rerender } = customRender(element());

  return {
    onSend,
    textarea: screen.getByPlaceholderText<HTMLTextAreaElement>('Сообщение'),
    rerender: (next: InputMessageTestProps) =>
      rerender(<TestProvider>{element(next)}</TestProvider>),
  };
};

describe('InputMessage focus', () => {
  afterEach(cleanup);

  const focusOutside = (tag: 'button' | 'input') => {
    const el = document.createElement(tag);
    document.body.append(el);
    act(() => el.focus());
    return el;
  };

  test('keeps focus in the field after it is enabled again', () => {
    const { textarea, rerender } = renderComposer();
    act(() => textarea.focus());

    rerender({ disabled: true });
    rerender({ disabled: false });

    expect(document.activeElement).toBe(textarea);
  });

  test('returns focus lost while the field was disabled', () => {
    const { textarea, rerender } = renderComposer();
    act(() => textarea.focus());

    rerender({ disabled: true });
    // Chrome уводит фокус с заблокированного поля на body
    const button = focusOutside('button');
    act(() => button.remove());
    expect(document.activeElement).toBe(document.body);

    rerender({ disabled: false });

    expect(document.activeElement).toBe(textarea);
  });

  test('does not take focus from another field', () => {
    const { textarea, rerender } = renderComposer();
    act(() => textarea.focus());

    rerender({ disabled: true });
    const other = focusOutside('input');
    rerender({ disabled: false });

    expect(document.activeElement).toBe(other);
    other.remove();
  });

  test('does not focus the field the user was not typing in', () => {
    const { rerender } = renderComposer();

    rerender({ disabled: true });
    rerender({ disabled: false });

    expect(document.activeElement).toBe(document.body);
  });

  test('keeps focus when autoFocus turns off', () => {
    // Первое сообщение нового чата: у чата появился id
    const { textarea, rerender } = renderComposer({ autoFocus: true });
    expect(document.activeElement).toBe(textarea);

    rerender({ autoFocus: false });

    expect(document.activeElement).toBe(textarea);
  });

  test('puts the cursor back after sending with the button', () => {
    const { textarea, onSend } = renderComposer();
    const send = screen.getByLabelText('Отправить');
    act(() => send.focus());

    fireEvent.click(send);

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(textarea);
  });
});

describe('InputMessage focus on a touch screen', () => {
  // iPad Safari: UA как у Mac, шире 768px, мыши нет
  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('does not open the keyboard after sending with the button', () => {
    const { textarea, onSend } = renderComposer();
    const send = screen.getByLabelText('Отправить');
    act(() => send.focus());

    fireEvent.click(send);

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(document.activeElement).not.toBe(textarea);
  });

  test('closes the keyboard instead of keeping focus after the field is enabled again', () => {
    const { textarea, rerender } = renderComposer();
    act(() => textarea.focus());

    rerender({ disabled: true });
    rerender({ disabled: false });

    expect(document.activeElement).toBe(document.body);
  });
});

describe('InputMessage Enter', () => {
  afterEach(cleanup);

  const reason = 'Сохраняем настройки чата…';

  const renderFocused = (props: InputMessageTestProps = {}) => {
    const rendered = renderComposer(props);
    act(() => rendered.textarea.focus());
    return rendered;
  };

  const pressEnter = (el: HTMLElement, init: KeyboardEventInit = {}) =>
    fireEvent.keyDown(el, { key: 'Enter', ...init });

  test('does not add a line break or send on Enter while sending is unavailable and shows why', () => {
    const { textarea, onSend } = renderFocused({
      sendDisabled: true,
      sendDisabledReason: reason,
    });
    expect(screen.queryByRole('status')).toBeNull();

    const notPrevented = pressEnter(textarea);

    expect(notPrevented).toBe(false);
    expect(onSend).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toBe(reason);
  });

  test('hides the reason and sends once sending is available', () => {
    const { textarea, onSend, rerender } = renderFocused({
      sendDisabled: true,
      sendDisabledReason: reason,
    });
    pressEnter(textarea);

    rerender({ sendDisabled: false });
    expect(screen.queryByRole('status')).toBeNull();
    pressEnter(textarea);

    expect(onSend).toHaveBeenCalledTimes(1);
  });

  test('waits for a new attempt before showing the reason again', () => {
    const { textarea, rerender } = renderFocused({
      sendDisabled: true,
      sendDisabledReason: reason,
    });
    pressEnter(textarea);

    rerender({ sendDisabled: false });
    rerender({ sendDisabled: true });

    expect(screen.queryByRole('status')).toBeNull();
  });

  test('keeps the Ctrl+Enter line break while sending is unavailable', () => {
    const { textarea } = renderFocused({ sendDisabled: true });
    fireEvent.change(textarea, { target: { value: 'Привет' } });

    pressEnter(textarea, { ctrlKey: true });

    expect(textarea.value).toBe('Привет\n');
  });

  test('explains Ctrl+Enter and keeps the Enter line break in Ctrl+Enter mode', () => {
    const { textarea, onSend } = renderFocused({
      messageSubmitKey: 'ctrlEnter',
      sendDisabled: true,
      sendDisabledReason: reason,
    });

    expect(pressEnter(textarea)).toBe(true);
    expect(screen.queryByRole('status')).toBeNull();

    expect(pressEnter(textarea, { ctrlKey: true })).toBe(false);
    expect(onSend).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toBe(reason);
  });

  test('does not send on the Enter that confirms an IME composition', () => {
    const { textarea, onSend } = renderFocused();

    expect(pressEnter(textarea, { isComposing: true })).toBe(true);
    // Safari: композиция уже закончилась, но keyCode у Enter — 229
    expect(pressEnter(textarea, { keyCode: 229 })).toBe(true);

    expect(onSend).not.toHaveBeenCalled();
  });
});

describe('InputMessage sendLoading', () => {
  afterEach(cleanup);

  const reason = 'Отправляем предыдущее сообщение…';

  test('shows a loader and holds sending while the field stays open', () => {
    const { textarea, onSend } = renderComposer({
      sendLoading: true,
      sendDisabledReason: reason,
      voice: true,
      voiceAriaLabel: 'Записать голосовое',
    });
    const send = screen.getByLabelText<HTMLButtonElement>('Отправить');
    const voice =
      screen.getByLabelText<HTMLButtonElement>('Записать голосовое');
    act(() => textarea.focus());

    expect(send.disabled).toBe(true);
    expect(send.getAttribute('aria-busy')).toBe('true');
    expect(voice.disabled).toBe(true);
    expect(textarea.disabled).toBe(false);

    expect(fireEvent.keyDown(textarea, { key: 'Enter' })).toBe(false);
    expect(onSend).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toBe(reason);
  });

  test('sends again once the message is sent', () => {
    const { textarea, onSend, rerender } = renderComposer({
      sendLoading: true,
    });
    act(() => textarea.focus());

    rerender({ sendLoading: false });
    const send = screen.getByLabelText<HTMLButtonElement>('Отправить');

    expect(send.disabled).toBe(false);
    expect(send.hasAttribute('aria-busy')).toBe(false);
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledTimes(1);
  });
});

describe('InputMessage paste', () => {
  afterEach(cleanup);

  test('attaches image copied from browser', async () => {
    const { onFilesChange, textarea } = renderInput();

    const notPrevented = fireEvent.paste(textarea, {
      clipboardData: createClipboardData({
        files: [image],
        data: { 'text/html': '<img src="https://example.com/cat.png">' },
      }),
    });

    expect(notPrevented).toBe(false);
    await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
    expect(onFilesChange.mock.calls[0][0]).toEqual([
      expect.objectContaining({ name: 'image.png', native: image }),
    ]);
  });

  test('keeps default text paste for rich text with preview image', () => {
    const { onFilesChange, textarea } = renderInput();

    const notPrevented = fireEvent.paste(textarea, {
      clipboardData: createClipboardData({
        files: [image],
        data: {
          'text/plain': 'Выручка',
          'text/html': '<p>Выручка</p>',
        },
      }),
    });

    expect(notPrevented).toBe(true);
    expect(onFilesChange).not.toHaveBeenCalled();
  });

  test('ignores pasted files when upload is disabled', () => {
    const { onFilesChange, textarea } = renderInput({
      uploadFileDisabled: true,
    });

    const notPrevented = fireEvent.paste(textarea, {
      clipboardData: createClipboardData({ files: [image] }),
    });

    expect(notPrevented).toBe(true);
    expect(onFilesChange).not.toHaveBeenCalled();
  });
});
