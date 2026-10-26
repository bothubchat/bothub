import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MessageVideoContainer,
  MessageVideoControls,
  MessageVideoControlsButton,
  MessageVideoControlsButtons,
  MessageVideoDownload,
  MessageVideoSkeleton,
  MessageVideoStyled,
  MessageVideoTimeLine,
  MessageVideoTimeText,
} from './styled';
import { MaxWindowIcon } from '@/ui/icons/max-window';
import { MinWindowIcon } from '@/ui/icons/min-window';
import { PauseButtonIcon } from '@/ui/icons/pause-button';
import { PlayButtonIcon } from '@/ui/icons/play-button';
import { MessageVideoVolume } from './volume';
import { DownloadImgIcon } from '@/ui/icons';
import { useMediaPlayback } from '../use-media-playback';

export type MessageVideoProps = {
  src: string;
  isLoading?: boolean;
  checkAlive?: () => Promise<boolean>;
  refreshSrc?: () => void;
  downloadVideo?: () => void;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  webkitRequestFullScreen?: () => Promise<void> | void;
};

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
};

const formatTime = (time: number) => {
  if (!Number.isFinite(time) || time < 0) {
    return '00:00';
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const getFullscreenElement = () => {
  const doc = document as FullscreenDocument;
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
};

const requestElementFullscreen = async (element: HTMLElement) => {
  const el = element as FullscreenElement;

  if (el.requestFullscreen) {
    await el.requestFullscreen();
    return;
  }

  if (el.webkitRequestFullscreen) {
    await el.webkitRequestFullscreen();
    return;
  }

  if (el.webkitRequestFullScreen) {
    await el.webkitRequestFullScreen();
  }
};

const exitDocumentFullscreen = async () => {
  const doc = document as FullscreenDocument;

  if (doc.exitFullscreen && doc.fullscreenElement) {
    await doc.exitFullscreen();
    return;
  }

  if (doc.webkitExitFullscreen && doc.webkitFullscreenElement) {
    await doc.webkitExitFullscreen();
  }
};

export const MessageVideo: React.FC<MessageVideoProps> = ({
  src,
  isLoading: externalLoading = false,
  checkAlive,
  refreshSrc,
  downloadVideo,
}) => {
  const timeLineRef = useRef<HTMLDivElement | null>(null);
  // Progress (0..1) goes straight to a CSS variable on the timeline:
  // timeupdate and scrubbing don't re-render the player.
  const progressRef = useRef(0);
  const currentTimeTextRef = useRef('00:00');
  const isScrubbingRef = useRef(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState('00:00');
  const [videoDuration, setVideoDuration] = useState('00:00');
  const [videoFullScreen, setVideoFullScreen] = useState(false);
  const videoContainer = useRef<HTMLDivElement>(null);
  const iconSize = videoFullScreen ? 28 : 24;

  const setProgress = useCallback((progress: number) => {
    progressRef.current = progress;
    timeLineRef.current?.style.setProperty(
      '--video-progress',
      String(progress),
    );
  }, []);

  // The timeline mounts once the video is ready: start it at the progress.
  const setTimeLine = useCallback((element: HTMLDivElement | null) => {
    timeLineRef.current = element;
    element?.style.setProperty('--video-progress', String(progressRef.current));
  }, []);

  // The label shows whole seconds: re-render only when it changes.
  const setCurrentTimeText = useCallback((text: string) => {
    if (currentTimeTextRef.current !== text) {
      currentTimeTextRef.current = text;
      setVideoCurrentTime(text);
    }
  }, []);

  const {
    mediaRef: videoRef,
    isPlayed: videoPlayed,
    setIsPlayed: setVideoPlayed,
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
      setCurrentTimeText('00:00');
      setVideoDuration('00:00');
      setProgress(0);
    },
    // Safari sometimes already has the metadata when the src changes
    onLoad: (video) => {
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        markReady(video);
      }
    },
  });

  const markReady = useCallback(
    (video: HTMLMediaElement) => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setVideoDuration(formatTime(video.duration));
      }
      setInternalLoading(false);
    },
    [setInternalLoading],
  );

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const { currentTime, duration } = e.currentTarget;

      setCurrentTimeText(formatTime(currentTime));

      if (!Number.isFinite(duration) || duration <= 0) {
        setProgress(0);
        return;
      }

      setProgress(currentTime / duration);
    },
    [setCurrentTimeText, setProgress],
  );

  const handleVideoLoaded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      markReady(e.currentTarget);
    },
    [markReady],
  );

  // Position on the timeline, not on the element under the pointer: while
  // scrubbing, the pointer moves over the whole container.
  const seekTo = useCallback(
    (clientX: number) => {
      const video = videoRef.current;
      const timeLine = timeLineRef.current;

      if (!video || !timeLine) return;

      const { duration } = video;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const { width, left } = timeLine.getBoundingClientRect();
      if (width <= 0) return;

      const progress = Math.min(Math.max((clientX - left) / width, 0), 1);
      setProgress(progress);
      video.currentTime = progress * duration;
    },
    [setProgress, videoRef],
  );

  const handleTimeUpdateClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      seekTo(e.clientX);
    },
    [seekTo],
  );

  const handleStartMouseMove = useCallback(() => {
    isScrubbingRef.current = true;
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isScrubbingRef.current) return;
      event.preventDefault();
      seekTo(event.clientX);
    },
    [seekTo],
  );

  const handleStartMouseLeave = useCallback(() => {
    isScrubbingRef.current = false;
  }, []);

  const handleFullscreen = useCallback(async () => {
    if (!videoContainer.current) return;

    try {
      if (getFullscreenElement()) {
        await exitDocumentFullscreen();
      } else {
        await requestElementFullscreen(videoContainer.current);
      }
    } catch {
      // Safari may reject fullscreen outside a user gesture or without prefix support.
    }
  }, []);

  const handleChangeVolume = useCallback(
    (volume: number) => {
      if (videoRef.current) {
        const newVolume = Math.floor(volume) / 100;
        videoRef.current.volume = newVolume;
        videoRef.current.muted = newVolume === 0;
      }
    },
    [videoRef],
  );

  useEffect(() => {
    const handleDocumentFullscreenChange = () => {
      setVideoFullScreen(getFullscreenElement() !== null);
    };

    document.addEventListener(
      'fullscreenchange',
      handleDocumentFullscreenChange,
    );
    document.addEventListener(
      'webkitfullscreenchange',
      handleDocumentFullscreenChange,
    );

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleDocumentFullscreenChange,
      );
      document.removeEventListener(
        'webkitfullscreenchange',
        handleDocumentFullscreenChange,
      );
    };
  }, []);

  return (
    <MessageVideoContainer
      ref={videoContainer}
      onMouseLeave={handleStartMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleStartMouseLeave}
    >
      <MessageVideoStyled
        key={src}
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        onClick={videoPlayed ? handlePause : handleStart}
        onLoadedMetadata={handleVideoLoaded}
        onCanPlay={handleVideoLoaded}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setVideoPlayed(true)}
        onPause={() => setVideoPlayed(false)}
        onEnded={handlePause}
        onError={handleError}
        $isFullScreen={videoFullScreen}
        $isLoading={isLoading}
      />
      {isLoading && (
        <MessageVideoSkeleton
          $isFullScreen={videoFullScreen}
          fullWidth
          variant="rounded"
        />
      )}
      {!isLoading && (
        <MessageVideoControls
          $isFullScreen={videoFullScreen}
          $isVisible={!videoPlayed}
        >
          <MessageVideoTimeLine
            ref={setTimeLine}
            onClick={handleTimeUpdateClick}
            onMouseDown={handleStartMouseMove}
          />
          <MessageVideoControlsButtons $isFullScreen={videoFullScreen}>
            {videoPlayed ? (
              <MessageVideoControlsButton onClick={handlePause}>
                <PauseButtonIcon size={iconSize} />
              </MessageVideoControlsButton>
            ) : (
              <MessageVideoControlsButton
                onClick={handleStart}
                disabled={isLoading}
              >
                <PlayButtonIcon size={iconSize} />
              </MessageVideoControlsButton>
            )}
            <MessageVideoVolume
              iconSize={iconSize}
              handleChangeVolume={handleChangeVolume}
            />
            <MessageVideoTimeText>
              {videoCurrentTime} / {videoDuration}
            </MessageVideoTimeText>
            {downloadVideo && (
              <MessageVideoDownload
                iconFill="#fff"
                disableHoverColor
                iconSize={iconSize}
                onClick={downloadVideo}
              >
                <DownloadImgIcon />
              </MessageVideoDownload>
            )}
            <MessageVideoControlsButton onClick={handleFullscreen}>
              {videoFullScreen ? (
                <MinWindowIcon
                  fill="#fff"
                  size={iconSize}
                />
              ) : (
                <MaxWindowIcon
                  stroke="#fff"
                  size={iconSize}
                />
              )}
            </MessageVideoControlsButton>
          </MessageVideoControlsButtons>
        </MessageVideoControls>
      )}
    </MessageVideoContainer>
  );
};
