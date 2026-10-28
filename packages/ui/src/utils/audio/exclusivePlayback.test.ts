import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  notifyExclusivePlayback,
  registerExclusivePlayback,
} from './exclusivePlayback';

const createAudio = (paused: boolean) => {
  const audio = document.createElement('audio');
  Object.defineProperty(audio, 'paused', {
    configurable: true,
    get: () => paused,
  });
  audio.pause = vi.fn();

  return audio;
};

describe('exclusivePlayback', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('shares one window listener between players', () => {
    const addEventListener = vi.spyOn(window, 'addEventListener');
    const removeEventListener = vi.spyOn(window, 'removeEventListener');

    const unregister = [createAudio(true), createAudio(true)].map(
      registerExclusivePlayback,
    );

    expect(addEventListener).toHaveBeenCalledTimes(1);

    unregister.forEach((fn) => fn());

    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  test('pauses the other playing players', () => {
    const starting = createAudio(true);
    const playing = createAudio(false);
    const idle = createAudio(true);
    const unregister = [starting, playing, idle].map(registerExclusivePlayback);

    notifyExclusivePlayback(starting);

    expect(playing.pause).toHaveBeenCalledTimes(1);
    expect(starting.pause).not.toHaveBeenCalled();
    expect(idle.pause).not.toHaveBeenCalled();

    unregister.forEach((fn) => fn());
  });

  test('reacts to the event dispatched outside', () => {
    const playing = createAudio(false);
    const unregister = registerExclusivePlayback(playing);

    window.dispatchEvent(
      new CustomEvent('messageVoicePlay', {
        detail: { audio: document.createElement('video') },
      }),
    );

    expect(playing.pause).toHaveBeenCalledTimes(1);

    unregister();
  });

  test('stops pausing unregistered players', () => {
    const starting = createAudio(true);
    const removed = createAudio(false);
    const unregisterStarting = registerExclusivePlayback(starting);
    registerExclusivePlayback(removed)();

    notifyExclusivePlayback(starting);

    expect(removed.pause).not.toHaveBeenCalled();

    unregisterStarting();
  });
});
