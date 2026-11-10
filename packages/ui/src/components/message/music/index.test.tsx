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
import { MessageMusic, MessageMusicProps } from '.';

const music = (props: Partial<MessageMusicProps> = {}) => (
  <MessageMusic
    src="https://cdn.bothub.chat/song.mp3"
    title="Song"
    {...props}
  />
);

const getAudio = (container: HTMLElement) =>
  container.querySelector('audio') as HTMLAudioElement;

const loadMetadata = (container: HTMLElement) => {
  const audio = getAudio(container);
  Object.defineProperty(audio, 'duration', {
    configurable: true,
    value: 120,
  });
  fireEvent.loadedMetadata(audio);
};

const playButton = () => screen.getByRole('button', { name: 'Play' });

const clickPlay = async () => {
  await act(async () => {
    fireEvent.click(playButton());
  });
};

describe('MessageMusic', () => {
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

  test('calls play synchronously even when checkAlive is async', () => {
    const checkAlive = vi.fn(() => new Promise<boolean>(() => {}));
    const { container } = customRender(music({ checkAlive }));
    loadMetadata(container);

    fireEvent.click(playButton());

    expect(play).toHaveBeenCalledTimes(1);
    expect(checkAlive).toHaveBeenCalledTimes(1);
  });

  test('refreshes a dead src and resumes playback with the new one', async () => {
    const refreshSrc = vi.fn();
    const checkAlive = vi.fn().mockResolvedValue(false);
    const { container, rerender } = customRender(
      music({ checkAlive, refreshSrc }),
    );
    loadMetadata(container);

    await clickPlay();

    expect(pause).toHaveBeenCalled();
    expect(refreshSrc).toHaveBeenCalledTimes(1);

    play.mockClear();
    rerender(
      <TestProvider>
        {music({
          checkAlive,
          refreshSrc,
          src: 'https://cdn.bothub.chat/song-new.mp3',
        })}
      </TestProvider>,
    );

    expect(play).toHaveBeenCalledTimes(1);
  });

  test('handles a rejected play() without an unhandled rejection', async () => {
    play.mockRejectedValue(new DOMException('blocked', 'NotAllowedError'));
    const { container } = customRender(music());
    loadMetadata(container);

    await clickPlay();

    expect(play).toHaveBeenCalledTimes(1);
    expect(playButton()).toBeTruthy();
  });

  test('leaves the skeleton and refreshes the src after a load error', async () => {
    const refreshSrc = vi.fn();
    const { container } = customRender(music({ refreshSrc }));
    const audio = getAudio(container);
    expect(screen.queryByRole('button', { name: 'Play' })).toBeNull();

    Object.defineProperty(audio, 'error', {
      configurable: true,
      value: { code: 2 },
    });
    fireEvent.error(audio);

    expect(playButton()).toBeTruthy();

    await clickPlay();

    expect(refreshSrc).toHaveBeenCalledTimes(1);
    expect(play).not.toHaveBeenCalled();
  });
});
