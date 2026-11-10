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

const renderReady = (
  props: Partial<MessageVideoProps> = {},
  onCommit?: () => void,
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
  Object.defineProperty(videoEl, 'duration', {
    configurable: true,
    value: DURATION,
  });
  setTime(videoEl, 0);
  fireEvent.loadedMetadata(videoEl);

  const playerEl = videoEl.parentElement as HTMLElement;
  const controls = playerEl.children[1] as HTMLElement;
  const timeLine = controls.children[0] as HTMLElement;
  const volumeLine = controls.children[1].children[1]
    .children[1] as HTMLElement;

  return { ...result, videoEl, playerEl, timeLine, volumeLine };
};

const mockRect = (element: HTMLElement, left: number, width: number) => {
  element.getBoundingClientRect = () =>
    ({
      left,
      width,
      top: 0,
      height: 6,
      right: left + width,
      bottom: 6,
    }) as DOMRect;
};

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
    const { videoEl, timeLine } = renderReady({}, () => {
      commits++;
    });
    const { className } = timeLine;
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

    expect(timeLine.className).toBe(className);
    expect(styleText()).toBe(css);
    expect(timeLine.style.getPropertyValue('--video-progress')).toBe(
      String(0.75 / DURATION),
    );
    expect(commits).toBe(0);
    expect(screen.getByText('00:00 / 10:00')).toBeTruthy();

    setTime(videoEl, 61);
    fireEvent.timeUpdate(videoEl);

    expect(screen.getByText('01:01 / 10:00')).toBeTruthy();
  });

  test('seeks by the timeline position while scrubbing over the player', () => {
    const { videoEl, playerEl, timeLine } = renderReady();
    mockRect(playerEl, 0, 640);
    mockRect(timeLine, 100, 400);

    fireEvent.mouseDown(timeLine);
    fireEvent.mouseMove(playerEl, { clientX: 200 });

    expect(videoEl.currentTime).toBe(DURATION / 4);
    expect(timeLine.style.getPropertyValue('--video-progress')).toBe('0.25');

    fireEvent.mouseMove(playerEl, { clientX: 600 });
    expect(videoEl.currentTime).toBe(DURATION);

    fireEvent.mouseUp(playerEl);
    fireEvent.mouseMove(playerEl, { clientX: 100 });
    expect(videoEl.currentTime).toBe(DURATION);
  });

  test('drags the volume without new classes', () => {
    const { videoEl, volumeLine } = renderReady();
    mockRect(volumeLine, 0, 100);
    const { className } = volumeLine;

    fireEvent.mouseDown(volumeLine);
    fireEvent.mouseMove(volumeLine, { clientX: 30 });
    fireEvent.mouseMove(volumeLine, { clientX: 40 });

    expect(volumeLine.className).toBe(className);
    expect(volumeLine.style.getPropertyValue('--video-volume')).toBe('40%');
    expect(videoEl.volume).toBe(0.4);
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
