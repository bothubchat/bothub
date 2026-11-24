import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/ui/components/button';
import { IconProvider } from '@/ui/components/icon';
import { DownloadLineIcon } from '@/ui/icons/download-line';
import { ErrorIcon } from '@/ui/icons/error';
import { Forward10LineIcon } from '@/ui/icons/forward-10-line';
import { FullscreenExitLineIcon } from '@/ui/icons/fullscreen-exit-line';
import { FullscreenLineIcon } from '@/ui/icons/fullscreen-line';
import { PauseButtonIcon } from '@/ui/icons/pause-button';
import { PlayButtonIcon } from '@/ui/icons/play-button';
import { ReplayLineIcon } from '@/ui/icons/replay-line';
import { Rewind10LineIcon } from '@/ui/icons/rewind-10-line';
import { useDelayedVisible } from '@/ui/utils';
import { useMediaPlayback } from '../use-media-playback';
import { defaultMessageVideoLabels, MessageVideoLabels } from './labels';
import { MessageVideoSpeedMenu } from './speed';
import {
  MessageVideoBadge,
  MessageVideoBar,
  MessageVideoBigPlay,
  MessageVideoButton,
  MessageVideoCenter,
  MessageVideoCenterPlay,
  MessageVideoContainer,
  MessageVideoControls,
  MessageVideoError,
  MessageVideoErrorDescription,
  MessageVideoErrorIcon,
  MessageVideoErrorText,
  MessageVideoErrorTitle,
  MessageVideoMiniProgress,
  MessageVideoReplay,
  MessageVideoReplayText,
  MessageVideoShade,
  MessageVideoSkeleton,
  MessageVideoSpacer,
  MessageVideoSpeedButton,
  MessageVideoSpeedText,
  MessageVideoSpinner,
  MessageVideoStyled,
  MessageVideoTime,
} from './styled';
import { MessageVideoTimeLine } from './timeline';
import {
  canRequestElementFullscreen,
  clamp,
  enterVideoFullscreen,
  exitDocumentFullscreen,
  formatPlaybackRate,
  formatVideoTime,
  getBufferedProgress,
  getFullscreenElement,
  hasVideoHours,
  requestElementFullscreen,
  VIDEO_CONTROLS_HIDE_DELAY,
  VIDEO_DEFAULT_ASPECT,
  VIDEO_PLAYBACK_RATES,
  VIDEO_SEEK_STEP,
  VIDEO_TOUCH_SEEK_STEP,
  VIDEO_VOLUME_STEP,
} from './utils';
import { MessageVideoVolume } from './volume';

export type { MessageVideoLabels } from './labels';

export type MessageVideoProps = {
  src: string;
  isLoading?: boolean;
  checkAlive?: () => Promise<boolean>;
  refreshSrc?: () => void;
  downloadVideo?: () => void;
  /** Button names and the error texts; Russian by default. */
  labels?: Partial<MessageVideoLabels>;
};

/** The spinner shows only for a stall longer than this. */
const BUFFERING_SPINNER_DELAY = 400;

const getPlayLabel = (
  labels: MessageVideoLabels,
  isPlayed: boolean,
  isEnded: boolean,
) => {
  if (isEnded) return labels.replay;
  return isPlayed ? labels.pause : labels.play;
};

