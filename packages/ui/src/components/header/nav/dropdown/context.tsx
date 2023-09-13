import React, { useContext } from 'react';

export interface HeaderNavDropdownContextValue {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderNavDropdownContext = React.createContext<
HeaderNavDropdownContextValue | null>(null);

export const HeaderNavDropdownProvider: React.FC<
HeaderNavDropdownContextValue & React.PropsWithChildren
> = ({
  children,
  ...value
}) => (
  <HeaderNavDropdownContext.Provider value={value}>
    {children}
  </HeaderNavDropdownContext.Provider>
);

export function useHeaderNavDropdown(): HeaderNavDropdownContextValue {
  const value = useContext(HeaderNavDropdownContext);

  if (!value) {
    throw new Error('useHeaderNavDropdown must be used within a HeaderNavDropdownProvider.');
  }

  return value;
}
