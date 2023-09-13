import React, { useContext } from 'react';

export interface HeaderMenuContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isInMenu: boolean;
}

export const HeaderMenuContext = React.createContext<HeaderMenuContextValue>({
  isOpen: false,
  setIsOpen: () => null,
  isInMenu: false
});

export const HeaderMenuProvider: React.FC<HeaderMenuContextValue & React.PropsWithChildren
> = ({
  children,
  ...value
}) => (
  <HeaderMenuContext.Provider value={value}>
    {children}
  </HeaderMenuContext.Provider>
);

export const useHeaderMenu = () => useContext(HeaderMenuContext);
