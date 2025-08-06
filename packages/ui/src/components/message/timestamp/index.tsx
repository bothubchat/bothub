import { TimestampStyled, TimestampText } from './styled';
import { MessageTimestampPosition } from '../types';
import { useMessage } from '../context';

export interface MessageTimestampProps {
  time: string | number;
  position: MessageTimestampPosition;
  color: string;
}
export const MessageTimestamp = ({
  time,
  position,
  color,
}: MessageTimestampProps) => {
  const { variant } = useMessage();

  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <TimestampStyled $timestampPosition={position}>
      <TimestampText
        $color={color}
        $variant={variant}
      >
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}
      </TimestampText>
    </TimestampStyled>
  );
};
