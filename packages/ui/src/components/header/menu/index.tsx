import React, { useEffect, useState } from "react";
import { HeaderMenuStyled } from "./styled";
import { HeaderMenuToggleButton } from "./toggle-button";
import { Portal } from "../../portal";
import { HeaderMenuProvider } from "./context";

export interface HeaderMenuProps extends React.PropsWithChildren {}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isOpen]);

  return <HeaderMenuProvider 
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    isInMenu
  >
    <HeaderMenuToggleButton />
    {isOpen ? (
      <Portal>
        <HeaderMenuStyled>
          {children}
        </HeaderMenuStyled>
      </Portal>
    ) : null}
  </HeaderMenuProvider>
};

