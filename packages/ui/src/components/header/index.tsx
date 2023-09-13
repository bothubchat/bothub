import React from 'react';
import {
  HeaderContainer, HeaderLeft, HeaderOffset, HeaderRight, HeaderStyled 
} from './styled';
import { HeaderMenu } from './menu';

export interface HeaderProps extends Omit<React.ComponentProps<typeof HeaderStyled>, 'lang'> {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  lang?: React.ReactNode;
  user?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  logo, nav, lang, user, ...props 
}) => (
  <>
    <HeaderStyled {...props}>
      <HeaderContainer>
        <HeaderLeft>
          {logo}
          {nav}
        </HeaderLeft>
        <HeaderRight>
          {lang}
          {user}
          <HeaderMenu>
            {nav}
            {user}
          </HeaderMenu>
        </HeaderRight>
      </HeaderContainer>
    </HeaderStyled>
    <HeaderOffset />
  </>
);

export * from './styled';
export * from './nav';
export * from './lang-dropdown';
export * from './user';
export * from './auth-user';
