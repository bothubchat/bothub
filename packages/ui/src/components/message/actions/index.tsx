import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { easings, useTransition } from '@react-spring/web';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { UpdateIcon } from '@/ui/icons/update';
import { ResendIcon } from '@/ui/icons/resend';
import { EditIcon } from '@/ui/icons/edit';
import { TrashIcon } from '@/ui/icons/trash';
import { ThumbDownIcon } from '@/ui/icons/thumb-down';
import { CheckSmallIcon } from '@/ui/icons/check-small';
import { CloseIcon } from '@/ui/icons/close';
import { CopyIcon } from '@/ui/icons/copy';
import { DownloadImgIcon } from '@/ui/icons/download-img';

import * as S from './styled';
import {
  MessageActionEditEventHandler,
  MessageActionEventHandler,
  MessagePlainTextCopyEventHandler,
  MessageTgCopyEventHandler,
  MessageVariant
} from '../types';
import { MenuOption } from './menu-option';
import { CopyButton } from './copy-button';
import { ActionButton } from './action-button';

import { useScrollbarRef } from '../list';
import { ModalOption } from './types';

import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { colorToRgba } from '@/ui/utils';

type MessageActionsProps = {
  id?: string;
  message?: string;
  variant?: MessageVariant;
  skeleton?: boolean;
  disableModal?: boolean;
  disableResend?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  disableUpdate?: boolean;
  disableCopy?: boolean;
  disableDownload?: boolean;
  editOutOfMenu?: boolean;
  editText?: string | null;
  copyTgText?: string | null;
  copyPlainText?: string | null;
  resendText?: string | null;
  deleteText?: string | null;
  onReportText?: string | null;
  downloadTooltipLabel?: string | null;
  submitEditTooltipLabel?: string | null;
  discardEditTooltipLabel?: string | null;
  updateTooltipLabel?: string | null;
  copyTooltipLabel?: string | null;
  editing?: boolean;
  editedText?: string;
  messageRef?: MutableRefObject<HTMLDivElement | null>;
  onEditing?: (value: boolean) => unknown;
  onEditedText?: (value: string) => unknown;
  onEdit?: MessageActionEditEventHandler;
  onResend?: MessageActionEventHandler;
  onDelete?: MessageActionEventHandler;
  onUpdate?: MessageActionEventHandler;
  onReport?: MessageActionEventHandler;
  onPlainTextCopy?: MessagePlainTextCopyEventHandler;
  onTgCopy?: MessageTgCopyEventHandler;
  onCopy?: MessageActionEventHandler;
  onDownload?: () => void;
};

