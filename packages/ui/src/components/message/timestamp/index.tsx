import { useMessage } from '@/ui/components/message/context';
import { TimestampStyled, TimestampText } from './styled';
import { MessageTimestampPosition } from '../types';

export interface MessageTimestampProps {
  time: string | number;
  position: MessageTimestampPosition;
}
export const MessageTimestamp = ({ time, position }: MessageTimestampProps) => {
  const { variant, color } = useMessage();
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <TimestampStyled $timestampPosition={position}>
      <TimestampText $variant={variant} $color={color}>
        {hours < 10 ? `0${hours}` : hours}
        :
        {minutes < 10 ? `0${minutes}` : minutes}
      </TimestampText>
    </TimestampStyled>
  );
};
