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
