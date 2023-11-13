import React, { useCallback, useState } from 'react';
import {
  HeaderContainer, 
  HeaderContent, 
  HeaderLeft, 
  HeaderOffset, 
  HeaderRight, 
  HeaderStyled, 
  HeaderContainerContent 
} from './styled'; 
import { HeaderMenu, HeaderMenuToggleButton } from './menu';
import { HeaderVariant } from './types';
import { HeaderProvider } from './context';

export type HeaderOpenEventHandler = (open: boolean) => unknown;

export interface HeaderProps extends Omit<React.ComponentProps<typeof HeaderStyled>, 'lang' | '$variant'> {
  id?: string;
  variant?: HeaderVariant;
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  lang?: React.ReactNode;
  user?: React.ReactNode;
  open?: boolean;
  onOpen?: HeaderOpenEventHandler;
}

export const Header: React.FC<HeaderProps> = ({
  id, variant = 'main', logo, nav, lang, user, open, onOpen, ...props 
}) => {
  const initialIsMenuOpen = open;
  const setInitialIsMenuOpen = useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (open) => {
      if (typeof open === 'boolean') {
        onOpen?.(open);
      }
    }, 
    [onOpen]
  );

  const [isMenuOpen, setIsMenuOpen] = typeof initialIsMenuOpen === 'boolean' ? [initialIsMenuOpen, setInitialIsMenuOpen] : useState(false);

  const menuNode: React.ReactNode = (
    <HeaderMenu>
      {nav}
      {user}
    </HeaderMenu>
  );

  return (
    <HeaderProvider 
      variant={variant}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen} 
    >
      <HeaderStyled 
        {...props} 
        $variant={variant}
        id={id}
      >
        <HeaderContent
          $variant={variant}
        >
          <HeaderContainer
            disabled={variant === 'dashboard'}
          >
            <HeaderContainerContent>
              <HeaderLeft>
                {logo}
                {nav}
              </HeaderLeft>
              <HeaderRight>
                {lang}
                {user}
                <HeaderMenuToggleButton />
              </HeaderRight>
            </HeaderContainerContent>
          </HeaderContainer>
        </HeaderContent>
        {menuNode}
      </HeaderStyled>
      {variant === 'main' && <HeaderOffset />}
    </HeaderProvider>
  );
};

export * from './styled';
export * from './nav';
export * from './lang-dropdown';
export * from './user';
export * from './auth-user';
export * from './menu';
export * from './types';
export * from './context';
