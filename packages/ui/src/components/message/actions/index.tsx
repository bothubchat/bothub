import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { easings, useTransition } from '@react-spring/web';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { UpdateIcon } from '@/ui/icons/update';
import { ResendIcon } from '@/ui/icons/resend';
import { EditIcon } from '@/ui/icons/edit';
import { TrashIcon } from '@/ui/icons/trash';
import { ThumbDownIcon } from '@/ui/icons/thumb-down';
import { CopyIcon } from '@/ui/icons/copy';
import { DownloadImgIcon } from '@/ui/icons/download-img';

import * as S from './styled';
import {
  MessageActionEditEventHandler,
  MessageActionEventHandler,
  MessagePlainTextCopyEventHandler,
  MessageTgCopyEventHandler,
  MessageVariant,
} from '../types';
import { MenuOption } from './menu-option';
import { CopyButton } from './copy-button';
import { ActionButton } from './action-button';

import { useScrollbarRef } from '../list';
import { ModalOption } from './types';

import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { colorToRgba } from '@/ui/utils';
import { ShieldIcon } from '@/ui/icons';

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
  disableEncryption?: boolean;
  editOutOfMenu?: boolean;
  editText?: string | null;
  copyTgText?: string | null;
  copyPlainText?: string | null;
  resendText?: string | null;
  deleteText?: string | null;
  onReportText?: string | null;
  downloadTooltipLabel?: string | null;
  updateTooltipLabel?: string | null;
  copyTooltipLabel?: string | null;
  encryptionTooltipLabel?: string | null;
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
  disableEncryption,
  editOutOfMenu,
  editText,
  copyTgText,
  copyPlainText,
  resendText,
  deleteText,
  onReportText,
  downloadTooltipLabel,
  encryptionTooltipLabel,
  updateTooltipLabel,
  copyTooltipLabel,
  onEdit,
  onResend,
  onDelete,
  onUpdate,
  onReport,
  onPlainTextCopy,
  onTgCopy,
  onCopy,
  onDownload,
}: MessageActionsProps) => {
  const theme = useTheme();

  const [menuShown, setMenuShown] = useState(false);
  const [invertedX, setInvertedX] = useState<boolean>(false);
  const [invertedY, setInvertedY] = useState<boolean>(false);

  const timeoutIdRef = useRef<number | null>(null);
  const messageActionsRef = useRef<HTMLDivElement | null>(null);
  const messageActionsMenuRef = useRef<HTMLDivElement | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

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
  }, [
    skeleton,
    variant,
    disableModal,
    disableEdit,
    disableDelete,
    disableResend,
  ]);

  const calculateInversion = useCallback(() => {
    const container = useScrollRef?.current?.element;
    const actions = messageActionsRef?.current;
    const modal = modalRef?.current;

    if (!container || !actions) return;

    const containerRect = container.getBoundingClientRect();
    const actionsRect = actions.getBoundingClientRect();

    const menuHeight = modal?.offsetHeight ?? 300;
    const menuWidth = modal?.offsetWidth ?? 160;

    const PADDING = 8;

    const spaceBelow = containerRect.bottom - actionsRect.bottom;
    const spaceAbove = actionsRect.top - containerRect.top;

    const shouldInvertY =
      spaceBelow < menuHeight + PADDING && spaceAbove > menuHeight + PADDING;

    const spaceLeft = actionsRect.left - containerRect.left;
    const spaceRight = containerRect.right - actionsRect.right;

    let shouldInvertX = false;
    if (variant === 'assistant') {
      shouldInvertX = spaceLeft < menuWidth + PADDING;
    } else {
      shouldInvertX = spaceRight < menuWidth + PADDING;
    }

    setInvertedY(shouldInvertY);
    setInvertedX(shouldInvertX);
  }, [variant, useScrollRef]);

  useLayoutEffect(() => {
    if (menuShown) {
      calculateInversion();
    }
  }, [menuShown, calculateInversion]);

  const handleButtonHoverIn = useCallback(() => {
    if (timeoutIdRef.current) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    setMenuShown(true);
  }, []);

  const handleButtonHoverOut = useCallback(() => {
    timeoutIdRef.current = window.setTimeout(() => {
      setMenuShown(false);
      timeoutIdRef.current = null;
    }, 300);
  }, []);

  const handleButtonClick = useCallback(() => {
    setMenuShown((prev) => !prev);
  }, []);

  const handleOptionClick = useCallback(
    (option: ModalOption) => {
      const data = {
        id,
        message,
      };
      switch (option) {
        case 'edit':
          onEdit?.({ id, message, variant });
          break;
        case 'delete':
          onDelete?.(data);
          break;
        case 'update':
          onUpdate?.({ id });
          break;
        case 'resend':
          onResend?.(data);
          break;
      }
      setMenuShown(false);
    },
    [id, message, onDelete, onResend, onEdit, onUpdate],
  );

  const handleTgCopy = useCallback(() => {
    onTgCopy?.();
    setMenuShown(false);
  }, [onTgCopy]);

  const handlePlainTextCopy = useCallback(() => {
    onPlainTextCopy?.();
    setMenuShown(false);
  }, [onPlainTextCopy]);

  const handleReportClick = useCallback(() => {
    onReport?.({ id, message });
    setMenuShown(false);
  }, [id, message, onReport]);

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
    if (!menuShown) return;

    const handleGlobalClose = () => {
      setMenuShown(false);
    };
    window.addEventListener('scroll', handleGlobalClose, true);
    return () => {
      window.removeEventListener('scroll', handleGlobalClose, true);
    };
  }, [menuShown]);

  useEffect(() => {
    if (!menuShown) return;

    const handleResize = () => {
      calculateInversion();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuShown, calculateInversion]);

  useEffect(
    () => () => {
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }
    },
    [],
  );

  return (
    <S.MessageActionsStyled
      $variant={variant}
      ref={messageActionsRef}
    >
      {
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
                  onMouseEnter={
                    'ontouchstart' in window ? undefined : handleButtonHoverIn
                  }
                  onMouseLeave={
                    'ontouchstart' in window ? undefined : handleButtonHoverOut
                  }
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
                        ref={modalRef} // ✅ Передаём ref на модалку
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
                    ),
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
      }
      {!disableDownload && (
        <ActionButton
          tooltipLabel={downloadTooltipLabel}
          onClick={onDownload}
        >
          <DownloadImgIcon size={18} />
        </ActionButton>
      )}
      {!disableEncryption && (
        <ActionButton tooltipLabel={encryptionTooltipLabel}>
          <ShieldIcon size={18} />
        </ActionButton>
      )}
    </S.MessageActionsStyled>
  );
};
