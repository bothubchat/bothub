import React, { useContext, useMemo } from 'react';

export interface SidebarContextValue {
  isOpen: boolean;
  isEdit: boolean;
  scrollbarElement: Element | null;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = React.createContext<
  SidebarContextValue | undefined
>(undefined);

export const SidebarProvider: React.FC<
  SidebarContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <SidebarContext.Provider
    value={useMemo(
      () => value,
      [
        value.isEdit,
        value.isOpen,
        value.scrollbarElement,
        value.setIsEdit,
        value.setIsOpen,
      ],
    )}
  >
    {children}
  </SidebarContext.Provider>
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error('useSidebar must be used within SidebarProvider.');
  }

  return context;
};

export const SidebarConsumer = SidebarContext.Consumer;
