import * as S from './styled';
import { ChevronRightLineIcon } from '@/ui/icons/chevron-right-line';

import { MessageVariant, MessageVersionEventHandler } from '../types';

const ICON_SIZE = 14;

export type MessageVersionsType = {
  id?: string;
  /** Не используется: переключатель стоит в строке действий у любого сообщения */
  // eslint-disable-next-line react/no-unused-prop-types
  variant?: MessageVariant;
  version?: number;
  totalVersions?: number;
  onNextVersion?: MessageVersionEventHandler;
  onPrevVersion?: MessageVersionEventHandler;
};

export const MessageVersions = ({
  id,
  version,
  totalVersions,
  onNextVersion,
  onPrevVersion,
}: MessageVersionsType) => {
  if (typeof version !== 'number' || typeof totalVersions !== 'number') {
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
    <S.MessageVersionsStyled>
      <S.MessageVersionsSwitchButton
        type="button"
        disabled={version === 1}
        onClick={handlePrev}
      >
        <S.MessageVersionsPrevIcon>
          <ChevronRightLineIcon size={ICON_SIZE} />
        </S.MessageVersionsPrevIcon>
      </S.MessageVersionsSwitchButton>
      <S.MessageVersionsPagination>
        <S.MessageVersionsText>{version}</S.MessageVersionsText>
        <S.MessageVersionsText>/</S.MessageVersionsText>
        <S.MessageVersionsText>{totalVersions}</S.MessageVersionsText>
      </S.MessageVersionsPagination>
      <S.MessageVersionsSwitchButton
        type="button"
        disabled={version === totalVersions}
        onClick={handleNext}
      >
        <ChevronRightLineIcon size={ICON_SIZE} />
      </S.MessageVersionsSwitchButton>
    </S.MessageVersionsStyled>
  );
};
