import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  MessageMusicAudio,
  MessageMusicContent,
  MessageMusicControlButton,
  MessageMusicCover,
  MessageMusicCoverImage,
  MessageMusicPlayerRow,
  MessageMusicSkeleton,
  MessageMusicSlider,
  MessageMusicSliderWrap,
  MessageMusicStyled,
  MessageMusicTime,
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { formatSeconds } from '@/ui/utils';
import { MusicNoteIcon } from '@/ui/icons/music-note';
import { PlayButtonIcon } from '@/ui/icons/play-button';
import { PauseButtonIcon } from '@/ui/icons/pause-button';
import { useMessage } from '../context';

const AUDIO_PLAY_EVENT = 'messageVoicePlay';

export interface MessageMusicProps extends React.ComponentProps<'div'> {
  src: string;
  coverSrc: string;
  isLoading?: boolean;
  title?: string;
  checkAlive?: () => Promise<boolean>;
  refreshSrc?: () => void;
}

export const MessageMusic: React.FC<MessageMusicProps> = ({
  src,
  coverSrc,
  isLoading: externalLoading = false,
  title,
  checkAlive,
  refreshSrc,
  ...props
}) => {
  const theme = useTheme();
  const { variant } = useMessage();

  const audioRef = useRef<HTMLAudioElement>(null);
  const isSeekingRef = useRef(false);

  const [internalLoading, setInternalLoading] = useState(true);
  const [isPlayed, setIsPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [coverError, setCoverError] = useState(false);

  const isLoading = internalLoading || externalLoading;

  useEffect(() => {
    const handleOtherAudioPlay = (event: CustomEvent) => {
      const currentAudio = audioRef.current;
      const playingAudio = event.detail.audio;

      if (
        currentAudio &&
        playingAudio !== currentAudio &&
        !currentAudio.paused
      ) {
        currentAudio.pause();
      }
    };

    window.addEventListener(
      AUDIO_PLAY_EVENT,
      handleOtherAudioPlay as EventListener,
    );

    return () => {
      window.removeEventListener(
        AUDIO_PLAY_EVENT,
        handleOtherAudioPlay as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    setIsPlayed(false);
    setCurrentTime(0);
    setDuration(0);
    setInternalLoading(true);
    setCoverError(false);

    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [src]);

  const handleStart = useCallback(async () => {
    if (isLoading) return;

    if (checkAlive) {
      const isAlive = await checkAlive();

      if (!isAlive) {
        refreshSrc?.();
        return;
      }
    }

    if (audioRef.current) {
      const event = new CustomEvent(AUDIO_PLAY_EVENT, {
        detail: { audio: audioRef.current },
      });
      window.dispatchEvent(event);

      await audioRef.current.play();
    }
  }, [checkAlive, refreshSrc, isLoading]);

  const handlePause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (!audioRef.current || isLoading) return;

    if (!isPlayed) {
      handleStart();
    } else {
      handlePause();
    }
  }, [isPlayed, isLoading, handleStart, handlePause]);

  const seekTo = useCallback(
    (time: number) => {
      const audioEl = audioRef.current;
      if (!audioEl || isLoading) return;

      const nextTime = Math.min(
        Math.max(time, 0),
        duration || audioEl.duration,
      );
      audioEl.currentTime = nextTime;
      setCurrentTime(nextTime);
    },
    [duration, isLoading],
  );

  const handleSliderChange = useCallback((value: number | number[]) => {
    const next = typeof value === 'number' ? value : value[0];
    isSeekingRef.current = true;
    setCurrentTime(next);

    if (audioRef.current) {
      audioRef.current.currentTime = next;
    }
  }, []);

  const handleSliderChangeComplete = useCallback(
    (value: number | number[]) => {
      const next = typeof value === 'number' ? value : value[0];
      seekTo(next);
      isSeekingRef.current = false;
    },
    [seekTo],
  );

  const handleTimeUpdate = useCallback(() => {
    if (isSeekingRef.current || !audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
    setInternalLoading(false);
  }, []);

  const handleEnded = useCallback(() => {
    setCurrentTime(0);
    setIsPlayed(false);
  }, []);

  const iconFill =
    variant === 'assistant'
      ? theme.colors.base.white
      : theme.bright || (theme.scheme === 'standard' && theme.mode === 'light')
        ? theme.default.colors.base.black
        : theme.default.colors.base.white;

  const showSkeleton = isLoading && duration <= 0;

  return (
    <MessageMusicStyled {...props}>
      <MessageMusicAudio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setIsPlayed(true)}
        onPause={() => setIsPlayed(false)}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlayThrough={() => setInternalLoading(false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      {showSkeleton ? (
        <MessageMusicSkeleton />
      ) : (
        <>
          <MessageMusicCover>
            {!coverError ? (
              <MessageMusicCoverImage
                src={coverSrc}
                alt={title}
                onError={() => setCoverError(true)}
              />
            ) : (
              <IconProvider
                size={48}
                fill={theme.colors.grayScale.gray1}
              >
                <MusicNoteIcon />
              </IconProvider>
            )}
          </MessageMusicCover>
          <MessageMusicContent>
            <MessageMusicPlayerRow>
              <MessageMusicControlButton
                variant="secondary"
                disabled={isLoading}
                onClick={handleToggle}
              >
                <IconProvider
                  size={24}
                  fill={iconFill}
                >
                  {isPlayed ? <PauseButtonIcon /> : <PlayButtonIcon />}
                </IconProvider>
              </MessageMusicControlButton>
              <MessageMusicSliderWrap>
                <MessageMusicSlider
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={currentTime}
                  disabled={isLoading || duration <= 0}
                  $disabled={isLoading || duration <= 0}
                  onChange={handleSliderChange}
                  onChangeComplete={handleSliderChangeComplete}
                />
              </MessageMusicSliderWrap>
              <MessageMusicTime $variant={variant}>
                {formatSeconds(currentTime)} / {formatSeconds(duration)}
              </MessageMusicTime>
            </MessageMusicPlayerRow>
          </MessageMusicContent>
        </>
      )}
    </MessageMusicStyled>
  );
};
