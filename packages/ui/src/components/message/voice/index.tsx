import React, { useCallback, useId, useRef, useState } from 'react';
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
  StyledRect
} from './styled';
import { formatSeconds } from './utils';
import { useMessage } from '../context';
import { useTheme } from '@/ui/theme';
import { IconProvider } from '@/ui/components/icon';
import { isBright } from '@/ui/utils';

export interface MessageVoiceProps extends React.ComponentProps<'div'> {
  src: string;
  waveData: number[];
  duration: number;
}

export const MessageVoice: React.FC<MessageVoiceProps> = ({
  src,
  waveData,
  duration,
  tabIndex = 0,
  children,
  ...props
}) => {
  const theme = useTheme();
  const voiceId = useId();
  const { color } = useMessage();

  const audioRef = useRef<HTMLAudioElement>(null);
  const wavesRef = useRef<SVGSVGElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isTextShowed, setIsTextShowed] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  const handleToggle = useCallback(() => {
    const audioEl = audioRef.current;

    if (!audioEl) {
      return;
    }

    if (!isPlayed) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  }, [isPlayed, audioRef.current]);

  const handleTimeUpdate = useCallback(() => {
    const audioEl = audioRef.current;

    if (!audioEl) {
      return;
    }

    setCurrentTime(audioEl.currentTime);
  }, [audioRef.current]);

  const handleWavesClick = useCallback<React.MouseEventHandler>(
    (event) => {
      event.stopPropagation();

      const audioEl = audioRef.current;
      const wavesEl = wavesRef.current;

      if (!audioEl || !wavesEl) {
        return;
      }

      const rect = wavesEl.getBoundingClientRect();
      const { width } = rect;
      const x = event.clientX - rect.left;
      const currentTime = (x / width) * duration;

      audioEl.play();
      audioEl.currentTime = currentTime;
    },
    [audioRef.current, duration]
  );

  const handleEnded = useCallback(() => {
    setCurrentTime(null);
  }, []);

  const handleTextToggle = useCallback<React.MouseEventHandler>(
    (event) => {
      event.stopPropagation();

      setIsTextShowed(!isTextShowed);
    },
    [isTextShowed]
  );

  return (
    <MessageVoiceStyled {...props}>
      <MessageVoiceAudio
        ref={audioRef}
        src={src}
        onPlay={setIsPlayed.bind(null, true)}
        onPause={setIsPlayed.bind(null, false)}
        onCanPlayThrough={setIsLoading.bind(null, false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <MessageVoiceMain
        $loading={isLoading}
        tabIndex={tabIndex}
      >
        <MessageVoiceToggleButton onClick={handleToggle}>
          <IconProvider
            {...(color === 'default'
              ? theme.mode === 'dark'
                ? {
                    fill: theme.default.colors.base.white,
                    stroke: theme.colors.accent.primary
                  }
                : {
                    fill: theme.colors.accent.primaryLight,
                    stroke: theme.default.colors.base.white
                  }
              : color === 'green'
                ? { fill: theme.colors.gpt3 }
                : color === 'purple'
                  ? { fill: theme.colors.gpt4 }
                  : { fill: color })}
          >
            {isPlayed && <MessageVoicePauseIcon />}
            {!isPlayed && <MessageVoicePlayIcon />}
          </IconProvider>
        </MessageVoiceToggleButton>
        <MessageVoiceWaves
          ref={wavesRef}
          width="145"
          height="36"
          viewBox="0 0 145 36"
          fill="none"
          onClick={handleWavesClick}
        >
          <g clipPath={`url(#${voiceId}_clip)`}>
            <rect
              width="145"
              height="36"
              {...{
                fill:
                  color === 'default'
                    ? theme.scheme === 'standard'
                      ? '#A4C1FA'
                      : theme.bright ||
                          (theme.scheme === 'custom' &&
                            isBright(
                              theme.colors.custom.message.user.background
                            ))
                        ? theme.colors.accent.strongDown
                        : theme.colors.accent.primaryLight
                    : theme.default.colors.base.white
              }}
            />
            {currentTime !== null && (
              <StyledRect
                height="36"
                fill={
                  theme.mode === 'dark'
                    ? theme.default.colors.base.white
                    : theme.colors.accent.primaryLight
                }
                style={{
                  width: 145 * (currentTime / duration)
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
                    y={(36 - waveHeight) / 2}
                    width="3"
                    height={waveHeight}
                    rx="1.5"
                  />
                );
              })}
            </clipPath>
          </defs>
        </MessageVoiceWaves>
        <MessageVoiceDurationText>
          {currentTime !== null && formatSeconds(currentTime)}
          {currentTime === null && formatSeconds(duration)}
        </MessageVoiceDurationText>
        <MessageVoiceToggleTextButton onClick={handleTextToggle}>
          <IconProvider
            fill={
              theme.mode === 'light'
                ? theme.colors.accent.primaryLight
                : theme.colors.accent.primary
            }
            stroke={theme.default.colors.base.white}
          >
            {isTextShowed && <MessageVoiceHideTextIcon />}
            {!isTextShowed && <MessageVoiceShowTextIcon />}
          </IconProvider>
        </MessageVoiceToggleTextButton>
      </MessageVoiceMain>
      {isTextShowed && children && (
        <MessageVoiceText $messageColor={color}>{children}</MessageVoiceText>
      )}
    </MessageVoiceStyled>
  );
};
