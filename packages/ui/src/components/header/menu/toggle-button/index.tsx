import React, { useCallback } from "react";
import { HeaderMenuToggleIcon } from "./icon";
import { useHeaderMenu } from "../context";
import { HeaderMenuToggleButtonStyled } from "./styled";

export const HeaderMenuToggleButton: React.FC = () => {
  const { isOpen, setIsOpen } = useHeaderMenu();
  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <HeaderMenuToggleButtonStyled onClick={toggleMenu}>
      <HeaderMenuToggleIcon />
    </HeaderMenuToggleButtonStyled>
  );
};