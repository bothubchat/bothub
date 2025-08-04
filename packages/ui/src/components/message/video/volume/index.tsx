import { useCallback, useState } from 'react';
import { VolumeIcon } from '@/ui/icons/volume';
import {
  MessageVideoControlsButton,
  MessageVideoVolumeContainer,
  MessageVideoVolumeLine,
} from '../styled';

type MessageVideoVolumeProps = {
  iconSize?: number;
  handleChangeVolume?: (volume: number) => void;
};

export const MessageVideoVolume: React.FC<MessageVideoVolumeProps> = ({
  iconSize = 16,
  handleChangeVolume,
}) => {
  const [volumeLineMouseMove, setVolumeLineMouseMove] = useState(false);
  const [volume, setVolume] = useState(100);

  const handleVolumeUpdateClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const { clientX } = e;
      const { width, left } = e.currentTarget.getBoundingClientRect();
      const progress = ((clientX - left) / width) * 100;
      if (progress > 100 || progress < 0) {
        return;
      }
      setVolume(progress);
      handleChangeVolume?.(progress);
    },
    [handleChangeVolume],
  );

  const handleStartMouseMove = useCallback(() => {
    setVolumeLineMouseMove(true);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!volumeLineMouseMove) return;
      handleVolumeUpdateClick(event);
    },
    [volumeLineMouseMove],
  );

  const handleStartMouseLeave = useCallback(() => {
    setVolumeLineMouseMove(false);
  }, []);

  return (
    <MessageVideoVolumeContainer onMouseLeave={handleStartMouseLeave}>
      <MessageVideoControlsButton>
        <VolumeIcon
          fill="#fff"
          size={iconSize}
        />
      </MessageVideoControlsButton>
      <MessageVideoVolumeLine
        onClick={handleVolumeUpdateClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleStartMouseLeave}
        onMouseDown={handleStartMouseMove}
        $volume={volume}
      />
    </MessageVideoVolumeContainer>
  );
};
