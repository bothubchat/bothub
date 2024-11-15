import { useEffect, useRef, useState } from 'react';

import { easings, useTransition } from '@react-spring/web';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { UpdateIcon } from '@/ui/icons/update';
import { ResendIcon } from '@/ui/icons/resend';
import { EditIcon } from '@/ui/icons/edit';
import { TrashIcon } from '@/ui/icons/trash';

import * as S from './styled';
import { MessageActionEventHandler, MessageVariant } from '../types';
import { MenuOption } from './menu-option';
import { CopyButton } from './copy-button';
import { ActionButton } from './action-button';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { CloseIcon } from '@/ui/icons/close';

type MessageActionsProps = {
  id?: string;
  message?: string;
  variant?: MessageVariant;
  skeleton?: boolean;
  disableResend?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  disableUpdate?: boolean;
  disableCopy?: boolean;
  editText?: string;
  resendText?: string;
  deleteText?: string;
  submitEditTooltipLabel?: string;
  discardEditTooltipLabel?: string;
  updateTooltipLabel?: string;
  copyTooltipLabel?: string;
  editing?: boolean;
  editedText?: string;
  setEditing?: (value: boolean) => unknown;
  setEditedText?: (value: string) => unknown;
  onEdit?: MessageActionEventHandler;
  onResend?: MessageActionEventHandler;
  onDelete?: MessageActionEventHandler;
  onUpdate?: MessageActionEventHandler;
  onCopy?: MessageActionEventHandler;
};

type ModalOption = 'edit' | 'resend' | 'delete';

