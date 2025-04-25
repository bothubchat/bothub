import React, { useContext } from 'react';

export interface BadgeSelectDropdownContextValue {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BadgeSelectDropdownContext =
  React.createContext<BadgeSelectDropdownContextValue | null>(null);

export const BadgeSelectDropdownProvider: React.FC<
  BadgeSelectDropdownContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <BadgeSelectDropdownContext.Provider value={value}>
    {children}
  </BadgeSelectDropdownContext.Provider>
);

export function useBadgeSelectDropdown(): BadgeSelectDropdownContextValue {
  const value = useContext(BadgeSelectDropdownContext);

  if (!value) {
    throw new Error(
      'useBadgeSelectDropdown must be used within a BadgeSelectDropdownProvider.'
    );
  }

  return value;
}
