import React, { useContext } from 'react';

export interface HeaderLangDropdownContextValue {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderLangDropdownContext =
  React.createContext<HeaderLangDropdownContextValue | null>(null);

export const HeaderLangDropdownProvider: React.FC<
  HeaderLangDropdownContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <HeaderLangDropdownContext.Provider value={value}>
    {children}
  </HeaderLangDropdownContext.Provider>
);

export function useHeaderLangDropdown(): HeaderLangDropdownContextValue {
  const value = useContext(HeaderLangDropdownContext);

  if (!value) {
    throw new Error(
      'useHeaderLangDropdown must be used within a HeaderLangDropdownProvider.',
    );
  }

  return value;
}
