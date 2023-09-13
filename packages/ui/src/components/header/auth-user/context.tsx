import React, { useContext } from 'react';

export interface HeaderAuthUserContextValue {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderAuthUserContext = React.createContext<
HeaderAuthUserContextValue | null>(null);

export const HeaderAuthUserProvider: React.FC<
HeaderAuthUserContextValue & React.PropsWithChildren
> = ({
  children,
  ...value
}) => (
  <HeaderAuthUserContext.Provider value={value}>
    {children}
  </HeaderAuthUserContext.Provider>
);

export function useHeaderAuthUser(): HeaderAuthUserContextValue {
  const value = useContext(HeaderAuthUserContext);

  if (!value) {
    throw new Error('useHeaderAuthUser must be used within a HeaderAuthUserProvider.');
  }

  return value;
}
