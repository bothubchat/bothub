import { useCallback } from 'react';
import { VolumeLineIcon } from '@/ui/icons/volume-line';
import { VolumeLowLineIcon } from '@/ui/icons/volume-low-line';
import { VolumeMuteLineIcon } from '@/ui/icons/volume-mute-line';
import {
  MessageVideoButton,
  MessageVideoVolumeInput,
  MessageVideoVolumeSlider,
  MessageVideoVolumeStyled,
} from '../styled';

export interface MessageVideoVolumeProps {
  /** 0..1, kept while the sound is off. */
  volume: number;
  isMuted: boolean;
  iconSize: number;
  muteLabel: string;
  unmuteLabel: string;
  volumeLabel: string;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

const getVolumeIcon = (level: number) => {
  if (level === 0) return VolumeMuteLineIcon;
  return level < 0.5 ? VolumeLowLineIcon : VolumeLineIcon;
};

export const MessageVideoVolume: React.FC<MessageVideoVolumeProps> = ({
  volume,
  isMuted,
  iconSize,
  muteLabel,
  unmuteLabel,
  volumeLabel,
  onToggleMute,
  onVolumeChange,
}) => {
  const level = isMuted ? 0 : volume;
  const percent = Math.round(level * 100);
  const Icon = getVolumeIcon(level);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onVolumeChange(Number(event.currentTarget.value) / 100);
    },
    [onVolumeChange],
  );

  return (
    <MessageVideoVolumeStyled>
      <MessageVideoButton
        type="button"
        aria-label={level === 0 ? unmuteLabel : muteLabel}
        onClick={onToggleMute}
      >
        <Icon size={iconSize} />
      </MessageVideoButton>
      <MessageVideoVolumeSlider>
        <MessageVideoVolumeInput
          type="range"
          min={0}
          max={100}
          step={1}
          value={percent}
          aria-label={volumeLabel}
          aria-valuetext={`${percent}%`}
          onChange={handleChange}
          style={{ '--video-volume': `${percent}%` } as React.CSSProperties}
        />
      </MessageVideoVolumeSlider>
    </MessageVideoVolumeStyled>
  );
};
