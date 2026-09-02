import React, { useContext, useMemo } from 'react';

export interface MenuDropdownContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuDropdownContext = React.createContext<
  MenuDropdownContextValue | undefined
>(undefined);

export const MenuDropdownProvider: React.FC<
  MenuDropdownContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <MenuDropdownContext.Provider
    value={useMemo(() => value, [value.isOpen, value.setIsOpen])}
  >
    {children}
  </MenuDropdownContext.Provider>
);

export const useMenuDropdown = () => {
  const context = useContext(MenuDropdownContext);

  if (context === undefined) {
    throw new Error(
      'useMenuDropdown must be used within MenuDropdownProvider.',
    );
  }

  return context;
};

export const MenuDropdownConsumer = MenuDropdownContext.Consumer;
