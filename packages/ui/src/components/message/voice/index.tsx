import React, { memo, useCallback, useId, useRef, useState } from 'react';
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
import { useMediaPlayback } from '../use-media-playback';

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

  const wavesRef = useRef<SVGSVGElement>(null);

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

  const {
    mediaRef: audioRef,
    isPlayed,
    setIsPlayed,
    isLoading,
    setInternalLoading,
    handleStart,
    handlePause,
    handleError,
  } = useMediaPlayback<HTMLAudioElement>({
    src,
    externalLoading,
    waitForData: false,
    exclusive: true,
    checkAlive,
    refreshSrc,
    onReset: () => {
      setCurrentTime(null);
      setProgress(0);
    },
  });

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
  }, [audioRef, duration, setProgress, setCurrentTime]);

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
    [audioRef, duration, isPlayed, externalLoading, handleStart],
  );

  const handleEnded = useCallback(() => {
    setCurrentTime(null);
    setProgress(0);
    setIsPlayed(false);
  }, [setIsPlayed, setProgress, setCurrentTime]);

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
