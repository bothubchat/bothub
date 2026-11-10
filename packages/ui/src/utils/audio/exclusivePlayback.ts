// The event name is kept: apps may listen to it or dispatch it themselves.
const AUDIO_PLAY_EVENT = 'messageVoicePlay';

type AudioPlayEvent = CustomEvent<{ audio?: unknown } | null>;

const players = new Set<HTMLMediaElement>();

const handleAudioPlay = (event: Event) => {
  const playingAudio = (event as AudioPlayEvent).detail?.audio;

  for (const audio of players) {
    if (audio !== playingAudio && !audio.paused) {
      audio.pause();
    }
  }
};

/**
 * Registers a player that pauses when another one starts playing.
 * All players share one window listener instead of one listener each.
 * Returns the unregister function.
 */
export const registerExclusivePlayback = (audio: HTMLMediaElement) => {
  if (players.size === 0) {
    window.addEventListener(AUDIO_PLAY_EVENT, handleAudioPlay);
  }
  players.add(audio);

  return () => {
    players.delete(audio);

    if (players.size === 0) {
      window.removeEventListener(AUDIO_PLAY_EVENT, handleAudioPlay);
    }
  };
};

/** Pauses the other players before `audio` starts playing */
export const notifyExclusivePlayback = (audio: HTMLMediaElement) => {
  window.dispatchEvent(
    new CustomEvent(AUDIO_PLAY_EVENT, { detail: { audio } }),
  );
};
