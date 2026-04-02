import { TimestampStyled, TimestampText } from './styled';
import { MessageTimestampPosition } from '../types';
import { useMessage } from '../context';

export interface MessageTimestampProps {
  time?: string | number;
  edited?: boolean;
  editedText?: string;
  position: MessageTimestampPosition;
  color: string;
}
export const MessageTimestamp = ({
  time,
  edited,
  editedText,
  position,
  color,
}: MessageTimestampProps) => {
  const { variant } = useMessage();

  if (!time) return null;

  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return (
    <TimestampStyled $timestampPosition={position}>
      <TimestampText
        $color={color}
        $variant={variant}
      >
        {edited && `${editedText}`}
      </TimestampText>
      <TimestampText
        $color={color}
        $variant={variant}
      >
        {hours}:{minutes}
      </TimestampText>
    </TimestampStyled>
  );
};
