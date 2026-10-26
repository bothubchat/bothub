import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  MessageMusicAudio,
  MessageMusicContent,
  MessageMusicControlButton,
  MessageMusicCover,
  MessageMusicCoverImage,
  MessageMusicIconBadge,
  MessageMusicMeta,
  MessageMusicPlayerRow,
  MessageMusicSkeleton,
  MessageMusicSlider,
  MessageMusicSliderWrap,
  MessageMusicStyled,
  MessageMusicTime,
  MessageMusicTitle,
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { formatSeconds } from '@/ui/utils';
import { MusicNoteIcon } from '@/ui/icons/music-note';
import { PlayButtonIcon } from '@/ui/icons/play-button';
import { PauseButtonIcon } from '@/ui/icons/pause-button';
import { useMessage } from '../context';
import { useMediaPlayback } from '../use-media-playback';

export interface MessageMusicProps extends React.ComponentProps<'div'> {
  src: string;
  coverSrc?: string;
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

  const isSeekingRef = useRef(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [coverError, setCoverError] = useState(false);

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
    exclusive: true,
    checkAlive,
    refreshSrc,
    onReset: () => {
      setCurrentTime(0);
      setDuration(0);
      setCoverError(false);
    },
  });

  const hasCover = Boolean(coverSrc) && !coverError;
  const showSkeleton = isLoading && duration <= 0;

  useEffect(() => {
    setCoverError(false);
  }, [coverSrc]);

  const handleToggle = useCallback(() => {
    if (!audioRef.current || isLoading) return;

    if (!isPlayed) {
      handleStart();
    } else {
      handlePause();
    }
  }, [isPlayed, isLoading, handleStart, handlePause, audioRef]);

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
    [duration, isLoading, audioRef],
  );

  const handleSliderChange = useCallback(
    (value: number | number[]) => {
      const next = typeof value === 'number' ? value : value[0];
      isSeekingRef.current = true;
      setCurrentTime(next);

      if (audioRef.current) {
        audioRef.current.currentTime = next;
      }
    },
    [audioRef],
  );

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
  }, [audioRef]);

  const handleLoadedMetadata = useCallback(() => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
    setInternalLoading(false);
  }, [audioRef, setInternalLoading]);

  const handleEnded = useCallback(() => {
    setCurrentTime(0);
    setIsPlayed(false);
  }, [setIsPlayed]);

  const iconFill =
    variant === 'assistant'
      ? theme.colors.base.white
      : theme.bright || (theme.scheme === 'standard' && theme.mode === 'light')
        ? theme.default.colors.base.black
        : theme.default.colors.base.white;

  const playLabel = isPlayed ? 'Pause' : 'Play';
  const timeLabel = `${formatSeconds(currentTime)} / ${formatSeconds(duration)}`;
  const sliderMax = duration > 0 ? duration : 1;
  const sliderDisabled = isLoading || duration <= 0;

  return (
    <MessageMusicStyled
      {...props}
      $hasCover={hasCover}
      role="group"
      aria-label={title ? `Music: ${title}` : 'Music player'}
    >
      <MessageMusicAudio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setIsPlayed(true)}
        onPause={() => setIsPlayed(false)}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlayThrough={() => setInternalLoading(false)}
        onError={handleError}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      {showSkeleton ? (
        <MessageMusicSkeleton $hasCover={Boolean(coverSrc)} />
      ) : (
        <>
          {hasCover ? (
            <MessageMusicCover>
              <MessageMusicCoverImage
                src={coverSrc}
                alt={title || 'Track cover'}
                onError={() => setCoverError(true)}
              />
            </MessageMusicCover>
          ) : (
            <MessageMusicIconBadge aria-hidden>
              <IconProvider
                size={48}
                fill={theme.colors.grayScale.gray1}
              >
                <MusicNoteIcon />
              </IconProvider>
            </MessageMusicIconBadge>
          )}
          <MessageMusicContent>
            {title && (
              <MessageMusicMeta>
                <MessageMusicTitle
                  $variant={variant}
                  title={title}
                >
                  {title}
                </MessageMusicTitle>
              </MessageMusicMeta>
            )}
            <MessageMusicPlayerRow>
              <MessageMusicControlButton
                variant="secondary"
                disabled={isLoading}
                aria-label={playLabel}
                aria-pressed={isPlayed}
                onClick={handleToggle}
              >
                <IconProvider
                  size={24}
                  fill={iconFill}
                >
                  {isPlayed ? <PauseButtonIcon /> : <PlayButtonIcon />}
                </IconProvider>
              </MessageMusicControlButton>

              <MessageMusicTime
                $variant={variant}
                aria-live="off"
              >
                {timeLabel}
              </MessageMusicTime>
            </MessageMusicPlayerRow>
            <MessageMusicSliderWrap>
              <MessageMusicSlider
                min={0}
                max={sliderMax}
                step={0.1}
                value={Math.min(currentTime, sliderMax)}
                disabled={sliderDisabled}
                $disabled={sliderDisabled}
                ariaLabelForHandle={playLabel}
                onChange={handleSliderChange}
                onChangeComplete={handleSliderChangeComplete}
              />
            </MessageMusicSliderWrap>
          </MessageMusicContent>
        </>
      )}
    </MessageMusicStyled>
  );
};
