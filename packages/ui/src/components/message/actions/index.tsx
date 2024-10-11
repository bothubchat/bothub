import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { UpdateIcon } from '@/ui/icons/update';
import { ResendIcon } from '@/ui/icons/resend';
import { EditIcon } from '@/ui/icons/edit';
import { TrashIcon } from '@/ui/icons/trash';

import * as S from './styled';
import { MessageVariant } from '../types';
import { MenuOption } from './menu-option';
import { CopyButton } from './copy-button';
import { ActionButton } from './action-button';

type MessageActionsProps = {
  variant: MessageVariant;
  disableResend?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  disableUpdate?: boolean;
  disableCopy?: boolean;
  editText?: string;
  resendText?: string;
  deleteText?: string;
  updateTooltipLabel?: string;
  copyTooltipLabel?: string;
  onEdit?: () => void;
  onResend?: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
  onCopy?: () => void;
};

export const MessageActions = ({
  variant = 'user',
  disableResend,
  disableEdit,
  disableDelete,
  disableUpdate,
  disableCopy,
  editText,
  resendText,
  deleteText,
  updateTooltipLabel,
  copyTooltipLabel,
  onEdit,
  onResend,
  onDelete,
  onUpdate,
  onCopy,
}: MessageActionsProps) => {
  const [menuShown, setMenuShown] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const handleButtonHoverIn = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setMenuShown(true);
  };
  const handleButtonHoverOut = () => {
    setTimeoutId(setTimeout(() => setMenuShown(false), 200));
  };

  const buttonVariant = {
    hover: {
      filter: 'brightness(1.2)',
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    tap: {
      filter: 'brightness(0.8)',
      translateY: 1,
      transition: {
        duration: 0.01,
        ease: 'easeInOut',
      },
    },
  };

  const modalStylesFramer = {
    initial: {
      opacity: 0,
      translateY: 45,
    },
    animate: {
      opacity: 1,
      translateY: 0,
    },
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
    exit: {
      opacity: 0,
      translateY: 45,
    },
  };

  return (
    <S.MessageActionsStyled $variant={variant}>
      <S.MessageActionsMenuStyled>
        <ActionButton
          variantsFramer={buttonVariant}
          onHoverStart={handleButtonHoverIn}
          onMouseLeave={handleButtonHoverOut}
        >
          <MenuDotIcon size={18} />
        </ActionButton>
        <AnimatePresence>
          {menuShown && (!disableEdit || !disableDelete) && (
            <S.MessageActionsMenuModal
              key="message-actions-modal"
              onHoverStart={handleButtonHoverIn}
              onHoverEnd={handleButtonHoverOut}
              $variant={variant}
              {...modalStylesFramer}
            >
              {!disableResend && variant === 'user' && (
                <MenuOption onHover={handleButtonHoverIn} onClick={onResend}>
                  <S.MessageActionsMenuModalOptionContent>
                    <ResendIcon fill="#616D8D" />
                    <S.MessageActionsButtonText>
                      {resendText}
                    </S.MessageActionsButtonText>
                  </S.MessageActionsMenuModalOptionContent>
                </MenuOption>
              )}
              {!disableEdit && (
                <MenuOption onHover={handleButtonHoverIn} onClick={onEdit}>
                  <S.MessageActionsMenuModalOptionContent>
                    <EditIcon />
                    <S.MessageActionsButtonText>
                      {editText}
                    </S.MessageActionsButtonText>
                  </S.MessageActionsMenuModalOptionContent>
                </MenuOption>
              )}
              {!disableDelete && (
                <MenuOption onHover={handleButtonHoverIn} onClick={onDelete}>
                  <S.MessageActionsMenuModalOptionContent>
                    <TrashIcon />
                    <S.MessageActionsButtonText>
                      {deleteText}
                    </S.MessageActionsButtonText>
                  </S.MessageActionsMenuModalOptionContent>
                </MenuOption>
              )}
            </S.MessageActionsMenuModal>
          )}
        </AnimatePresence>
      </S.MessageActionsMenuStyled>
      {!disableUpdate && variant !== 'user' && (
        <ActionButton
          variantsFramer={buttonVariant}
          onClick={onUpdate}
          onHoverStart={handleButtonHoverOut}
          tooltipLabel={updateTooltipLabel}
        >
          <UpdateIcon size={18} />
        </ActionButton>
      )}
      {!disableCopy && (
        <CopyButton
          framerVariant={buttonVariant}
          onCopy={onCopy}
          onHoverIn={handleButtonHoverOut}
          tooltipLabel={copyTooltipLabel}
        />
      )}
    </S.MessageActionsStyled>
  );
};
