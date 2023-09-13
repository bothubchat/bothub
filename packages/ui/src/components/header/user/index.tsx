import React from "react";
import { HeaderUserStyled } from "./styled";
import { useHeaderMenu } from "../menu/context";

export interface HeaderUserProps extends React.PropsWithChildren {}

export const HeaderUser: React.FC<HeaderUserProps> = ({ children }) => {
  const { isInMenu } = useHeaderMenu();

  return <HeaderUserStyled $inMenu={isInMenu}>
    {children}
  </HeaderUserStyled>;
};

export * from './styled';
export * from './button';
