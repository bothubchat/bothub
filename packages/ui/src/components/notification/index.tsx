import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, AnimationProps, LayoutProps } from 'framer-motion';
import {
  NotificationCloseButton,
  NotificationContent, 
  NotificationIcon, 
  NotificationInfo, 
  NotificationLeft, 
  NotificationRight, 
  NotificationStyled, 
  NotificationText, 
  NotificationTitle 
} from './styled';
import {
  ErrorBigIcon, InfoBigIcon, SuccessBigIcon, WarningBigIcon 
} from '@/ui/icons';
import { Loader } from '@/ui/components/loader';
import { NotificationVariant } from './types';
import { useNotifications } from '@/ui/components/notifications';

export type NotificationCloseEventHandler = (notificationId: string) => unknown;

export interface NotificationProps {
  className?: string;
  variant?: NotificationVariant;
  autoClose?: number | false;
  notificationId?: string;
  title?: string;
  children?: string;
  onClose?: NotificationCloseEventHandler;
}

export const Notification: React.FC<NotificationProps> = ({ 
  className,
  variant = 'info', 
  autoClose = 5000, 
  notificationId = 'unknown',
  title, 
  children,
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isInNotificationList } = useNotifications();
  const isText = !!children && !!title;

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

  let animationProps: AnimationProps & LayoutProps;
  if (isInNotificationList) {
    animationProps = {
      layout: 'position',
      initial: { opacity: 0, x: 412 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 412 },
      transition: { duration: 0.25 }
    };
  } else {
    animationProps = {};
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
  
  return (
    <AnimatePresence
      onExitComplete={handleExitComplete}
    >
      {isOpen && (
        <NotificationStyled
          {...animationProps}
          $variant={variant}
          className={className}
        >
          <NotificationContent
            $text={isText}
          >
            <NotificationLeft
              $text={isText}
            >
              <NotificationIcon 
                as={iconComponent}
              />
              <NotificationInfo>
                <NotificationTitle>
                  {title ?? children}
                </NotificationTitle>
                {isText && (
                  <NotificationText>
                    {children}
                  </NotificationText>
                )}
              </NotificationInfo>
            </NotificationLeft>
            <NotificationRight>
              <NotificationCloseButton 
                onClick={setIsOpen.bind(null, false)}
              />
            </NotificationRight>
          </NotificationContent>
        </NotificationStyled>
      )}
    </AnimatePresence>
  );
};

export * from './types';
