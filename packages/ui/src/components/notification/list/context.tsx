import React, { useContext } from 'react';

export interface NotificationsContextValue {
  isInNotificationList: boolean;
}

export const NotificationsContext =
  React.createContext<NotificationsContextValue>({
    isInNotificationList: false,
  });

export const NotificationsProvider: React.FC<
  NotificationsContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <NotificationsContext.Provider value={value}>
    {children}
  </NotificationsContext.Provider>
);

export const useNotifications = () => useContext(NotificationsContext);
