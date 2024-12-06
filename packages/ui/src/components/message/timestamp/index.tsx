import { useMessage } from '@/ui/components/message/context';
import { TimestampStyled, TimestampText } from './styled';

export const MessageTimestamp = ({ time }: { time: string }) => {
  const { variant } = useMessage();
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <TimestampStyled>
      <TimestampText $variant={variant}>
        {hours < 10 ? `0${hours}` : hours}
        :
        {minutes < 10 ? `0${minutes}` : minutes}
      </TimestampText>
    </TimestampStyled>
  );
};
