import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MessageSourceStyled,
  MessageVideoContainer,
  MessageVideoControls,
  MessageVideoControlsButton,
  MessageVideoControlsButtons,
  MessageVideoStyled,
  MessageVideoTimeLine,
  MessageVideoTimeText
} from './styled';
import {
  MaxWindowIcon,
  MinWindowIcon,
  PauseButtonIcon,
  PlayButtonIcon
} from '@/ui/icons';
import { MessageVideoVolume } from './volume';

export type MessageVideoProps = {
  src: string;
};

export const MessageVideo: React.FC<MessageVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState('0:00');
  const [videoDuration, setVideoDuration] = useState('0:00');
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
  }, [videoRef.current, setVideoPlayed]);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setVideoPlayed(false);
    }
  }, [videoRef.current, setVideoPlayed]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const { currentTime, duration } = e.currentTarget;
    const seconds = Math.floor(currentTime % 60);
    const minutes = Math.floor(currentTime / 60);
    const progress = (currentTime / duration) * 100;
    setVideoProgress(progress);
    setVideoCurrentTime(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
  };

  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const { duration } = e.currentTarget;
    const secondsDuration = Math.floor(duration % 60);
    const minutesDuration = Math.floor(duration / 60);
    setVideoDuration(
      `${minutesDuration}:${secondsDuration < 10 ? `0${secondsDuration}` : secondsDuration}`
    );
  };

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
    [videoRef.current]
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
  }, [videoFullScreen, setVideoFullScreen]);

  const handleChangeVolume = useCallback(
    (volume: number) => {
      if (videoRef.current) {
        const newVolume = Math.floor(volume) / 100;
        videoRef.current.volume = newVolume;
      }
    },
    [videoRef.current]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        if (videoPlayed) {
          handlePause();
        } else {
          handleStart();
        }
      }
    };
    window.addEventListener('fullscreenchange', () => {
      setVideoFullScreen(document.fullscreenElement !== null);
    });

    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('fullscreenchange', () => {});
      window.removeEventListener('keyup', handleKeyPress);
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
