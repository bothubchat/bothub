import React, { useContext, useMemo } from 'react';

export interface HeaderMenuContextValue {
  isInMenu: boolean;
}

export const HeaderMenuContext = React.createContext<HeaderMenuContextValue>({
  isInMenu: false,
});

export const HeaderMenuProvider: React.FC<
  HeaderMenuContextValue & React.PropsWithChildren
> = ({ children, isInMenu }) => {
  const value = useMemo(() => ({ isInMenu }), [isInMenu]);

  return (
    <HeaderMenuContext.Provider value={value}>
      {children}
    </HeaderMenuContext.Provider>
  );
};

export const useHeaderMenu = () => useContext(HeaderMenuContext);