export const MessageVideo: React.FC<MessageVideoProps> = ({
  src,
  isLoading: externalLoading = false,
  checkAlive,
  refreshSrc,
  downloadVideo,
  labels: customLabels,
}) => {
  const labels = { ...defaultMessageVideoLabels, ...customLabels };

  const containerRef = useRef<HTMLDivElement>(null);
  const seekInputRef = useRef<HTMLInputElement>(null);
  const speedButtonRef = useRef<HTMLButtonElement>(null);
  const hideTimerRef = useRef<number | undefined>(undefined);
  const pointerTypeRef = useRef('mouse');
  const isScrubbingRef = useRef(false);
  const currentTimeTextRef = useRef(formatVideoTime(0));

  const [duration, setDuration] = useState(0);
  const [currentTimeText, setCurrentTimeText] = useState(
    currentTimeTextRef.current,
  );
  const [aspect, setAspect] = useState(VIDEO_DEFAULT_ASPECT);
  const [hasStarted, setHasStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Progress (0..1) goes straight to CSS variables of the player and the
  // value of the seek input: timeupdate doesn't re-render the player.
  const setProgress = useCallback((time: number, total: number) => {
    const ratio = total > 0 ? clamp(time / total, 0, 1) : 0;
    containerRef.current?.style.setProperty('--video-progress', String(ratio));

    const input = seekInputRef.current;
    if (input && !isScrubbingRef.current) {
      input.value = String(time);
    }
  }, []);

  const setBuffered = useCallback((video: HTMLVideoElement | null) => {
    containerRef.current?.style.setProperty(
      '--video-buffered',
      String(video ? getBufferedProgress(video) : 0),
    );
  }, []);

  // The label shows whole seconds: re-render only when it changes.
  const updateTimeText = useCallback((time: number, total: number) => {
    const text = formatVideoTime(time, hasVideoHours(total));

    if (currentTimeTextRef.current !== text) {
      currentTimeTextRef.current = text;
      setCurrentTimeText(text);
    }
  }, []);

  const {
    mediaRef: videoRef,
    isPlayed,
    setIsPlayed,
    isLoading,
    setInternalLoading,
    handleStart,
    handlePause,
    handleError,
  } = useMediaPlayback<HTMLVideoElement>({
    src,
    externalLoading,
    checkAlive,
    refreshSrc,
    onReset: () => {
      updateTimeText(0, 0);
      setDuration(0);
      setProgress(0, 0);
      setBuffered(null);
      setHasStarted(false);
      setIsEnded(false);
      setIsBuffering(false);
      setHasError(false);
    },
    // Safari sometimes already has the metadata when the src changes
    onLoad: (video) => {
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        markReady(video as HTMLVideoElement);
      }
    },
  });

  const markReady = useCallback(
    (video: HTMLVideoElement) => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setDuration(video.duration);
        updateTimeText(video.currentTime, video.duration);
      }

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setAspect(video.videoWidth / video.videoHeight);
      }

      setHasError(false);
      setInternalLoading(false);
    },
    [setInternalLoading, updateTimeText],
  );

  const showControls = useCallback(() => {
    setIsActive(true);
    window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(
      () => setIsActive(false),
      VIDEO_CONTROLS_HIDE_DELAY,
    );
  }, []);

  const hideControls = useCallback(() => {
    window.clearTimeout(hideTimerRef.current);
    setIsActive(false);
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimerRef.current), []);

  const isReady = !isLoading && !hasError;
  const areControlsVisible =
    isReady &&
    hasStarted &&
    (!isPlayed || isActive || isScrubbing || isSpeedMenuOpen);

  const togglePlay = useCallback(() => {
    if (isPlayed) {
      handlePause();
    } else {
      handleStart();
    }
  }, [isPlayed, handlePause, handleStart]);

  const seekTo = useCallback(
    (time: number) => {
      const video = videoRef.current;

      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      const next = clamp(time, 0, video.duration);
      video.currentTime = next;
      setProgress(next, video.duration);
      updateTimeText(next, video.duration);
    },
    [setProgress, updateTimeText, videoRef],
  );

  const seekBy = useCallback(
    (delta: number) => {
      const video = videoRef.current;
      if (video) seekTo(video.currentTime + delta);
    },
    [seekTo, videoRef],
  );

  const handleVolumeChange = useCallback((next: number) => {
    const value = clamp(next, 0, 1);
    setVolume(value);
    setIsMuted(value === 0);
  }, []);

  const changeVolumeBy = useCallback(
    (delta: number) => {
      const current = isMuted ? 0 : volume;
      handleVolumeChange(Math.round((current + delta) * 100) / 100);
    },
    [handleVolumeChange, isMuted, volume],
  );

  // Unmuting at zero brings back half the volume, not silence.
  const toggleMute = useCallback(() => {
    if (isMuted || volume === 0) {
      setIsMuted(false);
      if (volume === 0) setVolume(0.5);
      return;
    }

    setIsMuted(true);
  }, [isMuted, volume]);

  // A new src mounts a new video element: it gets the settings too.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    video.muted = isMuted;
  }, [videoRef, src, volume, isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultPlaybackRate = playbackRate;
    video.playbackRate = playbackRate;
  }, [videoRef, src, playbackRate]);

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container) return;

    try {
      if (getFullscreenElement() === container) {
        await exitDocumentFullscreen();
        return;
      }

      if (canRequestElementFullscreen()) {
        await requestElementFullscreen(container);
        return;
      }

      if (video) {
        enterVideoFullscreen(video);
      }
    } catch {
      // Safari may reject fullscreen outside a user gesture or without prefix support.
    }
  }, [videoRef]);

  // Another element in fullscreen is not this player's business.
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(
        containerRef.current !== null &&
          getFullscreenElement() === containerRef.current,
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
    };
  }, []);

  const handleScrubChange = useCallback(
    (value: boolean) => {
      isScrubbingRef.current = value;
      setIsScrubbing(value);

      if (!value) {
        showControls();
      }
    },
    [showControls],
  );

  const toggleSpeedMenu = useCallback(() => {
    setIsSpeedMenuOpen((isOpen) => !isOpen);
  }, []);

  const closeSpeedMenu = useCallback(
    (returnFocus: boolean) => {
      setIsSpeedMenuOpen(false);
      showControls();

      if (returnFocus) {
        speedButtonRef.current?.focus();
      }
    },
    [showControls],
  );

  const handleSpeedSelect = useCallback(
    (rate: number) => {
      setPlaybackRate(rate);
      closeSpeedMenu(true);
    },
    [closeSpeedMenu],
  );

  const handleRetry = useCallback(() => {
    setHasError(false);
    setInternalLoading(true);
    // A new src reloads by itself; the same one is loaded again here.
    refreshSrc?.();
    videoRef.current?.load();
  }, [refreshSrc, setInternalLoading, videoRef]);

  // On touch a tap shows or hides the controls; a click plays and pauses.
  const handleVideoClick = useCallback(() => {
    if (pointerTypeRef.current === 'touch' && hasStarted) {
      if (isPlayed && areControlsVisible) {
        hideControls();
      } else {
        showControls();
      }
      return;
    }

    togglePlay();
  }, [
    areControlsVisible,
    hasStarted,
    hideControls,
    isPlayed,
    showControls,
    togglePlay,
  ]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      pointerTypeRef.current = event.pointerType;

      // A tap on a control keeps the controls on screen.
      if (event.pointerType === 'touch' && event.target !== videoRef.current) {
        showControls();
      }
    },
    [showControls, videoRef],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'touch') {
        showControls();
      }
    },
    [showControls],
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse') {
        hideControls();
      }
    },
    [hideControls],
  );

  // Keys work while the focus is in the player: no global listeners, so
  // typing in the chat is never taken over.
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const video = videoRef.current;

      if (
        !video ||
        !isReady ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      const isButton = event.target instanceof HTMLButtonElement;
      // By the key's place: the letters work in any keyboard layout.
      const digit = /^(?:Digit|Numpad)(\d)$/.exec(event.code);

      if (event.key === ' ' || event.code === 'KeyK') {
        // A focused button presses itself on Space.
        if ((event.key === ' ' && isButton) || event.repeat) return;
        togglePlay();
      } else if (event.key === 'ArrowLeft') {
        seekBy(-VIDEO_SEEK_STEP);
      } else if (event.key === 'ArrowRight') {
        seekBy(VIDEO_SEEK_STEP);
      } else if (event.key === 'ArrowUp') {
        changeVolumeBy(VIDEO_VOLUME_STEP);
      } else if (event.key === 'ArrowDown') {
        changeVolumeBy(-VIDEO_VOLUME_STEP);
      } else if (event.code === 'KeyM') {
        if (event.repeat) return;
        toggleMute();
      } else if (event.code === 'KeyF') {
        if (event.repeat) return;
        toggleFullscreen();
      } else if (digit) {
        seekTo((Number(digit[1]) / 10) * video.duration);
      } else {
        return;
      }

      event.preventDefault();
      showControls();
    },
    [
      changeVolumeBy,
      isReady,
      seekBy,
      seekTo,
      showControls,
      toggleFullscreen,
      toggleMute,
      togglePlay,
      videoRef,
    ],
  );

  const handleTimeUpdate = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      const total = Number.isFinite(video.duration) ? video.duration : 0;

      updateTimeText(video.currentTime, total);
      setProgress(video.currentTime, total);
      setBuffered(video);
    },
    [setBuffered, setProgress, updateTimeText],
  );

  const handleLoadedMetadata = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      markReady(event.currentTarget);
    },
    [markReady],
  );

  const handleCanPlay = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      markReady(event.currentTarget);
      setIsBuffering(false);
    },
    [markReady],
  );

  const handlePlay = useCallback(() => {
    setIsPlayed(true);
    setHasStarted(true);
    setIsEnded(false);
    showControls();
  }, [setIsPlayed, showControls]);

  const handlePauseEvent = useCallback(() => {
    setIsPlayed(false);
    setIsBuffering(false);
  }, [setIsPlayed]);

  const handleEnded = useCallback(() => {
    setIsEnded(true);
    handlePause();
  }, [handlePause]);

  const handleVideoError = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      handleError();
      setHasError(event.currentTarget.error !== null);
    },
    [handleError],
  );

  const { delayedVisible: isSpinnerVisible } = useDelayedVisible(
    isBuffering && isPlayed,
    BUFFERING_SPINNER_DELAY,
    0,
  );

  const withHours = hasVideoHours(duration);
  const durationText = formatVideoTime(duration, withHours);
  const timeText = `${currentTimeText} / ${durationText}`;
  const playLabel = getPlayLabel(labels, isPlayed, isEnded);
  const rateText = formatPlaybackRate(playbackRate);
  const iconSize = isFullScreen ? 26 : 22;
  // The play glyph takes about half of its icon box.
  const playIconSize = isFullScreen ? 44 : 36;

  const renderPlayIcon = (size: number) => {
    if (isEnded) return <ReplayLineIcon size={iconSize} />;
    return isPlayed ? (
      <PauseButtonIcon size={size} />
    ) : (
      <PlayButtonIcon size={size} />
    );
  };

  return (
    <MessageVideoContainer
      ref={containerRef}
      role="group"
      aria-label={labels.player}
      aria-busy={isLoading}
      tabIndex={0}
      style={{ '--video-aspect': String(aspect) } as React.CSSProperties}
      $isFullScreen={isFullScreen}
      $hideCursor={isPlayed && !areControlsVisible}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
    >
      <MessageVideoStyled
        key={src}
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        onClick={handleVideoClick}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onProgress={(event) => setBuffered(event.currentTarget)}
        onPlay={handlePlay}
        onPause={handlePauseEvent}
        onPlaying={() => setIsBuffering(false)}
        onWaiting={() => setIsBuffering(true)}
        onSeeking={() => setIsEnded(false)}
        onEnded={handleEnded}
        onError={handleVideoError}
      />

      <MessageVideoShade
        $isEnded={isEnded}
        $areControlsVisible={areControlsVisible}
      />

      {isSpinnerVisible && (
        <MessageVideoSpinner
          role="status"
          aria-label={labels.loading}
        />
      )}

      <IconProvider
        fill="currentColor"
        stroke="currentColor"
      >
        {isReady && !hasStarted && (
          <>
            <MessageVideoBigPlay
              type="button"
              aria-label={labels.play}
              onClick={handleStart}
            >
              <PlayButtonIcon size={48} />
            </MessageVideoBigPlay>
            {duration > 0 && (
              <MessageVideoBadge aria-hidden>{durationText}</MessageVideoBadge>
            )}
          </>
        )}

        {isReady && isEnded && (
          <MessageVideoReplay
            type="button"
            onClick={handleStart}
          >
            <ReplayLineIcon size={20} />
            <MessageVideoReplayText>{labels.replay}</MessageVideoReplayText>
          </MessageVideoReplay>
        )}

        {isReady && (
          <>
            <MessageVideoCenter $isVisible={areControlsVisible && !isEnded}>
              <MessageVideoButton
                type="button"
                aria-label={labels.rewind}
                onClick={() => seekBy(-VIDEO_TOUCH_SEEK_STEP)}
              >
                <Rewind10LineIcon size={28} />
              </MessageVideoButton>
              <MessageVideoCenterPlay
                type="button"
                aria-label={playLabel}
                onClick={togglePlay}
              >
                {renderPlayIcon(44)}
              </MessageVideoCenterPlay>
              <MessageVideoButton
                type="button"
                aria-label={labels.forward}
                onClick={() => seekBy(VIDEO_TOUCH_SEEK_STEP)}
              >
                <Forward10LineIcon size={28} />
              </MessageVideoButton>
            </MessageVideoCenter>

            <MessageVideoMiniProgress
              $isVisible={isPlayed && !areControlsVisible}
            />

            <MessageVideoControls
              $isVisible={areControlsVisible}
              $isFullScreen={isFullScreen}
            >
              <MessageVideoTimeLine
                ref={seekInputRef}
                duration={duration}
                label={labels.seek}
                valueText={timeText}
                isFullScreen={isFullScreen}
                onSeek={seekTo}
                onScrubChange={handleScrubChange}
              />
              <MessageVideoBar>
                <MessageVideoButton
                  type="button"
                  $only="desktop"
                  aria-label={playLabel}
                  onClick={togglePlay}
                >
                  {renderPlayIcon(playIconSize)}
                </MessageVideoButton>
                <MessageVideoVolume
                  volume={volume}
                  isMuted={isMuted}
                  iconSize={iconSize}
                  muteLabel={labels.mute}
                  unmuteLabel={labels.unmute}
                  volumeLabel={labels.volume}
                  onToggleMute={toggleMute}
                  onVolumeChange={handleVolumeChange}
                />
                <MessageVideoTime $isFullScreen={isFullScreen}>
                  {timeText}
                </MessageVideoTime>
                <MessageVideoSpacer />
                <MessageVideoSpeedButton
                  ref={speedButtonRef}
                  type="button"
                  aria-label={`${labels.speed} ${rateText}`}
                  aria-haspopup="menu"
                  aria-expanded={isSpeedMenuOpen}
                  onClick={toggleSpeedMenu}
                >
                  <MessageVideoSpeedText $isFullScreen={isFullScreen}>
                    {rateText}
                  </MessageVideoSpeedText>
                </MessageVideoSpeedButton>
                {downloadVideo && (
                  <MessageVideoButton
                    type="button"
                    aria-label={labels.download}
                    onClick={downloadVideo}
                  >
                    <DownloadLineIcon size={iconSize} />
                  </MessageVideoButton>
                )}
                <MessageVideoButton
                  type="button"
                  aria-label={
                    isFullScreen
                      ? labels.exitFullscreen
                      : labels.enterFullscreen
                  }
                  onClick={toggleFullscreen}
                >
                  {isFullScreen ? (
                    <FullscreenExitLineIcon size={iconSize} />
                  ) : (
                    <FullscreenLineIcon size={iconSize} />
                  )}
                </MessageVideoButton>
              </MessageVideoBar>
            </MessageVideoControls>

            {isSpeedMenuOpen && (
              <MessageVideoSpeedMenu
                rate={playbackRate}
                rates={VIDEO_PLAYBACK_RATES}
                label={labels.speed}
                isFullScreen={isFullScreen}
                toggleRef={speedButtonRef}
                onSelect={handleSpeedSelect}
                onClose={closeSpeedMenu}
              />
            )}
          </>
        )}
      </IconProvider>

      {hasError && !isLoading && (
        <MessageVideoError role="alert">
          <MessageVideoErrorIcon aria-hidden>
            <ErrorIcon size={22} />
          </MessageVideoErrorIcon>
          <MessageVideoErrorText>
            <MessageVideoErrorTitle>{labels.errorTitle}</MessageVideoErrorTitle>
            <MessageVideoErrorDescription>
              {labels.errorDescription}
            </MessageVideoErrorDescription>
          </MessageVideoErrorText>
          <Button
            variant="primary"
            size="small"
            onClick={handleRetry}
          >
            {labels.retry}
          </Button>
        </MessageVideoError>
      )}

      {isLoading && (
        <MessageVideoSkeleton
          variant="rectangular"
          fullWidth
          height="100%"
        />
      )}
    </MessageVideoContainer>
  );
};
