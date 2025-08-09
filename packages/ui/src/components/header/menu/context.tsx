import React, { useContext } from 'react';

export interface HeaderMenuContextValue {
  isInMenu: boolean;
}

export const HeaderMenuContext = React.createContext<HeaderMenuContextValue>({
  isInMenu: false,
});

export const HeaderMenuProvider: React.FC<
  HeaderMenuContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <HeaderMenuContext.Provider value={value}>
    {children}
  </HeaderMenuContext.Provider>
);

export const useHeaderMenu = () => useContext(HeaderMenuContext);
