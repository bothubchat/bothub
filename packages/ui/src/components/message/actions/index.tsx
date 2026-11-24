import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { easings, useTransition } from '@react-spring/web';
import { DotsLineIcon } from '@/ui/icons/dots-line';
import { RefreshLineIcon } from '@/ui/icons/refresh-line';
import { PencilLineIcon } from '@/ui/icons/pencil-line';
import { TrashLineIcon } from '@/ui/icons/trash-line';
import { ThumbDownLineIcon } from '@/ui/icons/thumb-down-line';
import { CopyLineIcon } from '@/ui/icons/copy-line';
import { ShieldLineIcon } from '@/ui/icons/shield-line';
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
import { ForkButton } from './fork-button';
import { ActionButton } from './action-button';
import { ACTION_ICON_SIZE } from './constants';

import { useScrollbarRef } from '../list';
import { MessageActionsReserve } from '../styled';
import { ModalOption } from './types';
import { ActionMenuPlacement } from './placement';
import { flattenActions, useActionsOverflow } from './overflow';
import { MessageActionsSheet } from './sheet';
import { matchesMedia } from './media';

import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { colorToRgba, useOnClickOutside } from '@/ui/utils';
import { MoneyPlusIcon } from '@/ui/icons/money-plus';

const MENU_OFFSET = 36;
const MENU_PADDING = 8;
const MENU_ESTIMATED_WIDTH = 160;
const MENU_ESTIMATED_OPTION_HEIGHT = 48;
const MENU_ESTIMATED_VERTICAL_PADDING = 16;

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
  disableFork?: boolean;
  disableDownload?: boolean;
  disableEncryption?: boolean;
  hasCacheTokens?: boolean;
  forkSelected?: boolean;
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
  forkTooltipLabel?: string | null;
  encryptionTooltipLabel?: string | null;
  cacheTokenTooltipLabel?: string | null;
  onEdit?: MessageActionEditEventHandler;
  onResend?: MessageActionEventHandler;
  onDelete?: MessageActionEventHandler;
  onUpdate?: MessageActionEventHandler;
  onReport?: MessageActionEventHandler;
  onFork?: MessageActionEventHandler;
  onPlainTextCopy?: MessagePlainTextCopyEventHandler;
  onTgCopy?: MessageTgCopyEventHandler;
  onCopy?: MessageActionEventHandler;
  onDownload?: () => void;
  /** Имя кнопки «ещё» для скринридера и заголовок шторки на телефоне */
  menuAriaLabel?: string | null;
  /** Свои действия потребителя: встают между «повторить» и «форк» */
  addon?: React.ReactNode;
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
  disableFork = true,
  disableDownload,
  disableEncryption,
  hasCacheTokens,
  forkSelected = false,
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
  forkTooltipLabel,
  onEdit,
  onResend,
  onDelete,
  onUpdate,
  onReport,
  onFork,
  onPlainTextCopy,
  onTgCopy,
  onCopy,
  onDownload,
  menuAriaLabel,
  addon,
}: MessageActionsProps) => {
  const theme = useTheme();

  const [menuShown, setMenuShown] = useState(false);
  // На телефоне меню открывается шторкой снизу, а не окошком у кнопки
  const [isSheet, setIsSheet] = useState(false);
  const [invertedX, setInvertedX] = useState<boolean>(false);
  const [invertedY, setInvertedY] = useState<boolean>(false);

  const timeoutIdRef = useRef<number | null>(null);
  const messageActionsMenuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const useScrollRef = useScrollbarRef();

  const iconColor = useMemo(() => {
    if (theme.scheme === 'custom') {
      return colorToRgba(theme.colors.custom.icon, 0.75);
    }

    return theme.scheme === 'standard' || theme.mode === 'light'
      ? theme.tokens.textSecondary
      : theme.colors.accent.primary;
  }, [theme]);

  // Под пузырём пользователя ряд ниже и виден по наведению
  const compact = variant === 'user';

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

  const closeMenu = useCallback(() => {
    setMenuShown(false);
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
    [id, message, variant, onDelete, onResend, onEdit, onUpdate],
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

  // Порядок из макета: копировать, повторить, свои действия (оценка), форк,
  // остальное. Когда ряду тесно, действия уходят в меню «ещё» с конца
  const actions = [
    !disableCopy && (
      <CopyButton
        key="copy"
        compact={compact}
        onCopy={onCopy}
        tooltipLabel={copyTooltipLabel}
      />
    ),
    !disableUpdate && variant !== 'user' && (
      <ActionButton
        key="update"
        id={id}
        message={message}
        onClick={onUpdate}
        tooltipLabel={updateTooltipLabel}
      >
        <RefreshLineIcon size={ACTION_ICON_SIZE} />
      </ActionButton>
    ),
    editOutOfMenu && (
      <ActionButton
        key="edit"
        id={id}
        message={message}
        compact={compact}
        onClick={() => {
          handleOptionClick('edit');
        }}
        tooltipLabel={editText}
      >
        <PencilLineIcon size={ACTION_ICON_SIZE} />
      </ActionButton>
    ),
    ...flattenActions(addon, 'addon'),
    !disableFork && (
      <ForkButton
        key="fork"
        id={id}
        message={message}
        selected={forkSelected}
        compact={compact}
        tooltipLabel={forkTooltipLabel}
        onFork={onFork}
      />
    ),
    !modalEnabled && !disableDelete && (
      <ActionButton
        key="delete"
        id={id}
        message={message}
        compact={compact}
        onClick={onDelete}
        tooltipLabel={deleteText}
      >
        <TrashLineIcon size={ACTION_ICON_SIZE} />
      </ActionButton>
    ),
    !modalEnabled &&
      !disableDelete &&
      !!onReportText &&
      !!onReport &&
      variant !== 'user' && (
        <ActionButton
          key="report"
          tooltipLabel={onReportText}
          onClick={handleReportClick}
        >
          <ThumbDownLineIcon size={ACTION_ICON_SIZE} />
        </ActionButton>
      ),
    !disableDownload && (
      <ActionButton
        key="download"
        compact={compact}
        tooltipLabel={downloadTooltipLabel}
        onClick={onDownload}
      >
        <IconProvider fill={iconColor}>
          <DownloadImgIcon size={ACTION_ICON_SIZE} />
        </IconProvider>
      </ActionButton>
    ),
    !disableEncryption && (
      <ActionButton
        key="encryption"
        compact={compact}
        tooltipLabel={encryptionTooltipLabel}
      >
        <ShieldLineIcon size={ACTION_ICON_SIZE} />
      </ActionButton>
    ),
    hasCacheTokens && (
      <ActionButton
        key="cache"
        compact={compact}
        tooltipLabel={cacheTokenTooltipLabel}
      >
        <IconProvider
          size={ACTION_ICON_SIZE}
          stroke={iconColor}
        >
          <MoneyPlusIcon />
        </IconProvider>
      </ActionButton>
    ),
  ].filter(Boolean);

  const { rowRef, reserveRef, visibleCount, hiddenCount, reserveWidth } =
    useActionsOverflow(actions.length, modalEnabled);
  const hasMenu = modalEnabled || hiddenCount > 0;
  const menuOptionsCount = (modalEnabled ? modalOptionsCount : 0) + hiddenCount;

  const calculateInversion = useCallback(() => {
    const container = useScrollRef?.current?.element;
    const anchor = messageActionsMenuRef.current ?? rowRef.current;
    const modal = modalRef?.current;

    if (!container || !anchor) return;

    const containerRect = container.getBoundingClientRect();
    const actionsRect = anchor.getBoundingClientRect();

    const menuHeight =
      modal?.offsetHeight ??
      menuOptionsCount * MENU_ESTIMATED_OPTION_HEIGHT +
        MENU_ESTIMATED_VERTICAL_PADDING;
    const menuWidth = modal?.offsetWidth ?? MENU_ESTIMATED_WIDTH;

    const spaceBelow = containerRect.bottom - actionsRect.bottom;
    const spaceAbove = actionsRect.top - containerRect.top;

    const shouldInvertY =
      spaceBelow < menuHeight + MENU_OFFSET + MENU_PADDING &&
      spaceAbove > MENU_PADDING;

    // The menu opens from its own button: to the right under a reply, to the
    // left under a user bubble, and flips when it would leave the feed.
    const spaceToRight = containerRect.right - actionsRect.left;
    const spaceToLeft = actionsRect.right - containerRect.left;
    const shouldInvertX =
      (variant === 'assistant' ? spaceToRight : spaceToLeft) <
      menuWidth + MENU_PADDING;

    setInvertedY(shouldInvertY);
    setInvertedX(shouldInvertX);
  }, [menuOptionsCount, rowRef, useScrollRef, variant]);

  useLayoutEffect(() => {
    if (menuShown && !isSheet) {
      calculateInversion();
    }
  }, [menuShown, isSheet, calculateInversion]);

  const isPhone = useCallback(
    () => matchesMedia(`(max-width: ${theme.mobile.maxWidth})`),
    [theme.mobile.maxWidth],
  );

  const handleMenuOpen = useCallback(() => {
    if (timeoutIdRef.current) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    const sheet = isPhone();

    setIsSheet(sheet);
    if (!sheet) {
      calculateInversion();
    }
    setMenuShown(true);
  }, [calculateInversion, isPhone]);

  const handleButtonHoverOut = useCallback(() => {
    timeoutIdRef.current = window.setTimeout(() => {
      setMenuShown(false);
      timeoutIdRef.current = null;
    }, 300);
  }, []);

  // Only a mouse opens the menu on hover: on touch the hover would open it
  // right before the click toggles it closed. A sheet opens by a press only.
  const handleButtonPointerEnter = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === 'mouse' && !isPhone()) {
        handleMenuOpen();
      }
    },
    [handleMenuOpen, isPhone],
  );

  const handleButtonPointerLeave = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === 'mouse' && !isSheet) {
        handleButtonHoverOut();
      }
    },
    [handleButtonHoverOut, isSheet],
  );

  const handleButtonClick = useCallback(() => {
    if (menuShown) {
      setMenuShown(false);
      return;
    }

    handleMenuOpen();
  }, [handleMenuOpen, menuShown]);

  const handleMenuBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      // The sheet lives in the body and is closed by its backdrop. Focus
      // moving to an option must not close the menu before the click.
      if (!isSheet && !event.currentTarget.contains(event.relatedTarget)) {
        setMenuShown(false);
      }
    },
    [isSheet],
  );

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape' && menuShown) {
        setMenuShown(false);
        menuButtonRef.current?.focus();
      }
    },
    [menuShown],
  );

  // Blur doesn't close the menu where buttons don't take focus on click (Safari).
  useOnClickOutside(messageActionsMenuRef, closeMenu, menuShown && !isSheet);

  const modalTransition = useTransition(menuShown && !isSheet, {
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
    // The sheet has its own list that may scroll
    if (!menuShown || isSheet) return;

    window.addEventListener('scroll', closeMenu, true);
    return () => {
      window.removeEventListener('scroll', closeMenu, true);
    };
  }, [menuShown, isSheet, closeMenu]);

  useEffect(() => {
    if (!menuShown || isSheet) return;

    const handleResize = () => {
      calculateInversion();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuShown, isSheet, calculateInversion]);

  useEffect(
    () => () => {
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }
    },
    [],
  );

  if (actions.length === 0 && !hasMenu) {
    return null;
  }

  // Сначала действия, которым не хватило места в ряду, затем свои пункты меню
  const options = (
    <>
      {hiddenCount > 0 && (
        <ActionMenuPlacement onSelect={closeMenu}>
          {actions.slice(visibleCount)}
        </ActionMenuPlacement>
      )}
      {hiddenCount > 0 && modalEnabled && modalOptionsCount > 0 && (
        <S.MessageActionsMenuDivider aria-hidden />
      )}
      {modalEnabled && (
        <>
          {!disableCopy && copyPlainText && onPlainTextCopy && (
            <MenuOption onClick={handlePlainTextCopy}>
              <S.MessageActionsMenuModalOptionContent>
                <CopyLineIcon size={ACTION_ICON_SIZE} />
                <S.MessageActionsButtonText>
                  {copyPlainText}
                </S.MessageActionsButtonText>
              </S.MessageActionsMenuModalOptionContent>
            </MenuOption>
          )}
          {!disableCopy && copyTgText && onTgCopy && (
            <MenuOption onClick={handleTgCopy}>
              <S.MessageActionsMenuModalOptionContent>
                <CopyLineIcon size={ACTION_ICON_SIZE} />
                <S.MessageActionsButtonText>
                  {copyTgText}
                </S.MessageActionsButtonText>
              </S.MessageActionsMenuModalOptionContent>
            </MenuOption>
          )}
          {!disableResend && variant === 'user' && resendText && onResend && (
            <MenuOption
              onClick={() => {
                handleOptionClick('resend');
              }}
            >
              <S.MessageActionsMenuModalOptionContent>
                <RefreshLineIcon size={ACTION_ICON_SIZE} />
                <S.MessageActionsButtonText>
                  {resendText}
                </S.MessageActionsButtonText>
              </S.MessageActionsMenuModalOptionContent>
            </MenuOption>
          )}
          {!editOutOfMenu && !disableEdit && editText && onEdit && (
            <MenuOption
              onClick={() => {
                handleOptionClick('edit');
              }}
            >
              <S.MessageActionsMenuModalOptionContent>
                <PencilLineIcon size={ACTION_ICON_SIZE} />
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
                <TrashLineIcon size={ACTION_ICON_SIZE} />
                <S.MessageActionsButtonText>
                  {deleteText}
                </S.MessageActionsButtonText>
              </S.MessageActionsMenuModalOptionContent>
            </MenuOption>
          )}
          {!disableDelete && onReportText && onReport && variant !== 'user' && (
            <MenuOption onClick={handleReportClick}>
              <S.MessageActionsMenuModalOptionContent>
                <ThumbDownLineIcon size={ACTION_ICON_SIZE} />
                <S.MessageActionsButtonText>
                  {onReportText}
                </S.MessageActionsButtonText>
              </S.MessageActionsMenuModalOptionContent>
            </MenuOption>
          )}
        </>
      )}
    </>
  );

  const menu = hasMenu && (
    <S.MessageActionsMenuStyled
      ref={messageActionsMenuRef}
      onBlur={handleMenuBlur}
      onKeyDown={handleMenuKeyDown}
    >
      <ActionButton
        ref={menuButtonRef}
        compact={compact}
        aria-label={menuAriaLabel ?? undefined}
        aria-expanded={menuShown}
        aria-haspopup="menu"
        onPointerEnter={handleButtonPointerEnter}
        onPointerLeave={handleButtonPointerLeave}
        onClick={handleButtonClick}
      >
        <DotsLineIcon size={ACTION_ICON_SIZE} />
      </ActionButton>
      {isSheet && (
        <MessageActionsSheet
          open={menuShown}
          title={menuAriaLabel}
          onClose={closeMenu}
        >
          {options}
        </MessageActionsSheet>
      )}
      {modalTransition(
        (style, show) =>
          show && (
            <S.MessageActionsMenuModal
              style={style}
              key="message-actions-modal"
              ref={modalRef}
              role="menu"
              onMouseEnter={handleMenuOpen}
              onMouseLeave={handleButtonHoverOut}
              $variant={variant}
              $invertedX={invertedX}
              $invertedY={invertedY}
            >
              {options}
            </S.MessageActionsMenuModal>
          ),
      )}
    </S.MessageActionsMenuStyled>
  );

  return (
    <>
      <S.MessageActionsStyled
        $variant={variant}
        $color={iconColor}
        ref={rowRef}
        {...(compact && { 'data-message-reveal': true })}
      >
        <S.MessageActionsList>
          {actions.slice(0, visibleCount)}
        </S.MessageActionsList>
        {menu}
      </S.MessageActionsStyled>
      {hiddenCount > 0 && (
        <MessageActionsReserve
          ref={reserveRef}
          $variant={variant}
          style={{ flexBasis: reserveWidth }}
          aria-hidden
        />
      )}
    </>
  );
};
