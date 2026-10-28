import React from 'react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
  type Mock,
} from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { collectGarbage } from '@/ui/tests';
import { IInputMessageVoiceFile } from './types';
import { useVoice } from './use-voice';

const getWaveData = vi.fn(async () => ({ waveData: [0.5], duration: 2 }));

vi.mock('@/ui/utils', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/ui/utils')>()),
  getSupportedAudioMimeType: () => 'audio/webm',
  getWaveData: () => getWaveData(),
}));

// В jsdom нет записи звука и URL.createObjectURL: рекордер только меняет
// состояние и отдаёт stop
class FakeMediaRecorder extends EventTarget {
  static instances: FakeMediaRecorder[] = [];

  state: RecordingState = 'inactive';

  resume = vi.fn(() => {
    this.state = 'recording';
  });

  constructor() {
    super();
    FakeMediaRecorder.instances.push(this);
  }

  start() {
    this.state = 'recording';
  }

  pause() {
    this.state = 'paused';
  }

  stop() {
    this.state = 'inactive';
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

const deferred = <T>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

describe('useVoice', () => {
  let track: { stop: ReturnType<typeof vi.fn> };
  let getUserMedia: ReturnType<typeof vi.fn>;
  let createObjectURL: Mock<typeof URL.createObjectURL>;
  let revokeObjectURL: Mock<typeof URL.revokeObjectURL>;

  beforeEach(() => {
    FakeMediaRecorder.instances = [];
    track = { stop: vi.fn() };
    getUserMedia = vi.fn(async () => ({ getTracks: () => [track] }));
    vi.stubGlobal('MediaRecorder', FakeMediaRecorder);
    vi.stubGlobal('navigator', { mediaDevices: { getUserMedia } });
    createObjectURL = vi.fn(() => 'blob:recorded');
    revokeObjectURL = vi.fn<typeof URL.revokeObjectURL>();
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    getWaveData.mockImplementation(async () => ({
      waveData: [0.5],
      duration: 2,
    }));
  });

  const record = async (result: { current: ReturnType<typeof useVoice> }) => {
    await act(() => result.current.handleVoiceRecordStart(pressEvent));
    await act(async () => {
      result.current.handleVoiceRecordEnd();
    });
  };

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

    await act(async () => {
      result.current.handleVoiceRecordEnd();
    });

    await waitFor(() =>
      expect(onVoiceFilesChange).toHaveBeenLastCalledWith([
        returned,
        expect.objectContaining({ src: 'blob:recorded' }),
      ]),
    );
  });

  test('turns the microphone off when released during the permission prompt', async () => {
    const permission = deferred<MediaStream>();
    getUserMedia.mockReturnValue(permission.promise);
    const { result } = renderHook(() => useVoice({}));

    let start!: Promise<void> | void;
    act(() => {
      start = result.current.handleVoiceRecordStart(pressEvent);
    });
    act(() => {
      result.current.handleVoiceRecordEnd();
    });
    await act(async () => {
      permission.resolve({ getTracks: () => [track] } as never);
      await start;
    });

    expect(track.stop).toHaveBeenCalledTimes(1);
    expect(FakeMediaRecorder.instances).toHaveLength(0);
    expect(result.current.isVoiceRecording).toBe(false);
  });

  test('turns the microphone off when unmounted during the permission prompt', async () => {
    const permission = deferred<MediaStream>();
    getUserMedia.mockReturnValue(permission.promise);
    const { result, unmount } = renderHook(() => useVoice({}));

    const start = result.current.handleVoiceRecordStart(pressEvent);
    unmount();
    permission.resolve({ getTracks: () => [track] } as never);
    await start;

    expect(track.stop).toHaveBeenCalledTimes(1);
    expect(FakeMediaRecorder.instances).toHaveLength(0);
  });

  test('handles a denied permission and can start again', async () => {
    getUserMedia.mockRejectedValueOnce(
      new DOMException('Permission denied', 'NotAllowedError'),
    );
    const { result } = renderHook(() => useVoice({}));

    await act(() => result.current.handleVoiceRecordStart(pressEvent));
    expect(result.current.isVoiceRecording).toBe(false);

    await act(() => result.current.handleVoiceRecordStart(pressEvent));
    expect(result.current.isVoiceRecording).toBe(true);
  });

  test('creates one recorder on a double click', async () => {
    const { result } = renderHook(() => useVoice({}));

    await act(() =>
      Promise.all([
        result.current.handleVoiceRecordStart(pressEvent),
        result.current.handleVoiceRecordStart(pressEvent),
      ]),
    );

    expect(getUserMedia).toHaveBeenCalledTimes(1);
    expect(FakeMediaRecorder.instances).toHaveLength(1);
  });

  test('stops the recorder and the microphone on unmount', async () => {
    const onVoiceFilesChange = vi.fn();
    const { result, unmount } = renderHook(() =>
      useVoice({ initialVoiceFiles: [], onVoiceFilesChange }),
    );
    await act(() => result.current.handleVoiceRecordStart(pressEvent));

    unmount();
    await act(async () => {});

    expect(FakeMediaRecorder.instances[0].state).toBe('inactive');
    expect(track.stop).toHaveBeenCalledTimes(1);
    expect(createObjectURL).not.toHaveBeenCalled();
    expect(onVoiceFilesChange).not.toHaveBeenCalled();
  });

  test('resumes a paused recording only once', async () => {
    const { result } = renderHook(() => useVoice({}));
    await act(() => result.current.handleVoiceRecordStart(pressEvent));

    act(() => result.current.handleVoicePause());
    expect(result.current.isVoicePaused).toBe(true);

    act(() => {
      result.current.handleVoiceResume();
      result.current.handleVoiceResume();
    });

    expect(FakeMediaRecorder.instances[0].resume).toHaveBeenCalledTimes(1);
    expect(result.current.isVoicePaused).toBe(false);
  });

  test('counts recording time without pauses', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    try {
      const { result } = renderHook(() => useVoice({}));
      await act(() => result.current.handleVoiceRecordStart(pressEvent));

      vi.advanceTimersByTime(2000);
      act(() => result.current.handleVoicePause());
      vi.advanceTimersByTime(5000);
      act(() => result.current.handleVoiceResume());
      vi.advanceTimersByTime(1000);

      expect(result.current.getVoiceRecordingTime()).toBe(3);
    } finally {
      vi.useRealTimers();
    }
  });