export const MessageActions = ({
  id,
  message,
  variant = 'user',
  skeleton,
  disableResend,
  disableEdit,
  disableDelete,
  disableUpdate,
  disableCopy,
  editText,
  resendText,
  deleteText,
  submitEditTooltipLabel,
  discardEditTooltipLabel,
  updateTooltipLabel,
  copyTooltipLabel,
  editing,
  editedText,
  setEditing,
  setEditedText,
  onEdit,
  onResend,
  onDelete,
  onUpdate,
  onCopy,
}: MessageActionsProps) => {
  const [menuShown, setMenuShown] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [invertedX, setInvertedX] = useState<boolean>(false);
  const [invertedY, setInvertedY] = useState<boolean>(false);
  const messageActionsRef = useRef<HTMLDivElement | null>(null);
  const messageActionsMenuRef = useRef<HTMLDivElement | null>(null);

  const modalEnabled = () => {
    if (skeleton) {
      return false;
    }
    switch (variant) {
      case 'assistant':
        return !disableEdit || !disableDelete;
      case 'user':
        return !disableEdit || !disableDelete || !disableResend;
    }
  };

  const handleInvertedModalState = () => {
    const messagesScroll = document.getElementById(
      'messages-scrollbar-content'
    );
    const scrollHeight = messagesScroll?.scrollHeight ?? 0;
    const scrollWidth = messagesScroll?.scrollWidth ?? 0;
    const offsetTop = messageActionsRef.current?.offsetTop ?? 0;
    const offsetLeft = messageActionsRef.current?.offsetLeft ?? 0;
    if (scrollHeight - offsetTop <= 180) {
      setInvertedY(true);
    } else {
      setInvertedY(false);
    }
    if (offsetLeft <= 160 || scrollWidth - offsetLeft <= 160) {
      setInvertedX(true);
    } else {
      setInvertedX(false);
    }
  };

  const handleButtonHoverIn = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    handleInvertedModalState();
    setMenuShown(true);
  };

  const handleButtonHoverOut = () => {
    setTimeoutId(setTimeout(() => setMenuShown(false), 300));
  };

  const handleButtonClick = () => {
    handleInvertedModalState();
    setMenuShown(!menuShown);
  };

  const handleOptionClick = (option: ModalOption) => {
    const data = {
      id,
      message,
    };
    switch (option) {
      case 'edit':
        setEditing?.(true);
        setEditedText?.(message ?? '');
        break;
      case 'delete':
        onDelete?.(data);
        break;
      case 'resend':
        onResend?.(data);
        break;
    }
    setMenuShown(false);
  };

  const handleConfirmEdit = ({
    id,
    message,
  }: {
    id?: string;
    message?: string;
  }) => {
    setEditing?.(false);
    onEdit?.({ id, message });
  };
  const handleDiscardEdit = () => {
    setEditing?.(false);
    setEditedText?.(message ?? '');
  };

  const handleClickOutsideButton = (
    e: MouseEvent,
    el: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    if (!el?.current?.contains(e.target as Node)) {
      setMenuShown(false);
    }
  };

  const modalTransition = useTransition(menuShown, {
    from: {
      opacity: 0,
      y: 5,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: 0,
    },
    config: {
      duration: 250,
      easing: easings.easeOutSine,
    },
  });

  useEffect(() => {
    document.addEventListener('mousedown', (e: MouseEvent) => handleClickOutsideButton(e, messageActionsMenuRef));
    return () => {
      document.removeEventListener('mousedown', (e: MouseEvent) => handleClickOutsideButton(e, messageActionsMenuRef));
    };
  }, []);

  return (
    <S.MessageActionsStyled $variant={variant} ref={messageActionsRef}>
      {!editing ? (
        <>
          {modalEnabled() && (
            <S.MessageActionsMenuStyled ref={messageActionsMenuRef}>
              <ActionButton
                onMouseEnter={handleButtonHoverIn}
                onMouseLeave={handleButtonHoverOut}
                onClick={handleButtonClick}
              >
                <MenuDotIcon size={18} />
              </ActionButton>
              {modalTransition(
                (style, show) => show && (
                  <S.MessageActionsMenuModal
                    style={style}
                    key="message-actions-modal"
                    onMouseEnter={handleButtonHoverIn}
                    onMouseLeave={handleButtonHoverOut}
                    $variant={variant}
                    $invertedX={invertedX}
                    $invertedY={invertedY}
                  >
                    {!disableResend && variant === 'user' && (
                      <MenuOption
                        onClick={() => {
                          handleOptionClick('resend');
                        }}
                      >
                        <S.MessageActionsMenuModalOptionContent>
                          <ResendIcon fill="#616D8D" />
                          <S.MessageActionsButtonText>
                            {resendText}
                          </S.MessageActionsButtonText>
                        </S.MessageActionsMenuModalOptionContent>
                      </MenuOption>
                    )}
                    {!disableEdit && (
                      <MenuOption
                        onClick={() => {
                          handleOptionClick('edit');
                        }}
                      >
                        <S.MessageActionsMenuModalOptionContent>
                          <EditIcon />
                          <S.MessageActionsButtonText>
                            {editText}
                          </S.MessageActionsButtonText>
                        </S.MessageActionsMenuModalOptionContent>
                      </MenuOption>
                    )}
                    {!disableDelete && (
                      <MenuOption
                        onClick={() => {
                          handleOptionClick('delete');
                        }}
                      >
                        <S.MessageActionsMenuModalOptionContent>
                          <TrashIcon />
                          <S.MessageActionsButtonText>
                            {deleteText}
                          </S.MessageActionsButtonText>
                        </S.MessageActionsMenuModalOptionContent>
                      </MenuOption>
                    )}
                  </S.MessageActionsMenuModal>
                )
              )}
            </S.MessageActionsMenuStyled>
          )}
          {!disableUpdate && variant !== 'user' && (
            <ActionButton
              id={id}
              message={message}
              onClick={onUpdate}
              tooltipLabel={updateTooltipLabel}
            >
              <UpdateIcon size={18} />
            </ActionButton>
          )}
          {!disableCopy && (
            <CopyButton
              onCopy={onCopy}
              tooltipLabel={copyTooltipLabel}
            />
          )}
        </>
      ) : (
        <S.MessageEditButtonsStyled>
          <ActionButton
            id={id}
            message={editedText}
            tooltipLabel={submitEditTooltipLabel}
            onClick={handleConfirmEdit}
          >
            <CheckSmallIcon size={20} fill="#1c64f2" />
          </ActionButton>
          <ActionButton
            tooltipLabel={discardEditTooltipLabel}
            onClick={handleDiscardEdit}
          >
            <CloseIcon size={14} fill="#616D8D" />
          </ActionButton>
        </S.MessageEditButtonsStyled>
      )}
    </S.MessageActionsStyled>
  );
};
