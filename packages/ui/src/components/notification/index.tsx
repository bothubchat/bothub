import React, { useCallback, useEffect, useState } from 'react';
import { useTransition, useSpring } from '@react-spring/web'; // Добавлен useSpring
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

export type NotificationCloseEventHandler = (notificationId: string) => unknown;

export interface NotificationProps {
  className?: string;
  variant?: NotificationVariant;
  autoClose?: number | false;
  notificationId?: string;
  title?: string;
  children?: React.ReactNode;
  onClose?: NotificationCloseEventHandler;
}

export const Notification: React.FC<NotificationProps> = ({
  className,
  variant = 'info',
  autoClose = 5000,
  notificationId = 'unknown',
  title,
  children,
  onClose,
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

  const handleExitComplete = useCallback(() => {
    if (!isOpen) {
      onClose?.(notificationId);
    }
  }, [isOpen, onClose, notificationId]);

  const [{ width }, api] = useSpring(() => ({
    width: '0%',
  }));

  useEffect(() => {
    if (isOpen && autoClose) {
      api.start({
        from: { width: '0%' },
        to: { width: '100%' },
        config: { duration: autoClose },
        onRest: (result) => {
          if (result.finished) {
            setIsOpen(false);
          }
        },
      });
    }
  }, [isOpen, autoClose, api]);

  const handleMouseEnter = useCallback(() => {
    if (autoClose) api.pause();
  }, [api, autoClose]);

  const handleMouseLeave = useCallback(() => {
    if (autoClose) api.resume();
  }, [api, autoClose]);

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
      : {
          onDestroyed: handleExitComplete,
        },
  );

  return notificationTransition(
    (style, item) =>
      item && (
        <NotificationStyled
          style={style}
          $variant={variant}
          className={className}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {autoClose && (
            <NotifyProgressBar
              $variant={variant}
              style={{ width }}
            />
          )}

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
              <NotificationCloseButton onClick={setIsOpen.bind(null, false)} />
            </NotificationRight>
          </NotificationContent>
        </NotificationStyled>
      ),
  );
};

export * from './types';
export * from './list';
export { NotificationText } from './styled';
