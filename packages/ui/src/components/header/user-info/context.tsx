import React, { useContext } from 'react';

export interface HeaderUserInfoContextValue {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderUserInfoContext =
  React.createContext<HeaderUserInfoContextValue | null>(null);

export const HeaderUserInfoProvider: React.FC<
  HeaderUserInfoContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <HeaderUserInfoContext.Provider value={value}>
    {children}
  </HeaderUserInfoContext.Provider>
);

export function useHeaderUserInfo(): HeaderUserInfoContextValue {
  const value = useContext(HeaderUserInfoContext);

  if (!value) {
    throw new Error(
      'useHeaderUserInfo must be used within a HeaderUserInfoProvider.'
    );
  }

  return value;
}
