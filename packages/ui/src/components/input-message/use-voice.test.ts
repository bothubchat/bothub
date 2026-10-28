import React from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { IInputMessageVoiceFile } from './types';
import { useVoice } from './use-voice';

vi.mock('@/ui/utils', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/ui/utils')>()),
  getSupportedAudioMimeType: () => 'audio/webm',
  getWaveData: async () => ({ waveData: [0.5], duration: 2 }),
}));

// В jsdom нет записи звука и URL.createObjectURL: рекордер только отдаёт stop
class FakeMediaRecorder extends EventTarget {
  start() {}

  stop() {
    this.dispatchEvent(new Event('stop'));
  }
}

const voiceFile = (src: string): IInputMessageVoiceFile => ({
  src,
  duration: 3,
  waveData: [0.2],
  blob: new Blob(['voice'], { type: 'audio/webm' }),
});

const pressEvent = { stopPropagation: () => {} } as React.SyntheticEvent;

describe('useVoice', () => {
  beforeEach(() => {
    vi.stubGlobal('MediaRecorder', FakeMediaRecorder);
    vi.stubGlobal('navigator', {
      mediaDevices: { getUserMedia: async () => ({ getTracks: () => [] }) },
    });
    URL.createObjectURL = () => 'blob:recorded';
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test('keeps voice files the parent returned while recording', async () => {
    const returned = voiceFile('blob:returned');
    const onVoiceFilesChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ voiceFiles }) =>
        useVoice({ initialVoiceFiles: voiceFiles, onVoiceFilesChange }),
      { initialProps: { voiceFiles: [] as IInputMessageVoiceFile[] } },
    );

    await act(() => result.current.handleVoiceRecordStart(pressEvent));

    // Отправка не удалась, пока шла запись, — родитель вернул голосовое
    rerender({ voiceFiles: [returned] });

    await act(() => result.current.handleVoiceRecordEnd());

    await waitFor(() =>
      expect(onVoiceFilesChange).toHaveBeenLastCalledWith([
        returned,
        expect.objectContaining({ src: 'blob:recorded' }),
      ]),
    );
  });
});
