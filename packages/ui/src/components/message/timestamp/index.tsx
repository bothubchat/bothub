import { TimestampStyled, TimestampText } from './styled';
import { useMessage } from '../context';

export interface MessageTimestampProps {
  time?: string | number;
  edited?: boolean;
  editedText?: string;
}

const formatTime = (time: string | number) => {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const MessageTimestamp = ({
  time,
  edited,
  editedText,
}: MessageTimestampProps) => {
  const { variant } = useMessage();
  const label = edited ? editedText : undefined;

  if (!time && !label) return null;

  // Под пузырём пользователя время видно по наведению, пометка — всегда
  const isRevealed = variant === 'user';

  return (
    <TimestampStyled>
      {time && (
        <TimestampText
          $reveal={isRevealed}
          {...(isRevealed && { 'data-message-reveal': true })}
        >
          {formatTime(time)}
        </TimestampText>
      )}
      {/* Пометка стоит у края: скрытое до наведения время её не сдвигает */}
      {label && <TimestampText>{label}</TimestampText>}
    </TimestampStyled>
  );
};
