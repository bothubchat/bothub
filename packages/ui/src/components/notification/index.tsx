import React, { useCallback, useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  NotificationCloseButton,
  NotificationContent,
  NotificationIcon,
  NotificationInfo,
  NotificationLeft,
  NotificationRight,
  NotificationStyled,
  NotificationText,
  NotificationTitle,
  NotifyProgressBar,
} from './styled';
import { ErrorBigIcon } from '@/ui/icons/error-big';
import { InfoBigIcon } from '@/ui/icons/info-big';
import { SuccessBigIcon } from '@/ui/icons/success-big';
import { WarningBigIcon } from '@/ui/icons/warning-big';
import { Loader } from '@/ui/components/loader';
import { NotificationVariant } from './types';
import { useNotifications } from './list';
import { useEventCallback } from '@/ui/utils';

export type NotificationCloseEventHandler = (notificationId: string) => unknown;

export interface NotificationProps {
  className?: string;
  variant?: NotificationVariant;
  autoClose?: number | false;
  notificationId?: string;
  title?: string;
  children?: React.ReactNode;
  onClose?: NotificationCloseEventHandler;
  closeAriaLabel?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  className,
  variant = 'info',
  autoClose = 5000,
  notificationId = 'unknown',
  title,
  children,
  onClose,
  closeAriaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isInNotificationList } = useNotifications();
  const hasTitleAndChildren = !!children && !!title;

  let iconComponent: React.FC;
  switch (variant) {
    case 'info':
      iconComponent = InfoBigIcon;
      break;
    case 'warn':
      iconComponent = WarningBigIcon;
      break;
    case 'error':
      iconComponent = ErrorBigIcon;
      break;
    case 'success':
      iconComponent = SuccessBigIcon;
      break;
    case 'loading':
      iconComponent = Loader;
  }

  const handleExitComplete = useEventCallback((item: boolean) => {
    if (item) {
      onClose?.(notificationId);
    }
  });

  const close = useEventCallback(() => {
    if (!isOpen) {
      return;
    }

    setIsOpen(false);
    // Outside the list there is no leave animation, and the transition
    // doesn't report destroyed items without one
    if (!isInNotificationList) {
      onClose?.(notificationId);
    }
  });

  // The progress bar is a CSS animation that pauses on hover, so the
  // countdown doesn't rerender the notification on every frame
  const handleProgressEnd = useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        close();
      }
    },
    [close],
  );

  const notificationTransition = useTransition(
    isOpen,
    isInNotificationList
      ? {
          from: { opacity: 0, transform: 'translateX(412px)' },
          enter: { opacity: 1, transform: 'translateX(0px)' },
          leave: { opacity: 0, transform: 'translateX(412px)' },
          config: { duration: 250 },
          onDestroyed: handleExitComplete,
        }
      : {},
  );

  return notificationTransition(
    (style, item) =>
      item && (
        <NotificationStyled
          style={style}
          $variant={variant}
          className={className}
        >
          {autoClose ? (
            <NotifyProgressBar
              key={autoClose}
              $variant={variant}
              style={{ animationDuration: `${autoClose}ms` }}
              onAnimationEnd={handleProgressEnd}
            />
          ) : null}

          <NotificationContent $text={hasTitleAndChildren}>
            <NotificationLeft $text={hasTitleAndChildren}>
              <NotificationIcon as={iconComponent} />
              <NotificationInfo>
                <NotificationTitle>{title ?? children}</NotificationTitle>
                {hasTitleAndChildren && typeof children === 'string' ? (
                  <NotificationText>{children}</NotificationText>
                ) : null}
                {hasTitleAndChildren && typeof children !== 'string'
                  ? children
                  : null}
              </NotificationInfo>
            </NotificationLeft>
            <NotificationRight>
              <NotificationCloseButton
                aria-label={closeAriaLabel}
                onClick={close}
              />
            </NotificationRight>
          </NotificationContent>
        </NotificationStyled>
      ),
  );
};

export * from './types';
export * from './list';
export { NotificationText } from './styled';
