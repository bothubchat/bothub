import React, { useContext } from 'react';
import { HeaderVariant } from './types';

export interface HeaderContextValue {
  variant: HeaderVariant;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderContext = React.createContext<HeaderContextValue>({
  variant: 'main',
  isMenuOpen: false,
  setIsMenuOpen: () => {}
});

export const HeaderProvider: React.FC<
  HeaderContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
);

export const useHeader = () => useContext(HeaderContext);
