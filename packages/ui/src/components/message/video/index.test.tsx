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
import { MessageVideo, MessageVideoProps } from '.';

const DURATION = 600;

const video = (props: Partial<MessageVideoProps> = {}) => (
  <MessageVideo
    src="https://cdn.bothub.chat/video.mp4"
    {...props}
  />
);

const setTime = (videoEl: HTMLVideoElement, currentTime: number) => {
  Object.defineProperty(videoEl, 'currentTime', {
    configurable: true,
    writable: true,
    value: currentTime,
  });
};

const defineValue = (
  videoEl: HTMLVideoElement,
  name: keyof HTMLVideoElement,
  value: unknown,
) => {
  Object.defineProperty(videoEl, name, { configurable: true, value });
};

const renderReady = (
  props: Partial<MessageVideoProps> = {},
  onCommit?: () => void,
  size: { width: number; height: number } = { width: 1920, height: 1080 },
) => {
  const result = customRender(
    <React.Profiler
      id="video"
      onRender={(_, phase) => {
        if (phase !== 'mount') onCommit?.();
      }}
    >
      {video(props)}
    </React.Profiler>,
  );
  const videoEl = result.container.querySelector('video') as HTMLVideoElement;
  defineValue(videoEl, 'duration', DURATION);
  defineValue(videoEl, 'videoWidth', size.width);
  defineValue(videoEl, 'videoHeight', size.height);
  setTime(videoEl, 0);
  fireEvent.loadedMetadata(videoEl);

  const playerEl = videoEl.parentElement as HTMLElement;

  return { ...result, videoEl, playerEl };
};

const progressOf = (playerEl: HTMLElement) =>
  playerEl.style.getPropertyValue('--video-progress');

