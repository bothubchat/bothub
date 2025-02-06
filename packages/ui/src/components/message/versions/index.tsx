import * as S from './styled';

import { MessageVariant, MessageVersionEventHandler } from '../types';

export type MessageVersionsType = {
  id?: string;
  variant?: MessageVariant;
  version?: number;
  totalVersions?: number;
  editing?: boolean;
  onNextVersion?: MessageVersionEventHandler;
  onPrevVersion?: MessageVersionEventHandler;
};

export const MessageVersions = ({
  id,
  variant,
  version,
  totalVersions,
  editing,
  onNextVersion,
  onPrevVersion
}: MessageVersionsType) => {
  if (
    typeof version !== 'number' ||
    typeof totalVersions !== 'number' ||
    editing
  ) {
    return null;
  }

  const handleNext = () => {
    if (version !== totalVersions) {
      onNextVersion?.(id);
    }
  };

  const handlePrev = () => {
    if (version !== 1) {
      onPrevVersion?.(id);
    }
  };

  return (
    <S.MessageVersionsStyled $variant={variant}>
      <S.MessageVersionsSwitchButton onClick={handlePrev}>
        {'<'}
      </S.MessageVersionsSwitchButton>
      <S.MessageVersionsPagination>
        <S.MessageVersionsText>{version}</S.MessageVersionsText>
        <S.MessageVersionsText>/</S.MessageVersionsText>
        <S.MessageVersionsText>{totalVersions}</S.MessageVersionsText>
      </S.MessageVersionsPagination>
      <S.MessageVersionsSwitchButton onClick={handleNext}>
        {'>'}
      </S.MessageVersionsSwitchButton>
    </S.MessageVersionsStyled>
  );
};