export const MessageActions = ({
  id,
  disableModal,
  message,
  variant = 'user',
  skeleton,
  disableResend,
  disableEdit,
  disableDelete,
  disableUpdate,
  disableCopy,
  disableDownload,
  editOutOfMenu,
  editText,
  copyTgText,
  copyPlainText,
  resendText,
  deleteText,
  onReportText,
  downloadTooltipLabel,
  submitEditTooltipLabel,
  discardEditTooltipLabel,
  updateTooltipLabel,
  copyTooltipLabel,
  editing,
  editedText,
  messageRef,
  onEditing,
  onEditedText,
  onEdit,
  onResend,
  onDelete,
  onUpdate,
  onReport,
  onPlainTextCopy,
  onTgCopy,
  onCopy,
  onDownload
}: MessageActionsProps) => {
  const theme = useTheme();

  const [menuShown, setMenuShown] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();
  const [invertedX, setInvertedX] = useState<boolean>(false);
  const [invertedY, setInvertedY] = useState<boolean>(false);
  const messageActionsRef = useRef<HTMLDivElement | null>(null);
  const messageActionsMenuRef = useRef<HTMLDivElement | null>(null);

  const useScrollRef = useScrollbarRef();

  const iconColor = useMemo(() => {
    if (theme.scheme === 'custom') {
      return colorToRgba(theme.colors.custom.icon, 0.75);
    }

    return theme.scheme === 'standard' || theme.mode === 'light'
      ? theme.colors.grayScale.gray1
      : theme.colors.accent.primary;
  }, [theme]);

  const modalEnabled = useMemo(() => {
    if (skeleton) {
      return false;
    }
    switch (variant) {
      case 'assistant':
        return !disableEdit;
      case 'user':
        return disableModal
          ? false
          : !disableEdit || !disableDelete || !disableResend;
    }
  }, [disableEdit, disableDelete, disableResend]);

  const handleInvertedModalState = () => {
    const scrollHeight = useScrollRef?.current?.element?.scrollHeight ?? 0;
    const scrollWidth = messageRef?.current?.scrollWidth ?? 0;
    const offsetTop = messageActionsRef.current?.offsetTop ?? 0;
    const offsetLeft = messageActionsRef.current?.offsetLeft ?? 0;
    setInvertedY(scrollHeight - offsetTop <= 300);
    setInvertedX(
      (variant === 'assistant' && scrollWidth - offsetLeft <= 160) ||
        (variant === 'user' && offsetLeft <= 160)
    );
  };

  const handleButtonHoverIn = useCallback(() => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    handleInvertedModalState();
    setMenuShown(true);
  }, [timeoutId]);

  const handleButtonHoverOut = useCallback(() => {
    setTimeoutId(window.setTimeout(() => setMenuShown(false), 300));
  }, []);

  const handleButtonClick = useCallback(() => {
    handleInvertedModalState();
    setMenuShown(!menuShown);
  }, [menuShown]);

  const handleOptionClick = useCallback(
    (option: ModalOption) => {
      const data = {
        id,
        message
      };
      switch (option) {
        case 'edit':
          onEditing?.(true);
          onEditedText?.(message ?? '');
          break;
        case 'delete':
          onDelete?.(data);
          break;
        case 'resend':
          onResend?.(data);
          break;
      }
      setMenuShown(false);
    },
    [id, message]
  );

  const handleConfirmEdit = useCallback(
    ({ id, message }: { id?: string; message?: string }) => {
      onEditing?.(false);
      onEdit?.({ id, message, variant });
    },
    [id, message]
  );
  const handleDiscardEdit = useCallback(() => {
    onEditing?.(false);
    onEditedText?.(message ?? '');
  }, [message]);

  const handleTgCopy = useCallback(() => {
    onTgCopy?.();
    setMenuShown(false);
  }, []);

  const handlePlainTextCopy = useCallback(() => {
    onPlainTextCopy?.();
    setMenuShown(false);
  }, []);

  const handleReportClick = useCallback(() => {
    onReport?.({ id, message });
    setMenuShown(false);
  }, [id, message]);

  const modalTransition = useTransition(menuShown, {
    from: {
      opacity: 0,
      y: 5
    },
    enter: {
      opacity: 1,
      y: 0
    },
    leave: {
      opacity: 0,
      y: 0
    },
    config: {
      duration: 250,
      easing: easings.easeOutSine
    }
  });

  useEffect(() => {
    const handleGlobalClose = () => {
      setMenuShown(false);
    };
    window.addEventListener('scroll', handleGlobalClose, true);
    return () => {
      window.removeEventListener('scroll', handleGlobalClose, true);
    };
  }, [menuShown]);

  useEffect(() => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  }, []);

  return (
    <S.MessageActionsStyled
      $variant={variant}
      ref={messageActionsRef}
    >
      {!editing ? (
        <>
          <IconProvider fill={iconColor}>
            {modalEnabled && (
              <S.MessageActionsMenuStyled
                ref={messageActionsMenuRef}
                onBlur={() => {
                  setMenuShown(false);
                }}
              >
                <ActionButton
                  onMouseEnter={handleButtonHoverIn}
                  onMouseLeave={handleButtonHoverOut}
                  onClick={handleButtonClick}
                >
                  <MenuDotIcon size={18} />
                </ActionButton>
                {modalTransition(
                  (style, show) =>
                    show && (
                      <S.MessageActionsMenuModal
                        style={style}
                        key="message-actions-modal"
                        onMouseEnter={handleButtonHoverIn}
                        onMouseLeave={handleButtonHoverOut}
                        $variant={variant}
                        $invertedX={invertedX}
                        $invertedY={invertedY}
                      >
                        {!disableCopy && copyPlainText && onPlainTextCopy && (
                          <MenuOption onClick={handlePlainTextCopy}>
                            <S.MessageActionsMenuModalOptionContent>
                              <CopyIcon />
                              <S.MessageActionsButtonText>
                                {copyPlainText}
                              </S.MessageActionsButtonText>
                            </S.MessageActionsMenuModalOptionContent>
                          </MenuOption>
                        )}
                        {!disableCopy && copyTgText && onTgCopy && (
                          <MenuOption onClick={handleTgCopy}>
                            <S.MessageActionsMenuModalOptionContent>
                              <CopyIcon />
                              <S.MessageActionsButtonText>
                                {copyTgText}
                              </S.MessageActionsButtonText>
                            </S.MessageActionsMenuModalOptionContent>
                          </MenuOption>
                        )}
                        {!disableResend &&
                          variant === 'user' &&
                          resendText &&
                          onResend && (
                            <MenuOption
                              onClick={() => {
                                handleOptionClick('resend');
                              }}
                            >
                              <S.MessageActionsMenuModalOptionContent>
                                <ResendIcon />
                                <S.MessageActionsButtonText>
                                  {resendText}
                                </S.MessageActionsButtonText>
                              </S.MessageActionsMenuModalOptionContent>
                            </MenuOption>
                          )}
                        {!editOutOfMenu &&
                          !disableEdit &&
                          editText &&
                          onEdit && (
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
                        {!disableDelete && deleteText && onDelete && (
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
                        {!disableDelete &&
                          onReportText &&
                          onReport &&
                          variant !== 'user' && (
                            <MenuOption onClick={handleReportClick}>
                              <S.MessageActionsMenuModalOptionContent>
                                <ThumbDownIcon size={18} />
                                <S.MessageActionsButtonText>
                                  {onReportText}
                                </S.MessageActionsButtonText>
                              </S.MessageActionsMenuModalOptionContent>
                            </MenuOption>
                          )}
                      </S.MessageActionsMenuModal>
                    )
                )}
              </S.MessageActionsMenuStyled>
            )}
            {!modalEnabled && !disableDelete && (
              <ActionButton
                id={id}
                message={message}
                onClick={onDelete}
                tooltipLabel={deleteText}
              >
                <TrashIcon size={20} />
              </ActionButton>
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
            {editOutOfMenu && (
              <ActionButton
                id={id}
                message={message}
                onClick={() => {
                  handleOptionClick('edit');
                }}
                tooltipLabel={editText}
              >
                <EditIcon size={18} />
              </ActionButton>
            )}
            {!disableCopy && (
              <CopyButton
                onCopy={onCopy}
                tooltipLabel={copyTooltipLabel}
              />
            )}
            {!modalEnabled &&
              !disableDelete &&
              onReportText &&
              onReport &&
              variant !== 'user' && (
                <ActionButton
                  tooltipLabel={onReportText}
                  onClick={handleReportClick}
                >
                  <ThumbDownIcon size={18} />
                </ActionButton>
              )}
          </IconProvider>
        </>
      ) : (
        <S.MessageEditButtonsStyled>
          <ActionButton
            id={id}
            message={editedText}
            tooltipLabel={submitEditTooltipLabel}
            onClick={handleConfirmEdit}
          >
            <CheckSmallIcon
              size={20}
              fill={theme.colors.accent.primary}
            />
          </ActionButton>
          <ActionButton
            tooltipLabel={discardEditTooltipLabel}
            onClick={handleDiscardEdit}
          >
            <CloseIcon
              size={14}
              fill={theme.colors.grayScale.gray2}
            />
          </ActionButton>
        </S.MessageEditButtonsStyled>
      )}
      {!disableDownload && (
        <ActionButton
          tooltipLabel={downloadTooltipLabel}
          onClick={onDownload}
        >
          <DownloadImgIcon size={18} />
        </ActionButton>
      )}
    </S.MessageActionsStyled>
  );
};
