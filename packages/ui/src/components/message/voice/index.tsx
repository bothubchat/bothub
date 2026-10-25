import React, {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
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
import {
  notifyExclusivePlayback,
  registerExclusivePlayback,
} from '@/ui/utils/audio/exclusivePlayback';
import { useMessage } from '../context';

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

const WAVES_WIDTH = 145;

const getProgress = (time: number, duration: number) => {
  if (!Number.isFinite(time) || !Number.isFinite(duration) || duration <= 0) {
    return 0;
  }

  return Math.min(Math.max(time / duration, 0), 1);
};

interface MessageVoiceWaveClipProps {
  id: string;
  waveData: number[];
  height: number;
}

// Static wave shape: it does not re-render while the audio plays.
const MessageVoiceWaveClip: React.FC<MessageVoiceWaveClipProps> = memo(
  ({ id, waveData, height }) => (
    <clipPath id={id}>
      {waveData.map((wave, index) => {
        const waveHeight = Math.max((wave / 100) * height, 2);

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
  ),
);

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
  // Whole seconds: the label shows nothing finer, so timeupdate re-renders
  // the player once per second. Progress goes straight to a CSS variable.
  const [currentTime, setCurrentTimeState] = useState<number | null>(null);
  const currentTimeRef = useRef(currentTime);

  // Skips same-second updates: even a same-value setState right after a
  // render costs one more render.
  const setCurrentTime = useCallback((time: number | null) => {
    if (currentTimeRef.current !== time) {
      currentTimeRef.current = time;
      setCurrentTimeState(time);
    }
  }, []);

  const setProgress = useCallback((progress: number) => {
    wavesRef.current?.style.setProperty('--voice-progress', String(progress));
  }, []);

  // Buffering only affects the cursor: play() waits for data by itself, and
  // iOS Safari does not buffer media until playback is requested.
  const isLoading = internalLoading || externalLoading;

  // One shared window listener for all players: only one plays at a time.
  useEffect(() => {
    const audioEl = audioRef.current;

    if (!audioEl) {
      return;
    }

    return registerExclusivePlayback(audioEl);
  }, []);

  const play = useCallback(() => {
    const audioEl = audioRef.current;

    if (!audioEl) {
      return;
    }

    notifyExclusivePlayback(audioEl);

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
    setProgress(0);
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
  }, [src, play, setProgress, setCurrentTime]);

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

    setProgress(getProgress(audioEl.currentTime, duration));
    setCurrentTime(Math.floor(audioEl.currentTime));
  }, [duration, setProgress, setCurrentTime]);

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
    setProgress(0);
    setIsPlayed(false);
  }, [setProgress, setCurrentTime]);

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
          width={WAVES_WIDTH}
          height={height}
          viewBox={`0 0 ${WAVES_WIDTH} ${height}`}
          fill="none"
          onClick={handleWavesClick}
        >
          <g clipPath={`url(#${voiceId}_clip)`}>
            <rect
              width={WAVES_WIDTH}
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
                width={WAVES_WIDTH}
                height={height}
                fill={
                  theme.mode === 'dark'
                    ? theme.default.colors.base.white
                    : theme.colors.accent.primaryLight
                }
              />
            )}
          </g>
          <defs>
            <MessageVoiceWaveClip
              id={`${voiceId}_clip`}
              waveData={waveData}
              height={height}
            />
          </defs>
        </MessageVoiceWaves>
        <MessageVoiceDurationText $variant={variant}>
          {currentTime !== null && formatSeconds(currentTime)}
          {currentTime === null &&
            formatSeconds(Number.isFinite(duration) ? duration : 0)}
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
