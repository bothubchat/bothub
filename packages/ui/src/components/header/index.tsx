import React from 'react';
import {
  HeaderContainer, HeaderContent, HeaderLeft, HeaderOffset, HeaderRight, HeaderStyled 
} from './styled';
import { HeaderMenu } from './menu';
import { HeaderVariant } from './types';
import { HeaderProvider } from './context';

export interface HeaderProps extends Omit<React.ComponentProps<typeof HeaderStyled>, 'lang' | '$variant'> {
  id?: string;
  variant?: HeaderVariant;
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  lang?: React.ReactNode;
  user?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  id, variant = 'main-page', logo, nav, lang, user, ...props 
}) => (
  <HeaderProvider variant={variant}>
    <HeaderStyled {...props} id={id} $variant={variant}>
      <HeaderContainer disabled={variant === 'dashboard'}>
        <HeaderContent $variant={variant}>
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
        </HeaderContent>
      </HeaderContainer>
    </HeaderStyled>
    {variant === 'main-page' && <HeaderOffset />}
  </HeaderProvider>
);

export * from './styled';
export * from './nav';
export * from './lang-dropdown';
export * from './user';
export * from './auth-user';
export * from './menu';
export * from './types';
export * from './context';
