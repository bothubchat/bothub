import * as S from './styled';

export const MessageTimestamp = ({ time }: { time: string }) => {
  const date = new Date(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <S.TimestampStyled>
      <S.TimestampText>
        {hours < 10 ? `0${hours}` : hours}
        :
        {minutes < 10 ? `0${minutes}` : minutes}
      </S.TimestampText>
    </S.TimestampStyled>
  );
};
