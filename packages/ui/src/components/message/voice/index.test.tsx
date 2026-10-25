import React from 'react';
import {
  describe,
  test,
  expect,
  vi,
  beforeEach,
  afterEach,
  type MockInstance,
} from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { TestProvider } from '@/ui/tests/TestProvider';
import { MessageVoice, MessageVoiceProps } from '.';

const WAVE_DATA = [10, 50, 90];

const voice = (props: Partial<MessageVoiceProps> = {}) => (
  <MessageVoice
    src="https://cdn.bothub.chat/voice.webm"
    waveData={WAVE_DATA}
    duration={6}
    disableTranscription
    {...props}
  />
);

const getAudio = (container: HTMLElement) =>
  container.querySelector('audio') as HTMLAudioElement;

const clickToggle = async () => {
  await act(async () => {
    fireEvent.click(screen.getAllByRole('button')[0]);
  });
};

describe('MessageVoice', () => {
  let play: MockInstance<HTMLMediaElement['play']>;
  let pause: MockInstance<HTMLMediaElement['pause']>;

  beforeEach(() => {
    play = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockResolvedValue(undefined);
    pause = vi
      .spyOn(HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {});
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('plays without checkAlive', async () => {
    const { container } = customRender(voice());
    fireEvent.canPlayThrough(getAudio(container));

    await clickToggle();

    expect(play).toHaveBeenCalledTimes(1);
  });

  test('plays before the audio is buffered', async () => {
    customRender(voice());

    await clickToggle();

    expect(play).toHaveBeenCalledTimes(1);
  });

  test('does not play while loading is controlled from outside', async () => {
    customRender(voice({ isLoading: true }));

    await clickToggle();

    expect(play).not.toHaveBeenCalled();
  });

  test('calls play synchronously even when checkAlive is async', async () => {
    const checkAlive = vi.fn(() => new Promise<boolean>(() => {}));
    customRender(voice({ checkAlive }));

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(play).toHaveBeenCalledTimes(1);
    expect(checkAlive).toHaveBeenCalledTimes(1);
  });

  test('refreshes a dead src and resumes playback with the new one', async () => {
    const refreshSrc = vi.fn();
    const checkAlive = vi.fn().mockResolvedValue(false);
    const { rerender } = customRender(voice({ checkAlive, refreshSrc }));

    await clickToggle();

    expect(pause).toHaveBeenCalled();
    expect(refreshSrc).toHaveBeenCalledTimes(1);

    play.mockClear();
    rerender(
      <TestProvider>
        {voice({
          checkAlive,
          refreshSrc,
          src: 'https://cdn.bothub.chat/voice-new.webm',
        })}
      </TestProvider>,
    );

    expect(play).toHaveBeenCalledTimes(1);
  });

  test('refreshes src after a load error instead of staying in loading', async () => {
    const refreshSrc = vi.fn();
    const { container } = customRender(voice({ refreshSrc }));
    const audio = getAudio(container);

    Object.defineProperty(audio, 'error', {
      configurable: true,
      value: { code: 2 },
    });
    fireEvent.error(audio);

    await clickToggle();

    expect(refreshSrc).toHaveBeenCalledTimes(1);
    expect(play).not.toHaveBeenCalled();
  });

  test('does not refresh in a loop when the new src fails too', async () => {
    const refreshSrc = vi.fn();
    const { container, rerender } = customRender(voice({ refreshSrc }));

    await clickToggle();
    fireEvent.error(getAudio(container));
    expect(refreshSrc).toHaveBeenCalledTimes(1);

    rerender(
      <TestProvider>
        {voice({ refreshSrc, src: 'https://cdn.bothub.chat/voice-new.webm' })}
      </TestProvider>,
    );
    fireEvent.error(getAudio(container));

    expect(refreshSrc).toHaveBeenCalledTimes(1);
  });

  test('handles a rejected play() without an unhandled rejection', async () => {
    play.mockRejectedValue(new DOMException('blocked', 'NotAllowedError'));
    customRender(voice());

    await clickToggle();

    expect(play).toHaveBeenCalledTimes(1);
  });

  test('pauses the voice that is playing when another one starts', async () => {
    const { container } = customRender(
      <>
        {voice()}
        {voice({ src: 'https://cdn.bothub.chat/other.webm' })}
      </>,
    );
    const [, playingAudio] = container.querySelectorAll('audio');
    Object.defineProperty(playingAudio, 'paused', {
      configurable: true,
      value: false,
    });

    await clickToggle();

    expect(pause.mock.contexts).toEqual([playingAudio]);
  });
});

describe('MessageVoice progress', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const timeUpdate = (audio: HTMLAudioElement, currentTime: number) => {
    Object.defineProperty(audio, 'currentTime', {
      configurable: true,
      value: currentTime,
    });
    fireEvent.timeUpdate(audio);
  };

  const waves = (container: HTMLElement) =>
    container.querySelector<SVGSVGElement>('svg[viewBox^="0 0 145 "]');

  const progress = (container: HTMLElement) =>
    waves(container)?.style.getPropertyValue('--voice-progress');

  test('moves progress without re-rendering on every timeupdate', () => {
    let commits = 0;
    const { container } = customRender(
      <React.Profiler
        id="voice"
        onRender={(_, phase) => {
          if (phase !== 'mount') commits++;
        }}
      >
        {voice()}
      </React.Profiler>,
    );
    const audio = getAudio(container);

    timeUpdate(audio, 0.25);
    commits = 0;
    timeUpdate(audio, 0.5);
    timeUpdate(audio, 0.75);

    expect(commits).toBe(0);
    expect(progress(container)).toBe(String(0.75 / 6));
    expect(screen.getByText('00:00')).toBeTruthy();

    timeUpdate(audio, 1.25);

    expect(commits).toBe(1);
    expect(screen.getByText('00:01')).toBeTruthy();
  });

  test('keeps progress at zero when the duration is unknown', () => {
    const { container } = customRender(voice({ duration: 0 }));

    timeUpdate(getAudio(container), 2);

    expect(progress(container)).toBe('0');
  });

  test('scales wave bars to the height', () => {
    const { container } = customRender(voice({ height: 18 }));

    const heights = [
      ...(waves(container)?.querySelectorAll('clipPath rect') ?? []),
    ].map((rect) => Number(rect.getAttribute('height')));

    expect(heights).toEqual([2, 9, 16.2]);
  });
});
