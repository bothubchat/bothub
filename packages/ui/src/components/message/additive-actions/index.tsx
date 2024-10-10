import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { UpdateIcon } from '@/ui/icons/update';

import * as S from './styled';

export const MessageAdditiveActions = ({
  onAdditionalActionMenuClick,
  onRecall,
}: {
  onAdditionalActionMenuClick?: () => void;
  onRecall?: () => void;
}) => {
  return (
    <S.MessageAdditiveActionsStyled>
      <S.MessageAdditiveActionsButton onClick={onAdditionalActionMenuClick}>
        <MenuDotIcon size={18} />
      </S.MessageAdditiveActionsButton>
      <S.MessageAdditiveActionsButton onClick={onRecall}>
        <UpdateIcon size={18} />
      </S.MessageAdditiveActionsButton>
    </S.MessageAdditiveActionsStyled>
  );
};
