import React, { useContext } from 'react';

export interface SidebarLangDropdownContextValue {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarLangDropdownContext = React.createContext<
SidebarLangDropdownContextValue | null>(null);

export const SidebarLangDropdownProvider: React.FC<
SidebarLangDropdownContextValue & React.PropsWithChildren
> = ({
  children,
  ...value
}) => (
  <SidebarLangDropdownContext.Provider value={value}>
    {children}
  </SidebarLangDropdownContext.Provider>
);

export function useSidebarLangDropdown(): SidebarLangDropdownContextValue {
  const value = useContext(SidebarLangDropdownContext);

  if (!value) {
    throw new Error('useSidebarLangDropdown must be used within a SidebarLangDropdownProvider.');
  }

  return value;
}