  test('keeps a recording the browser cannot decode', async () => {
    getWaveData.mockRejectedValueOnce(new Error('EncodingError'));
    const { result } = renderHook(() => useVoice({}));

    await record(result);

    await waitFor(() => expect(result.current.voiceFiles).toHaveLength(1));
    expect(result.current.voiceFiles[0].waveData).toHaveLength(30);
    expect(result.current.isVoiceRecording).toBe(false);
  });

  test('revokes the object URL of a deleted voice file', async () => {
    const { result } = renderHook(() => useVoice({}));
    await record(result);
    await waitFor(() => expect(result.current.voiceFiles).toHaveLength(1));

    act(() =>
      result.current.handleVoiceFileDelete(result.current.voiceFiles[0]),
    );

    expect(result.current.voiceFiles).toHaveLength(0);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:recorded');
  });

  test('keeps object URLs of sent voice files and revokes unsent ones on unmount', async () => {
    const { result, unmount } = renderHook(() => useVoice({}));
    await record(result);
    await waitFor(() => expect(result.current.voiceFiles).toHaveLength(1));

    // Отправка: файлы ушли потребителю, URL ему ещё нужен
    act(() => result.current.setVoiceFiles([]));
    expect(revokeObjectURL).not.toHaveBeenCalled();

    createObjectURL.mockReturnValue('blob:unsent');
    await record(result);
    await waitFor(() => expect(result.current.voiceFiles).toHaveLength(1));

    unmount();

    expect(revokeObjectURL).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:unsent');
  });

  test('does not revoke voice files the parent controls on unmount', async () => {
    const onVoiceFilesChange = vi.fn();
    const { result, rerender, unmount } = renderHook(
      ({ voiceFiles }) =>
        useVoice({ initialVoiceFiles: voiceFiles, onVoiceFilesChange }),
      { initialProps: { voiceFiles: [] as IInputMessageVoiceFile[] } },
    );
    await record(result);
    await waitFor(() => expect(onVoiceFilesChange).toHaveBeenCalled());
    rerender({ voiceFiles: onVoiceFilesChange.mock.lastCall?.[0] });

    unmount();

    expect(revokeObjectURL).not.toHaveBeenCalled();
  });

  test('leaves a deleted parent voice file to the parent until nothing holds it', async () => {
    const onVoiceFilesChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ voiceFiles }) =>
        useVoice({ initialVoiceFiles: voiceFiles, onVoiceFilesChange }),
      { initialProps: { voiceFiles: [] as IInputMessageVoiceFile[] } },
    );
    await record(result);
    await waitFor(() => expect(onVoiceFilesChange).toHaveBeenCalled());
    const [recorded] = onVoiceFilesChange.mock.lastCall?.[0] ?? [];
    rerender({ voiceFiles: [recorded] });

    // Родитель мог оставить запись себе, например, для повтора отправки
    act(() => result.current.handleVoiceFileDelete(recorded));
    expect(revokeObjectURL).not.toHaveBeenCalled();

    collectGarbage(recorded.blob);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:recorded');
  });
});
