import React, { useContext } from 'react';

export interface SidebarMenuContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarMenuContext = React.createContext<SidebarMenuContextValue>({
  isOpen: false,
  setIsOpen() {},
});

export const SidebarMenuProvider: React.FC<
  SidebarMenuContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <SidebarMenuContext.Provider value={value}>
    {children}
  </SidebarMenuContext.Provider>
);

export const useSidebarMenu = () => useContext(SidebarMenuContext);

export const SidebarMenuConsumer = SidebarMenuContext.Consumer;
