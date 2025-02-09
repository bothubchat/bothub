import React from 'react';
import { NotificationList, NotificationsStyled } from './styled';
import { NotificationsProvider } from './context';
import { Portal } from '@/ui/components/portal';

export interface NotificationsProps extends React.PropsWithChildren {
  className?: string;
}

export const Notifications: React.FC<NotificationsProps> = ({
  className,
  children
}) => (
  <NotificationsProvider isInNotificationList>
    <Portal>
      <NotificationsStyled className={className}>
        <NotificationList>{children}</NotificationList>
      </NotificationsStyled>
    </Portal>
  </NotificationsProvider>
);

export * from './context';
