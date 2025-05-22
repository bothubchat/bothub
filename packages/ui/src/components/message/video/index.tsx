import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MessageSourceStyled,
  MessageVideoContainer,
  MessageVideoControls,
  MessageVideoControlsButton,
  MessageVideoControlsButtons,
  MessageVideoDownload,
  MessageVideoStyled,
  MessageVideoTimeLine,
  MessageVideoTimeText
} from './styled';
import { MaxWindowIcon } from '@/ui/icons/max-window';
import { MinWindowIcon } from '@/ui/icons/min-window';
import { PauseButtonIcon } from '@/ui/icons/pause-button';
import { PlayButtonIcon } from '@/ui/icons/play-button';
import { MessageVideoVolume } from './volume';
import { DownloadImgIcon } from '@/ui/icons';

export type MessageVideoProps = {
  src: string;
  downloadVideo: () => void;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const MessageVideo: React.FC<MessageVideoProps> = ({
  src,
  downloadVideo
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState('00:00');
  const [videoDuration, setVideoDuration] = useState('00:00');
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoFullScreen, setVideoFullScreen] = useState(false);
  const [timeLineMouseMove, setTimeLineMouseMove] = useState(false);
  const videoContainer = useRef<HTMLDivElement>(null);
  const iconSize = videoFullScreen ? 28 : 24;

  const handleStart = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlayed(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setVideoPlayed(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const { currentTime, duration } = e.currentTarget;

      const time = formatTime(currentTime);
      setVideoCurrentTime(time);

      const progress = (currentTime / duration) * 100;
      setVideoProgress(progress);
    },
    []
  );

  const handleVideoLoaded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const { duration } = e.currentTarget;

      const time = formatTime(duration);
      setVideoDuration(time);
    },
    []
  );

  const handleTimeUpdateClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!videoRef.current) return;
      const { clientX } = e;
      const { width, left } = e.currentTarget.getBoundingClientRect();
      const progress = ((clientX - left) / width) * 100;
      setVideoProgress(progress);
      videoRef.current.currentTime =
        (progress / 100) * videoRef.current.duration;
    },
    []
  );

  const handleStartMouseMove = useCallback(() => {
    setTimeLineMouseMove(true);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!timeLineMouseMove) return;
      handleTimeUpdateClick(event);
    },
    [timeLineMouseMove]
  );

  const handleStartMouseLeave = useCallback(() => {
    setTimeLineMouseMove(false);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!videoContainer.current) return;
    if (videoFullScreen) {
      document.exitFullscreen();
    } else {
      videoContainer.current.requestFullscreen();
    }
    setVideoFullScreen(!videoFullScreen);
  }, [videoFullScreen]);

  const handleChangeVolume = useCallback((volume: number) => {
    if (videoRef.current) {
      const newVolume = Math.floor(volume) / 100;
      videoRef.current.volume = newVolume;
    }
  }, []);

  useEffect(() => {
    const handleDocumentFullscreenChange = () => {
      setVideoFullScreen(document.fullscreenElement !== null);
    };

    window.addEventListener('fullscreenchange', handleDocumentFullscreenChange);
    return () => {
      window.removeEventListener(
        'fullscreenchange',
        handleDocumentFullscreenChange
      );
    };
  }, [videoPlayed]);

  return (
    <MessageVideoContainer
      ref={videoContainer}
      onMouseLeave={handleStartMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleStartMouseLeave}
    >
      <MessageVideoStyled
        ref={videoRef}
        onClick={videoPlayed ? handlePause : handleStart}
        onLoadedData={handleVideoLoaded}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handlePause}
        $isFullScreen={videoFullScreen}
      >
        <MessageSourceStyled
          src={src}
          type="video/mp4"
        />
      </MessageVideoStyled>
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
            <MessageVideoControlsButton onClick={handleStart}>
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
    </MessageVideoContainer>
  );
};
