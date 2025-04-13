import React, { useContext } from 'react';

export interface DropDownModelItemContextValue {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropDownModelItemContext =
  React.createContext<DropDownModelItemContextValue | null>(null);

export const DropDownModelItemProvider: React.FC<
  DropDownModelItemContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <DropDownModelItemContext.Provider value={value}>
    {children}
  </DropDownModelItemContext.Provider>
);

export function useDropDownModelItem(): DropDownModelItemContextValue {
  const value = useContext(DropDownModelItemContext);

  if (!value) {
    throw new Error(
      'useDropDownModelItem must be used within a DropDownModelItemProvider.'
    );
  }

  return value;
}
