import React, { useContext, useMemo } from 'react';
import { HeaderVariant } from './types';

export interface HeaderContextValue {
  variant: HeaderVariant;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderContext = React.createContext<
  HeaderContextValue | undefined
>(undefined);

export const HeaderProvider: React.FC<
  HeaderContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <HeaderContext.Provider
    value={useMemo(
      () => value,
      [value.isMenuOpen, value.setIsMenuOpen, value.variant],
    )}
  >
    {children}
  </HeaderContext.Provider>
);

export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (context === undefined) {
    throw new Error('useHeader must be used within HeaderProvider.');
  }

  return context;
};
