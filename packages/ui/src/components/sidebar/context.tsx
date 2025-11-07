import React, { useContext } from 'react';

export interface SidebarContextValue {
  isOpen: boolean;
  isSearch: boolean;
  isEdit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = React.createContext<SidebarContextValue>({
  isOpen: false,
  isSearch: false,
  isEdit: false,
  setEdit() {},
  setSearch() {},
  setIsOpen() {},
});

export const SidebarProvider: React.FC<
  SidebarContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
);

export const useSidebar = () => useContext(SidebarContext);

export const SidebarConsumer = SidebarContext.Consumer;
