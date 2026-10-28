import { useCallback, useRef, useState } from 'react';
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
  const isDraggingRef = useRef(false);
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
    isDraggingRef.current = true;
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      handleVolumeUpdateClick(event);
    },
    [handleVolumeUpdateClick],
  );

  const handleStartMouseLeave = useCallback(() => {
    isDraggingRef.current = false;
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
        style={{ '--video-volume': `${volume}%` } as React.CSSProperties}
      />
    </MessageVideoVolumeContainer>
  );
};
