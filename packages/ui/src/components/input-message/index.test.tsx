import React, { useState } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import { createClipboardData, customRender, TestProvider } from '@/ui/tests';
import { IInputMessageFile, InputMessage } from '.';

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

  const status = () => screen.getByRole('status');

  test('does not add a line break or send on Enter while sending is unavailable and shows why', () => {
    const { textarea, onSend } = renderFocused({
      sendDisabled: true,
      sendDisabledReason: reason,
    });
    // Диктор объявляет текст, появившийся в уже смонтированном live region
    const region = status();
    expect(region.textContent).toBe('');

    const notPrevented = pressEnter(textarea);

    expect(notPrevented).toBe(false);
    expect(onSend).not.toHaveBeenCalled();
    expect(status()).toBe(region);
    expect(region.textContent).toBe(reason);
  });

  test('announces the reason again on a repeated attempt', () => {
    const { textarea } = renderFocused({
      sendDisabled: true,
      sendDisabledReason: reason,
    });
    pressEnter(textarea);
    const announced = status().firstChild;

    pressEnter(textarea);

    expect(status().firstChild).not.toBe(announced);
    expect(status().textContent).toBe(reason);
  });

  test('hides the reason and sends once sending is available', () => {
    const { textarea, onSend, rerender } = renderFocused({
      sendDisabled: true,
      sendDisabledReason: reason,
    });
    pressEnter(textarea);

    rerender({ sendDisabled: false });
    expect(status().textContent).toBe('');
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

    expect(status().textContent).toBe('');
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
    expect(status().textContent).toBe('');

    expect(pressEnter(textarea, { ctrlKey: true })).toBe(false);
    expect(onSend).not.toHaveBeenCalled();
    expect(status().textContent).toBe(reason);
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

const pdf = (name = 'doc.pdf', content = 'pdf') =>
  new File([content], name, { type: 'application/pdf' });

const drop = (target: HTMLElement, files: File[]) =>
  fireEvent.drop(target, { dataTransfer: { files } });

const chipNames = () =>
  screen
    .queryAllByLabelText('Удалить файл')
    .map((button) => button.parentElement?.textContent);

describe('InputMessage files', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const ControlledFiles = (
    props: Partial<React.ComponentProps<typeof InputMessage>>,
  ) => {
    const [files, setFiles] = useState<IInputMessageFile[]>([]);

    return (
      <InputMessage
        placeholder="Сообщение"
        deleteFileAriaLabel="Удалить файл"
        files={files}
        onFilesChange={setFiles}
        {...props}
      />
    );
  };

  test.each([
    [
      'uncontrolled',
      <InputMessage
        placeholder="Сообщение"
        deleteFileAriaLabel="Удалить файл"
      />,
    ],
    ['controlled', <ControlledFiles />],
  ])('keeps files of two quick drops (%s)', async (_, element) => {
    customRender(element);
    const textarea = screen.getByPlaceholderText('Сообщение');

    drop(textarea, [pdf('one.pdf')]);
    drop(textarea, [pdf('two.pdf')]);

    await waitFor(() => expect(chipNames()).toEqual(['one.pdf', 'two.pdf']));
  });

  test('validates dropped files against uploadFileAccept', async () => {
    const emitError = vi.fn();
    const onFilesChange = vi.fn();
    const script = new File(['x'], 'run.exe', {
      type: 'application/x-msdownload',
    });
    customRender(
      <InputMessage
        placeholder="Сообщение"
        uploadFileAccept="application/pdf"
        emitError={emitError}
        files={[]}
        onFilesChange={onFilesChange}
      />,
    );

    drop(screen.getByPlaceholderText('Сообщение'), [pdf(), script]);

    await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
    expect(onFilesChange.mock.calls[0][0]).toEqual([
      expect.objectContaining({ name: 'doc.pdf' }),
    ]);
    expect(emitError).toHaveBeenCalledWith({
      name: 'WRONG_FILES',
      payload: [script],
    });
  });

  test('accepts files by extension like the accept attribute', async () => {
    const onFilesChange = vi.fn();
    const { container } = customRender(
      <InputMessage
        uploadFileAccept=".pdf, image/*"
        files={[]}
        onFilesChange={onFilesChange}
      />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { files: [pdf('report.PDF')] } });

    await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
    expect(onFilesChange.mock.calls[0][0]).toEqual([
      expect.objectContaining({ name: 'report.PDF' }),
    ]);
  });

  test('keeps two pasted screenshots with the same name', async () => {
    customRender(<ControlledFiles />);
    const textarea = screen.getByPlaceholderText('Сообщение');
    const screenshot = (content: string) =>
      new File([content], 'image.png', { type: 'image/png' });

    fireEvent.paste(textarea, {
      clipboardData: createClipboardData({ files: [screenshot('first')] }),
    });
    await waitFor(() => expect(chipNames()).toHaveLength(1));
    fireEvent.paste(textarea, {
      clipboardData: createClipboardData({ files: [screenshot('second!')] }),
    });

    await waitFor(() => expect(chipNames()).toHaveLength(2));
  });

  test('does not add the same file twice', async () => {
    customRender(<ControlledFiles />);
    const textarea = screen.getByPlaceholderText('Сообщение');
    const file = pdf();

    drop(textarea, [file, file]);
    await waitFor(() => expect(chipNames()).toHaveLength(1));
    drop(textarea, [file]);

    await act(async () => {});
    expect(chipNames()).toEqual(['doc.pdf']);
  });

  test('attaches an image even when its preview cannot be read', async () => {
    vi.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(
      function fail(this: FileReader) {
        this.dispatchEvent(new ProgressEvent('error'));
      },
    );
    const onFilesChange = vi.fn();
    customRender(
      <InputMessage
        placeholder="Сообщение"
        files={[]}
        onFilesChange={onFilesChange}
      />,
    );

    drop(screen.getByPlaceholderText('Сообщение'), [image]);

    await waitFor(() =>
      expect(onFilesChange).toHaveBeenCalledWith([
        expect.objectContaining({ name: 'image.png', previewUrl: null }),
      ]),
    );
  });

  test('does not echo controlled files back to the parent', () => {
    const onFilesChange = vi.fn();
    const element = (files: IInputMessageFile[]) => (
      <InputMessage
        files={files}
        onFilesChange={onFilesChange}
      />
    );
    const { rerender } = customRender(element([]));

    rerender(
      <TestProvider>
        {element([{ name: 'doc.pdf', previewUrl: null, native: pdf() }])}
      </TestProvider>,
    );

    expect(onFilesChange).not.toHaveBeenCalled();
  });
});

