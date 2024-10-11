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
  const buttonVariant = {
    hover: {
      whileHover: {
        opacity: 0.8,
      },
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <S.MessageAdditiveActionsStyled>
      <S.MessageAdditiveActionsButton
        onClick={onAdditionalActionMenuClick}
        whileHover="hover"
        variants={buttonVariant}
      >
        <MenuDotIcon size={18} />
      </S.MessageAdditiveActionsButton>
      <S.MessageAdditiveActionsButton
        onClick={onRecall}
        whileHover="hover"
        variants={buttonVariant}
      >
        <UpdateIcon size={18} />
      </S.MessageAdditiveActionsButton>
    </S.MessageAdditiveActionsStyled>
  );
};
