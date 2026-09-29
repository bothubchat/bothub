import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  MessageVoiceAudio,
  MessageVoiceDurationText,
  MessageVoiceHideTextIcon,
  MessageVoiceMain,
  MessageVoicePauseIcon,
  MessageVoicePlayIcon,
  MessageVoiceShowTextIcon,
  MessageVoiceStyled,
  MessageVoiceText,
  MessageVoiceToggleButton,
  MessageVoiceToggleTextButton,
  MessageVoiceWaves,
  StyledRect,
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { isBright, formatSeconds } from '@/ui/utils';
import { useMessage } from '../context';

const AUDIO_PLAY_EVENT = 'messageVoicePlay';

export type MessageVoiceVariant = 'input' | 'message';

export interface MessageVoiceProps extends React.ComponentProps<'div'> {
  height?: number;
  src: string;
  waveData: number[];
  duration: number;
  isLoading?: boolean;
  checkAlive?: () => Promise<boolean>;
  refreshSrc?: () => void;
  disableTranscription?: boolean;
  variant?: MessageVoiceVariant;
}

export const MessageVoice: React.FC<MessageVoiceProps> = ({
  height = 36,
  src,
  waveData,
  duration,
  tabIndex = 0,
  isLoading: externalLoading = false,
  checkAlive,
  refreshSrc,
  disableTranscription,
  variant = 'message',
  children,
  ...props
}) => {
  const theme = useTheme();
  const voiceId = useId();
  const { color } = useMessage();

  const audioRef = useRef<HTMLAudioElement>(null);
  const wavesRef = useRef<SVGSVGElement>(null);

  // The user asked to play: a load error should refresh the src.
  const playRequestedRef = useRef(false);
  // Playback should resume once the refreshed src arrives.
  const resumeOnSrcChangeRef = useRef(false);

  const [internalLoading, setInternalLoading] = useState<boolean>(true);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isTextShowed, setIsTextShowed] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  // Buffering only affects the cursor: play() waits for data by itself, and
  // iOS Safari does not buffer media until playback is requested.
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

  const play = useCallback(() => {
    const audioEl = audioRef.current;

    if (!audioEl) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent(AUDIO_PLAY_EVENT, { detail: { audio: audioEl } }),
    );

    audioEl.play().catch(() => {
      // Autoplay policy or an interrupted play; load errors are handled in onError.
      setIsPlayed(!audioEl.paused);
    });
  }, []);

  const refresh = useCallback(() => {
    if (!refreshSrc) {
      return;
    }

    resumeOnSrcChangeRef.current = true;
    refreshSrc();
  }, [refreshSrc]);

  useEffect(() => {
    setIsPlayed(false);
    setCurrentTime(null);
    setInternalLoading(true);
    playRequestedRef.current = false;

    const audioEl = audioRef.current;

    if (!audioEl) {
      return;
    }

    audioEl.load();

    if (resumeOnSrcChangeRef.current) {
      resumeOnSrcChangeRef.current = false;
      play();
    }
  }, [src, play]);

  const handleStart = useCallback(() => {
    const audioEl = audioRef.current;

    if (!audioEl || externalLoading) return;

    if (audioEl.error) {
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
          audioRef.current?.pause();
          refresh();
        }
      })
      .catch(() => {});
  }, [checkAlive, externalLoading, play, refresh]);

  const handleError = useCallback(() => {
    setInternalLoading(false);
    setIsPlayed(false);

    if (playRequestedRef.current) {
      playRequestedRef.current = false;
      refresh();
    }
  }, [refresh]);

  const handlePause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (!isPlayed) {
      handleStart();
    } else {
      handlePause();
    }
  }, [isPlayed, handleStart, handlePause]);

  const handleTimeUpdate = useCallback(() => {
    const audioEl = audioRef.current;

    if (!audioEl) {
      return;
    }

    setCurrentTime(audioEl.currentTime);
  }, []);

  const handleWavesClick = useCallback<React.MouseEventHandler>(
    (event) => {
      event.stopPropagation();

      const audioEl = audioRef.current;
      const wavesEl = wavesRef.current;

      if (!audioEl || !wavesEl || externalLoading) {
        return;
      }

      const rect = wavesEl.getBoundingClientRect();
      const { width } = rect;
      const x = event.clientX - rect.left;
      const newTime = (x / width) * duration;

      if (Number.isFinite(newTime)) {
        audioEl.currentTime = newTime;
      }

      if (!isPlayed) {
        handleStart();
      }
    },
    [duration, isPlayed, externalLoading, handleStart],
  );

  const handleEnded = useCallback(() => {
    setCurrentTime(null);
    setIsPlayed(false);
  }, []);

  const handleTextToggle = useCallback<React.MouseEventHandler>(
    (event) => {
      event.stopPropagation();

      setIsTextShowed(!isTextShowed);
    },
    [isTextShowed],
  );

  return (
    <MessageVoiceStyled {...props}>
      <MessageVoiceAudio
        ref={audioRef}
        src={src}
        onPlay={() => setIsPlayed(true)}
        onPause={() => setIsPlayed(false)}
        onCanPlay={() => setInternalLoading(false)}
        onError={handleError}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <MessageVoiceMain
        $loading={isLoading}
        tabIndex={tabIndex}
      >
        <MessageVoiceToggleButton onClick={handleToggle}>
          <IconProvider
            {...(variant === 'message' &&
              (theme.scheme !== 'standard'
                ? {
                    fill: theme.colors.grayScale.gray4,
                  }
                : {
                    fill:
                      theme.mode === 'dark'
                        ? theme.default.colors.base.white
                        : theme.default.colors.accent.primary,
                  }))}
            {...(variant === 'input' &&
              color === 'default' && {
                fill:
                  theme.scheme === 'standard'
                    ? '#A4C1FA'
                    : isBright(theme.colors.grayScale.gray4)
                      ? theme.colors.accent.strongDown
                      : theme.colors.accent.primary,
              })}
            {...(variant === 'input' && {
              size: 22,
            })}
          >
            {isPlayed ? <MessageVoicePauseIcon /> : <MessageVoicePlayIcon />}
          </IconProvider>
        </MessageVoiceToggleButton>
        <MessageVoiceWaves
          ref={wavesRef}
          width="145"
          height={height}
          viewBox={`0 0 145 ${height}`}
          fill="none"
          onClick={handleWavesClick}
        >
          <g clipPath={`url(#${voiceId}_clip)`}>
            <rect
              width="145"
              height={height}
              {...{
                fill:
                  color === 'default'
                    ? theme.scheme === 'standard'
                      ? '#A4C1FA'
                      : theme.bright ||
                          (theme.scheme === 'custom' &&
                            isBright(
                              theme.colors.custom.message.user.background,
                            ))
                        ? theme.colors.accent.strongDown
                        : theme.colors.accent.primaryLight
                    : theme.default.colors.base.white,
              }}
            />
            {currentTime !== null && (
              <StyledRect
                height={height}
                fill={
                  theme.mode === 'dark'
                    ? theme.default.colors.base.white
                    : theme.colors.accent.primaryLight
                }
                style={{
                  width: 145 * (currentTime / duration),
                }}
              />
            )}
          </g>
          <defs>
            <clipPath id={`${voiceId}_clip`}>
              {waveData.map((wave, index) => {
                const waveHeight = Math.max((wave / 100) * 36, 2);

                return (
                  <rect
                    key={index}
                    x={index * 5}
                    y={(height - waveHeight) / 2}
                    width="3"
                    height={waveHeight}
                    rx="1.5"
                  />
                );
              })}
            </clipPath>
          </defs>
        </MessageVoiceWaves>
        <MessageVoiceDurationText $variant={variant}>
          {currentTime !== null && formatSeconds(currentTime)}
          {currentTime === null && formatSeconds(duration)}
        </MessageVoiceDurationText>
        {!disableTranscription && (
          <MessageVoiceToggleTextButton onClick={handleTextToggle}>
            <IconProvider
              fill={
                theme.scheme === 'standard'
                  ? theme.mode === 'dark'
                    ? theme.colors.accent.primary
                    : theme.colors.accent.primaryLight
                  : theme.bright
                    ? theme.colors.accent.strongDown
                    : theme.colors.accent.primaryLight
              }
              stroke={
                theme.scheme === 'standard'
                  ? theme.default.colors.base.white
                  : theme.default.colors.base.black
              }
            >
              {isTextShowed ? (
                <MessageVoiceHideTextIcon />
              ) : (
                <MessageVoiceShowTextIcon />
              )}
            </IconProvider>
          </MessageVoiceToggleTextButton>
        )}
      </MessageVoiceMain>
      {!disableTranscription && isTextShowed && children && (
        <MessageVoiceText $messageColor={color}>{children}</MessageVoiceText>
      )}
    </MessageVoiceStyled>
  );
};
