import React, { useContext } from 'react';

export interface SidebarDropdownContextValue {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarDropdownContext =
  React.createContext<SidebarDropdownContextValue | null>(null);

export const SidebarDropdownProvider: React.FC<
  SidebarDropdownContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <SidebarDropdownContext.Provider value={value}>
    {children}
  </SidebarDropdownContext.Provider>
);

export function useSidebarDropdown(): SidebarDropdownContextValue {
  const value = useContext(SidebarDropdownContext);

  if (!value) {
    throw new Error(
      'useSidebarDropdown must be used within a SidebarDropdownProvider.',
    );
  }

  return value;
}
