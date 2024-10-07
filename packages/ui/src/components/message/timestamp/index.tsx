import * as S from './styled';

export const MessageTimestamp = ({ time }: { time: string }) => {
  const date = new Date(time);

  return (
    <S.TimestampStyled>
      <S.TimestampText>
        {date?.getHours()}:{date?.getMinutes()}
      </S.TimestampText>
    </S.TimestampStyled>
  );
};
