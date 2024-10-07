import { UpdateIcon, MenuDotIcon } from '@/ui/icons';

import * as S from './styled';

export const MessageAdditiveActions = ({
  onAdditiveActionMenuClick,
  onRecall,
}: {
  onAdditiveActionMenuClick?: () => void;
  onRecall?: () => void;
}) => {
  return (
    <S.MessageAdditiveActionsStyled>
      <S.MessageAdditiveActionsButton onClick={onAdditiveActionMenuClick}>
        <MenuDotIcon size={18} />
      </S.MessageAdditiveActionsButton>
      <S.MessageAdditiveActionsButton onClick={onRecall}>
        <UpdateIcon size={18} />
      </S.MessageAdditiveActionsButton>
    </S.MessageAdditiveActionsStyled>
  );
};