describe('InputMessage keyboard', () => {
  afterEach(cleanup);

  const renderKeyboard = (
    props: Partial<React.ComponentProps<typeof InputMessage>> = {},
  ) => {
    const onSend = vi.fn();
    customRender(
      <InputMessage
        placeholder="Сообщение"
        onSend={onSend}
        {...props}
      />,
    );

    return { onSend, textarea: screen.getByPlaceholderText('Сообщение') };
  };

  test('calls the consumer onKeyDown', () => {
    const onKeyDown = vi.fn();
    const { textarea } = renderKeyboard({ onKeyDown });

    fireEvent.keyDown(textarea, { key: 'a' });
    fireEvent.keyDown(textarea, { key: 'Enter' });

    expect(onKeyDown).toHaveBeenCalledTimes(2);
  });

  test('stops propagation only of the handled Enter', () => {
    const documentKeyDown = vi.fn();
    document.addEventListener('keydown', documentKeyDown);
    const { onSend, textarea } = renderKeyboard();

    fireEvent.keyDown(textarea, { key: 'Escape' });
    expect(documentKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(documentKeyDown).toHaveBeenCalledTimes(1);

    document.removeEventListener('keydown', documentKeyDown);
  });

  test('lets the consumer cancel sending with preventDefault', () => {
    const { onSend, textarea } = renderKeyboard({
      onKeyDown: (event) => event.preventDefault(),
    });

    fireEvent.keyDown(textarea, { key: 'Enter' });

    expect(onSend).not.toHaveBeenCalled();
  });

  test('sends with Ctrl+Enter when messageSubmitKey is ctrlEnter', () => {
    const { onSend, textarea } = renderKeyboard({
      messageSubmitKey: 'ctrlEnter',
    });

    const enterNotPrevented = fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(enterNotPrevented).toBe(true);
    expect(onSend).not.toHaveBeenCalled();

    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onSend).toHaveBeenCalledTimes(1);
  });

  test('does not send while IME composition is confirmed', () => {
    const { onSend, textarea } = renderKeyboard();

    fireEvent.keyDown(textarea, { key: 'Enter', isComposing: true });

    expect(onSend).not.toHaveBeenCalled();
  });

  test('switches between controlled and uncontrolled message', () => {
    const element = (message?: string) => (
      <InputMessage
        placeholder="Сообщение"
        message={message}
        onChange={() => {}}
      />
    );
    const { rerender } = customRender(element('controlled'));
    const textarea = screen.getByPlaceholderText(
      'Сообщение',
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe('controlled');

    rerender(<TestProvider>{element(undefined)}</TestProvider>);
    fireEvent.change(textarea, { target: { value: 'own' } });

    expect(textarea.value).toBe('own');
  });
});

describe('InputMessage textarea height', () => {
  const LINE_HEIGHT = 23;

  beforeEach(() => {
    // jsdom не считает layout: строка на каждые 40 символов
    vi.spyOn(
      HTMLTextAreaElement.prototype,
      'scrollHeight',
      'get',
    ).mockImplementation(function scrollHeight(this: HTMLTextAreaElement) {
      return LINE_HEIGHT * Math.max(1, Math.ceil(this.value.length / 40));
    });
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('grows with the text in a single commit per keystroke', () => {
    let commits = 0;
    customRender(
      <React.Profiler
        id="input"
        onRender={(_, phase) => {
          if (phase !== 'mount') commits++;
        }}
      >
        <InputMessage placeholder="Сообщение" />
      </React.Profiler>,
    );
    const textarea = screen.getByPlaceholderText('Сообщение');
    expect(textarea.style.height).toBe(`${LINE_HEIGHT}px`);

    commits = 0;
    fireEvent.change(textarea, { target: { value: 'a'.repeat(50) } });

    expect(textarea.style.height).toBe(`${LINE_HEIGHT * 2}px`);
    expect(commits).toBe(1);
  });

  test('sizes a textarea that mounts again', () => {
    const element = (textAreaDisabled: boolean) => (
      <InputMessage
        placeholder="Сообщение"
        message={'a'.repeat(90)}
        textAreaDisabled={textAreaDisabled}
      />
    );
    const { rerender, container } = customRender(element(false));

    rerender(<TestProvider>{element(true)}</TestProvider>);
    rerender(<TestProvider>{element(false)}</TestProvider>);

    expect(container.querySelector('textarea')?.style.height).toBe(
      `${LINE_HEIGHT * 3}px`,
    );
  });
});

describe('InputMessage send', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const renderSend = (
    props: Partial<React.ComponentProps<typeof InputMessage>> = {},
  ) => {
    const onSend = vi.fn();
    customRender(
      <InputMessage
        placeholder="Сообщение"
        sendAriaLabel="Отправить"
        onSend={onSend}
        {...props}
      />,
    );

    return {
      onSend,
      textarea: screen.getByPlaceholderText('Сообщение') as HTMLTextAreaElement,
    };
  };

  test.each([
    [
      'Enter',
      (textarea: HTMLElement) => fireEvent.keyDown(textarea, { key: 'Enter' }),
    ],
    ['send button', () => fireEvent.click(screen.getByLabelText('Отправить'))],
  ])('%s sends and clears an uncontrolled message', (_, submit) => {
    const { onSend, textarea } = renderSend();

    fireEvent.change(textarea, { target: { value: 'Привет' } });
    submit(textarea);

    expect(onSend).toHaveBeenCalledWith('Привет', []);
    expect(textarea.value).toBe('');
  });

  test('Enter asks the parent to clear message, files and voice files', () => {
    const onChange = vi.fn();
    const onFilesChange = vi.fn();
    const onVoiceFilesChange = vi.fn();
    const files = [{ name: 'doc.pdf', previewUrl: null, native: pdf() }];
    const { onSend, textarea } = renderSend({
      message: 'Привет',
      onChange,
      files,
      onFilesChange,
      voiceFiles: [voiceFile('blob:one')],
      onVoiceFilesChange,
    });

    fireEvent.keyDown(textarea, { key: 'Enter' });

    expect(onSend).toHaveBeenCalledWith('Привет', files);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onFilesChange).toHaveBeenCalledWith([]);
    expect(onVoiceFilesChange).toHaveBeenCalledWith([]);
  });

  test('does not pass InputMessage-only props to the textarea', () => {
    const consoleError = vi.spyOn(console, 'error');
    const { textarea } = renderSend({
      uploadFileText: 'Загрузить',
      configureOptions: [],
      name: 'message',
    });

    expect(textarea.getAttribute('name')).toBe('message');
    expect(textarea.hasAttribute('uploadfiletext')).toBe(false);
    expect(textarea.hasAttribute('configureoptions')).toBe(false);
    expect(consoleError).not.toHaveBeenCalled();
  });
});

describe('InputMessage voice recording', () => {
  class FakeMediaRecorder extends EventTarget {
    static isTypeSupported = () => true;

    state: RecordingState = 'inactive';

    start() {
      this.state = 'recording';
    }

    pause() {
      this.state = 'paused';
    }

    resume() {
      this.state = 'recording';
    }

    stop() {
      this.state = 'inactive';
    }
  }

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    vi.stubGlobal('MediaRecorder', FakeMediaRecorder);
    vi.stubGlobal('navigator', {
      userAgent: 'jsdom',
      mediaDevices: { getUserMedia: async () => ({ getTracks: () => [] }) },
    });
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  test('shows the recording time and stops it on pause', async () => {
    customRender(
      <InputMessage
        voice
        voiceAriaLabel="Записать"
        pauseVoiceAriaLabel="Пауза"
      />,
    );

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Записать'));
    });
    expect(screen.getByText('00:00')).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByText('00:02')).toBeTruthy();

    fireEvent.click(screen.getByLabelText('Пауза'));
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('00:02')).toBeTruthy();
  });
});
