import React from 'react';
import {
  HeaderContainer, HeaderLeft, HeaderRight, HeaderStyled 
} from './styled';

export interface HeaderProps extends Omit<React.ComponentProps<typeof HeaderStyled>, 'lang'> {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  lang?: React.ReactNode;
  user?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  logo, nav, lang, user, ...props 
}) => (
  <HeaderStyled {...props}>
    <HeaderContainer>
      <HeaderLeft>
        {logo}
        {nav}
      </HeaderLeft>
      <HeaderRight>
        {lang}
        {user}
      </HeaderRight>
    </HeaderContainer>
  </HeaderStyled>
);

export * from './styled';
export * from './nav';
export * from './lang-dropdown';
