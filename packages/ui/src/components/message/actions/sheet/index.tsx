import React from 'react';
import { createPortal } from 'react-dom';
import { easings, useTransition } from '@react-spring/web';
import { prefersReducedMotion } from '../media';
import * as S from './styled';

export interface MessageActionsSheetProps extends React.PropsWithChildren {
  open: boolean;
  /** Заголовок шторки и её имя для скринридера */
  title?: string | null;
  onClose: () => void;
}

const DURATION = 240;

/**
 * Меню действий сообщения на телефоне: шторка у нижнего края экрана вместо
 * окошка у кнопки. Закрывается нажатием мимо неё
 */
export const MessageActionsSheet: React.FC<MessageActionsSheetProps> = ({
  open,
  title,
  onClose,
  children,
}) => {
  const transition = useTransition(open, {
    from: { shown: 0 },
    enter: { shown: 1 },
    leave: { shown: 0 },
    config: { duration: DURATION, easing: easings.easeOutCubic },
    immediate: prefersReducedMotion(),
  });

  return transition(
    ({ shown }, isShown) =>
      isShown &&
      createPortal(
        <>
          <S.MessageActionsSheetBackdrop
            // Уходящая шторка уже не перехватывает нажатия
            style={{ opacity: shown, pointerEvents: open ? 'auto' : 'none' }}
            onClick={onClose}
          />
          <S.MessageActionsSheetStyled
            role="dialog"
            aria-modal="true"
            aria-label={title ?? undefined}
            style={{
              transform: shown.to(
                (value) => `translateY(${(1 - value) * 100}%)`,
              ),
            }}
          >
            <S.MessageActionsSheetHandle aria-hidden />
            {title && (
              <S.MessageActionsSheetTitle>{title}</S.MessageActionsSheetTitle>
            )}
            <S.MessageActionsSheetList role="menu">
              {children}
            </S.MessageActionsSheetList>
          </S.MessageActionsSheetStyled>
        </>,
        document.body,
      ),
  );
};