describe('MessageVideo', () => {
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

  test('moves progress without new classes or re-renders', () => {
    let commits = 0;
    const { videoEl, playerEl } = renderReady({}, () => {
      commits++;
    });
    const { className } = playerEl;
    const styleText = () =>
      [...document.querySelectorAll('style')]
        .map((style) => style.textContent)
        .join('');
    const css = styleText();

    commits = 0;
    for (let time = 0.25; time < 1; time += 0.25) {
      setTime(videoEl, time);
      fireEvent.timeUpdate(videoEl);
    }

    expect(playerEl.className).toBe(className);
    expect(styleText()).toBe(css);
    expect(progressOf(playerEl)).toBe(String(0.75 / DURATION));
    expect(commits).toBe(0);
    expect(screen.getByText('0:00 / 10:00')).toBeTruthy();

    setTime(videoEl, 61);
    fireEvent.timeUpdate(videoEl);

    expect(screen.getByText('1:01 / 10:00')).toBeTruthy();
    expect((screen.getByLabelText('Перемотка') as HTMLInputElement).value).toBe(
      '61',
    );
  });

  test('seeks with the timeline input', () => {
    const { videoEl, playerEl } = renderReady();
    const seek = screen.getByLabelText('Перемотка') as HTMLInputElement;

    expect(seek.getAttribute('aria-valuetext')).toBe('0:00 / 10:00');

    fireEvent.change(seek, { target: { value: '150' } });

    expect(videoEl.currentTime).toBe(150);
    expect(progressOf(playerEl)).toBe('0.25');
    expect(screen.getByText('2:30 / 10:00')).toBeTruthy();
  });

  test('plays, seeks and mutes from the keyboard', () => {
    const { videoEl, playerEl } = renderReady();

    fireEvent.keyDown(playerEl, { key: ' ', code: 'Space' });
    expect(play).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(playerEl, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(videoEl.currentTime).toBe(5);

    fireEvent.keyDown(playerEl, { key: '5', code: 'Digit5' });
    expect(videoEl.currentTime).toBe(DURATION / 2);

    // The key's place, not its letter: "ь" is M in the Russian layout.
    fireEvent.keyDown(playerEl, { key: 'ь', code: 'KeyM' });
    expect(videoEl.muted).toBe(true);

    fireEvent.keyDown(playerEl, { key: 'ArrowRight', ctrlKey: true });
    expect(videoEl.currentTime).toBe(DURATION / 2);
  });

  test('leaves Space to a focused button', () => {
    renderReady();
    const fullscreen = screen.getByRole('button', { name: 'Во весь экран' });

    fireEvent.keyDown(fullscreen, { key: ' ', code: 'Space' });

    expect(play).not.toHaveBeenCalled();
  });

  test('sets the volume from the slider and mutes from the icon', () => {
    const { videoEl } = renderReady();

    fireEvent.change(screen.getByLabelText('Громкость'), {
      target: { value: '40' },
    });
    expect(videoEl.volume).toBe(0.4);
    expect(videoEl.muted).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: 'Выключить звук' }));
    expect(videoEl.muted).toBe(true);
    expect((screen.getByLabelText('Громкость') as HTMLInputElement).value).toBe(
      '0',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Включить звук' }));
    expect(videoEl.muted).toBe(false);
    expect(videoEl.volume).toBe(0.4);
  });

  test('picks a playback rate from the menu', () => {
    const { videoEl } = renderReady();

    fireEvent.click(screen.getByRole('button', { name: /^Скорость 1×$/ }));
    const faster = screen.getByRole('menuitemradio', { name: /^1[.,]5×$/ });
    fireEvent.click(faster);

    expect(videoEl.playbackRate).toBe(1.5);
    expect(screen.queryByRole('menu')).toBeNull();
    expect(
      screen.getByRole('button', { name: /^Скорость 1[.,]5×$/ }),
    ).toBeTruthy();
  });

  test('closes the rate menu on Escape without seeking', () => {
    const { videoEl } = renderReady();

    fireEvent.click(screen.getByRole('button', { name: /^Скорость/ }));
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'ArrowRight', code: 'ArrowRight' });
    fireEvent.keyDown(menu, { key: 'Escape', code: 'Escape' });

    expect(videoEl.currentTime).toBe(0);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  test('takes the proportions of a vertical video', () => {
    const { playerEl } = renderReady({}, undefined, {
      width: 1080,
      height: 1920,
    });

    expect(playerEl.style.getPropertyValue('--video-aspect')).toBe(
      String(1080 / 1920),
    );
  });

  test('shows the error with a retry that asks for a new src', () => {
    const refreshSrc = vi.fn();
    const { videoEl } = renderReady({ refreshSrc });
    defineValue(videoEl, 'error', { code: 4 });

    fireEvent.error(videoEl);

    expect(screen.getByRole('alert').textContent).toContain(
      'Не удалось загрузить видео',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Повторить' }));

    expect(refreshSrc).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  test('takes custom labels', () => {
    renderReady({ labels: { player: 'Video player', seek: 'Seek' } });

    expect(screen.getByRole('group', { name: 'Video player' })).toBeTruthy();
    expect(screen.getByLabelText('Seek')).toBeTruthy();
  });

  test('calls play synchronously even when checkAlive is async', () => {
    const checkAlive = vi.fn(() => new Promise<boolean>(() => {}));
    const { videoEl } = renderReady({ checkAlive });

    fireEvent.click(videoEl);

    expect(play).toHaveBeenCalledTimes(1);
    expect(checkAlive).toHaveBeenCalledTimes(1);
  });

  test('refreshes a dead src and resumes playback with the new one', async () => {
    const refreshSrc = vi.fn();
    const checkAlive = vi.fn().mockResolvedValue(false);
    const { videoEl, rerender } = renderReady({ checkAlive, refreshSrc });

    await act(async () => {
      fireEvent.click(videoEl);
    });

    expect(pause).toHaveBeenCalled();
    expect(refreshSrc).toHaveBeenCalledTimes(1);

    play.mockClear();
    rerender(
      <TestProvider>
        <React.Profiler
          id="video"
          onRender={() => {}}
        >
          {video({
            checkAlive,
            refreshSrc,
            src: 'https://cdn.bothub.chat/video-new.mp4',
          })}
        </React.Profiler>
      </TestProvider>,
    );

    expect(play).toHaveBeenCalledTimes(1);
  });

  test('handles a rejected play() without an unhandled rejection', async () => {
    play.mockRejectedValue(new DOMException('blocked', 'NotAllowedError'));
    const { videoEl } = renderReady();

    await act(async () => {
      fireEvent.click(videoEl);
    });

    expect(play).toHaveBeenCalledTimes(1);
  });
});
