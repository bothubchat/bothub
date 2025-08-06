import React, { useCallback, useEffect, useState } from 'react';
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

  useEffect(() => {
    let closeTimeout: number | null;

    if (isOpen && autoClose) {
      closeTimeout = window.setTimeout(() => {
        setIsOpen(false);
      }, autoClose);
    } else {
      closeTimeout = null;
    }

    return () => {
      if (closeTimeout !== null) {
        window.clearTimeout(closeTimeout);
      }
    };
  }, [autoClose]);

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
        >
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
