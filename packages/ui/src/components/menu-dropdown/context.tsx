import React, { useContext, useMemo } from 'react';

export interface MenuDropdownContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuDropdownContext =
  React.createContext<MenuDropdownContextValue>({
    isOpen: false,
    setIsOpen() {},
  });

export const MenuDropdownProvider: React.FC<
  MenuDropdownContextValue & React.PropsWithChildren
> = ({ children, isOpen, setIsOpen }) => {
  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return (
    <MenuDropdownContext.Provider value={value}>
      {children}
    </MenuDropdownContext.Provider>
  );
};

export const useMenuDropdown = () => useContext(MenuDropdownContext);

export const MenuDropdownConsumer = MenuDropdownContext.Consumer;
