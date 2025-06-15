import { TimestampStyled, TimestampText } from './styled';
import { MessageTimestampPosition } from '../types';

export interface MessageTimestampProps {
  time: string | number;
  position: MessageTimestampPosition;
  color: string;
}
export const MessageTimestamp = ({
  time,
  position,
  color
}: MessageTimestampProps) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <TimestampStyled $timestampPosition={position}>
      <TimestampText $color={color}>
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}
      </TimestampText>
    </TimestampStyled>
  );
};
