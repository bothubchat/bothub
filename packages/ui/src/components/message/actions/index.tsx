import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';

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
import { MoneyPlusIcon, ShieldIcon } from '@/ui/icons';
import { useMessageActionsMenu } from './hooks/useMessageActionsMenu';
import { useMessageActionsMenuPosition } from './hooks/useMessageActionsMenuPosition';

type MenuActionItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

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
  hasCacheTokens?: boolean;
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
  cacheTokenTooltipLabel?: string | null;
  onEdit?: MessageActionEditEventHandler;
  onResend?: MessageActionEventHandler;
  onDelete?: MessageActionEventHandler;
  onUpdate?: MessageActionEventHandler;
  onReport?: MessageActionEventHandler;
  onPlainTextCopy?: MessagePlainTextCopyEventHandler;
  onTgCopy?: MessageTgCopyEventHandler;
  onCopy?: MessageActionEventHandler;
  onDownload?: () => void;
  menuAriaLabel?: string | null;
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
  hasCacheTokens,
  editOutOfMenu,
  editText,
  copyTgText,
  copyPlainText,
  resendText,
  deleteText,
  onReportText,
  downloadTooltipLabel,
  encryptionTooltipLabel,
  cacheTokenTooltipLabel,
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
  menuAriaLabel,
}: MessageActionsProps) => {
  const theme = useTheme();
  const messageActionsRef = useRef<HTMLDivElement | null>(null);
  const messageActionsMenuRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useScrollbarRef();

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
        return !disableModal;
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

  const modalOptionsCount = useMemo(() => {
    let count = 0;

    if (!disableCopy && copyPlainText && onPlainTextCopy) {
      count += 1;
    }

    if (!disableCopy && copyTgText && onTgCopy) {
      count += 1;
    }

    if (!disableResend && variant === 'user' && resendText && onResend) {
      count += 1;
    }

    if (!editOutOfMenu && !disableEdit && editText && onEdit) {
      count += 1;
    }

    if (!disableDelete && deleteText && onDelete) {
      count += 1;
    }

    if (!disableDelete && onReportText && onReport && variant !== 'user') {
      count += 1;
    }

    return count;
  }, [
    copyPlainText,
    copyTgText,
    deleteText,
    disableCopy,
    disableDelete,
    disableEdit,
    disableResend,
    editOutOfMenu,
    editText,
    onDelete,
    onEdit,
    onPlainTextCopy,
    onReport,
    onReportText,
    onResend,
    onTgCopy,
    resendText,
    variant,
  ]);

  const { invertedX, invertedY, calculateInversion } =
    useMessageActionsMenuPosition({
      modalOptionsCount,
      variant,
      scrollRef,
      messageActionsRef,
      messageActionsMenuRef,
      modalRef,
    });

  const {
    menuShown,
    closeMenu,
    handleMenuOpen,
    handleButtonHoverIn,
    handleButtonHoverOut,
    handleButtonClick,
  } = useMessageActionsMenu({
    calculateInversion,
  });

  useLayoutEffect(() => {
    if (menuShown) {
      calculateInversion();
    }
  }, [menuShown, calculateInversion]);

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
      closeMenu();
    },
    [closeMenu, id, message, onDelete, onResend, onEdit, onUpdate, variant],
  );

  const handleTgCopy = useCallback(() => {
    onTgCopy?.();
    closeMenu();
  }, [closeMenu, onTgCopy]);

  const handlePlainTextCopy = useCallback(() => {
    onPlainTextCopy?.();
    closeMenu();
  }, [closeMenu, onPlainTextCopy]);

  const handleReportClick = useCallback(() => {
    onReport?.({ id, message });
    closeMenu();
  }, [closeMenu, id, message, onReport]);

  const menuActions = useMemo<MenuActionItem[]>(
    () => [
      ...(!disableCopy && copyPlainText && onPlainTextCopy
        ? [
            {
              id: 'copy-plain',
              label: copyPlainText,
              icon: <CopyIcon />,
              onClick: handlePlainTextCopy,
            },
          ]
        : []),
      ...(!disableCopy && copyTgText && onTgCopy
        ? [
            {
              id: 'copy-tg',
              label: copyTgText,
              icon: <CopyIcon />,
              onClick: handleTgCopy,
            },
          ]
        : []),
      ...(!disableResend && variant === 'user' && resendText && onResend
        ? [
            {
              id: 'resend',
              label: resendText,
              icon: <ResendIcon />,
              onClick: () => {
                handleOptionClick('resend');
              },
            },
          ]
        : []),
      ...(!editOutOfMenu && !disableEdit && editText && onEdit
        ? [
            {
              id: 'edit',
              label: editText,
              icon: <EditIcon />,
              onClick: () => {
                handleOptionClick('edit');
              },
            },
          ]
        : []),
      ...(!disableDelete && deleteText && onDelete
        ? [
            {
              id: 'delete',
              label: deleteText,
              icon: <TrashIcon />,
              onClick: () => {
                handleOptionClick('delete');
              },
            },
          ]
        : []),
      ...(!disableDelete && onReportText && onReport && variant !== 'user'
        ? [
            {
              id: 'report',
              label: onReportText,
              icon: <ThumbDownIcon size={18} />,
              onClick: handleReportClick,
            },
          ]
        : []),
    ],
    [
      copyPlainText,
      copyTgText,
      deleteText,
      disableCopy,
      disableDelete,
      disableEdit,
      disableResend,
      editOutOfMenu,
      editText,
      handleOptionClick,
      handlePlainTextCopy,
      handleReportClick,
      handleTgCopy,
      onDelete,
      onEdit,
      onPlainTextCopy,
      onReport,
      onReportText,
      onResend,
      onTgCopy,
      resendText,
      variant,
    ],
  );
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

  return (
    <S.MessageActionsStyled
      $variant={variant}
      ref={messageActionsRef}
    >
      <>
        <IconProvider fill={iconColor}>
          {modalEnabled && (
            <S.MessageActionsMenuStyled
              ref={messageActionsMenuRef}
              onBlur={() => {
                closeMenu();
              }}
            >
              <ActionButton
                tooltipLabel={menuAriaLabel}
                aria-expanded={menuShown}
                aria-haspopup="menu"
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
                      ref={modalRef}
                      onMouseEnter={handleMenuOpen}
                      onMouseLeave={handleButtonHoverOut}
                      $variant={variant}
                      $invertedX={invertedX}
                      $invertedY={invertedY}
                    >
                      {menuActions.map((action) => (
                        <MenuOption
                          key={`${action.id}-${action.label}`}
                          onClick={action.onClick}
                        >
                          <S.MessageActionsMenuModalOptionContent>
                            {action.icon}
                            <S.MessageActionsButtonText>
                              {action.label}
                            </S.MessageActionsButtonText>
                          </S.MessageActionsMenuModalOptionContent>
                        </MenuOption>
                      ))}
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
      {!disableDownload && (
        <ActionButton
          id={id}
          message={message}
          tooltipLabel={downloadTooltipLabel}
          onClick={
            onDownload
              ? () => {
                  onDownload();
                }
              : undefined
          }
        >
          <DownloadImgIcon size={18} />
        </ActionButton>
      )}
      {!disableEncryption && (
        <ActionButton tooltipLabel={encryptionTooltipLabel}>
          <ShieldIcon size={18} />
        </ActionButton>
      )}
      {hasCacheTokens && (
        <ActionButton tooltipLabel={cacheTokenTooltipLabel}>
          <IconProvider
            size={18}
            stroke={theme.colors.grayScale.gray1}
          >
            <MoneyPlusIcon />
          </IconProvider>
        </ActionButton>
      )}
    </S.MessageActionsStyled>
  );
};
