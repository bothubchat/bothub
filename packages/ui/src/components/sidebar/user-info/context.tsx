import React, { useContext } from 'react';

export interface SidebarUserInfoContextValue {
  caps?: string;
}

export const SidebarUserInfoContext =
  React.createContext<SidebarUserInfoContextValue>({});

export const SidebarUserInfoProvider: React.FC<
  SidebarUserInfoContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <SidebarUserInfoContext.Provider value={value}>
    {children}
  </SidebarUserInfoContext.Provider>
);

export const useSidebarUserInfo = () => useContext(SidebarUserInfoContext);

export const SidebarUserInfoConsumer = SidebarUserInfoContext.Consumer;
