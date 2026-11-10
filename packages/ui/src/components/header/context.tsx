import React, { useContext, useMemo } from 'react';
import { HeaderVariant } from './types';

export interface HeaderContextValue {
  variant: HeaderVariant;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderContext = React.createContext<HeaderContextValue>({
  variant: 'main',
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

export const HeaderProvider: React.FC<
  HeaderContextValue & React.PropsWithChildren
> = ({ children, variant, isMenuOpen, setIsMenuOpen }) => {
  const value = useMemo(
    () => ({ variant, isMenuOpen, setIsMenuOpen }),
    [variant, isMenuOpen, setIsMenuOpen],
  );

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
