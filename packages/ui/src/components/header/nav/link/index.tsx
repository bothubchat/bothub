import React, { useCallback } from "react";
import { HeaderNavLinkStyled } from "./styled";
import { useHeaderMenu } from "../../menu/context";

export interface HeaderNavLinkProps extends Omit<React.ComponentProps<typeof HeaderNavLinkStyled>, '$inMenu'> {
  as?: any;
  to?: string;
}

export const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({ ...props }) => {
  const { isInMenu, setIsOpen } = useHeaderMenu();

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    setIsOpen(false);
  }, [props.onClick]);

  return <HeaderNavLinkStyled {...props} $inMenu={isInMenu} onClick={handleClick} />;
};