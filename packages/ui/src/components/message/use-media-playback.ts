import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventCallback } from '@/ui/utils';
import {
  notifyExclusivePlayback,
  registerExclusivePlayback,
} from '@/ui/utils/audio/exclusivePlayback';

export interface UseMediaPlaybackOptions {
  src: string;
  /** Loading reported by the caller, e.g. while a fresh src is requested. */
  externalLoading: boolean;
  /**
   * Waits for the media data before a start. The voice player starts right
   * away: play() waits for data by itself, and iOS Safari does not buffer
   * media until playback is requested.
   */
  waitForData?: boolean;
  /** Pauses the other players that also have it when this one starts. */
  exclusive?: boolean;
  /** Says whether the src is still valid before playback goes on. */
  checkAlive?: () => Promise<boolean>;
  /** Asks for a new src; playback resumes once it arrives. */
  refreshSrc?: () => void;
  /** Resets the player's own state for a new src. */
  onReset?: () => void;
  /** The media element has just started loading a new src. */
  onLoad?: (media: HTMLMediaElement) => void;
}

/**
 * Playback shared by the voice, music and video players: starting within the
 * user gesture, refreshing an expired src and resuming once it arrives.
 */
export const useMediaPlayback = <Media extends HTMLMediaElement>({
  src,
  externalLoading,
  waitForData = true,
  exclusive = false,
  checkAlive,
  refreshSrc,
  onReset,
  onLoad,
}: UseMediaPlaybackOptions) => {
  const mediaRef = useRef<Media>(null);
  // The user asked to play: a load error should refresh the src.
  const playRequestedRef = useRef(false);
  // Playback should resume once the refreshed src arrives.
  const resumeOnSrcChangeRef = useRef(false);

  const [isPlayed, setIsPlayed] = useState(false);
  const [internalLoading, setInternalLoading] = useState(true);
  const isLoading = internalLoading || externalLoading;
  const startBlocked = waitForData ? isLoading : externalLoading;

  // One shared window listener for all players: only one plays at a time.
  useEffect(() => {
    const media = mediaRef.current;

    if (!exclusive || !media) {
      return;
    }

    return registerExclusivePlayback(media);
  }, [exclusive]);

  const play = useCallback(() => {
    const media = mediaRef.current;

    if (!media) {
      return;
    }

    if (exclusive) {
      notifyExclusivePlayback(media);
    }

    media.play().catch(() => {
      // Autoplay policy or an interrupted play; load errors are handled in onError.
      setIsPlayed(!media.paused);
    });
  }, [exclusive]);

  const refresh = useCallback(() => {
    if (!refreshSrc) {
      return;
    }

    resumeOnSrcChangeRef.current = true;
    refreshSrc();
  }, [refreshSrc]);

  const reset = useEventCallback(onReset);
  const loaded = useEventCallback(onLoad);

  useEffect(() => {
    setIsPlayed(false);
    setInternalLoading(true);
    playRequestedRef.current = false;
    reset();

    const media = mediaRef.current;

    if (!media) {
      return;
    }

    media.load();
    loaded(media);

    if (resumeOnSrcChangeRef.current) {
      resumeOnSrcChangeRef.current = false;
      play();
    }
  }, [src, play, reset, loaded]);

  const handleStart = useCallback(() => {
    const media = mediaRef.current;

    if (!media || startBlocked) return;

    if (media.error) {
      refresh();
      return;
    }

    playRequestedRef.current = true;
    // play() must be called synchronously in the click handler, otherwise
    // Safari loses the user gesture and blocks playback.
    play();

    checkAlive?.()
      .then((isAlive) => {
        if (!isAlive) {
          mediaRef.current?.pause();
          refresh();
        }
      })
      .catch(() => {});
  }, [checkAlive, startBlocked, play, refresh]);

  const handlePause = useCallback(() => {
    mediaRef.current?.pause();
  }, []);

  // Without it a broken src kept the player loading forever.
  const handleError = useCallback(() => {
    setInternalLoading(false);
    setIsPlayed(false);

    if (playRequestedRef.current) {
      playRequestedRef.current = false;
      refresh();
    }
  }, [refresh]);

  return {
    mediaRef,
    isPlayed,
    setIsPlayed,
    isLoading,
    setInternalLoading,
    handleStart,
    handlePause,
    handleError,
  };
};
