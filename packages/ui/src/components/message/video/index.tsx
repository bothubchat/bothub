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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState('00:00');
  const [videoDuration, setVideoDuration] = useState('00:00');
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoFullScreen, setVideoFullScreen] = useState(false);
  const [internalLoading, setInternalLoading] = useState(true);
  const [timeLineMouseMove, setTimeLineMouseMove] = useState(false);
  const videoContainer = useRef<HTMLDivElement>(null);
  const iconSize = videoFullScreen ? 28 : 24;

  const isLoading = internalLoading || externalLoading;

  const markReady = useCallback((video: HTMLVideoElement) => {
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setVideoDuration(formatTime(video.duration));
    }
    setInternalLoading(false);
  }, []);

  const handleStart = useCallback(async () => {
    if (isLoading) return;

    if (checkAlive) {
      const isAlive = await checkAlive();

      if (!isAlive) {
        refreshSrc?.();
        return;
      }
    }

    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch {
        setVideoPlayed(false);
      }
    }
  }, [checkAlive, refreshSrc, isLoading]);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const { currentTime, duration } = e.currentTarget;

      setVideoCurrentTime(formatTime(currentTime));

      if (!Number.isFinite(duration) || duration <= 0) {
        setVideoProgress(0);
        return;
      }

      setVideoProgress((currentTime / duration) * 100);
    },
    [],
  );

  const handleVideoLoaded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      markReady(e.currentTarget);
    },
    [markReady],
  );

  const handleTimeUpdateClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!videoRef.current) return;

      const { duration } = videoRef.current;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const { clientX } = e;
      const { width, left } = e.currentTarget.getBoundingClientRect();
      const progress = ((clientX - left) / width) * 100;
      setVideoProgress(progress);
      videoRef.current.currentTime = (progress / 100) * duration;
    },
    [],
  );

  const handleStartMouseMove = useCallback(() => {
    setTimeLineMouseMove(true);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!timeLineMouseMove) return;
      handleTimeUpdateClick(event);
    },
    [timeLineMouseMove, handleTimeUpdateClick],
  );

  const handleStartMouseLeave = useCallback(() => {
    setTimeLineMouseMove(false);
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

  const handleChangeVolume = useCallback((volume: number) => {
    if (videoRef.current) {
      const newVolume = Math.floor(volume) / 100;
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  }, []);

  useEffect(() => {
    setVideoPlayed(false);
    setVideoCurrentTime('00:00');
    setVideoDuration('00:00');
    setVideoProgress(0);
    setInternalLoading(true);

    const video = videoRef.current;
    if (!video) return;

    video.load();

    // Safari иногда уже имеет metadata к моменту смены src.
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      markReady(video);
    }
  }, [src, markReady]);

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
        onError={() => setInternalLoading(false)}
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
            onClick={handleTimeUpdateClick}
            onMouseDown={handleStartMouseMove}
            $progress={videoProgress}
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
