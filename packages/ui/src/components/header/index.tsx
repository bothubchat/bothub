import React, { useCallback, useState } from 'react';
import {
  HeaderContainer,
  HeaderContent,
  HeaderLeft,
  HeaderOffset,
  HeaderRight,
  HeaderStyled,
  HeaderContainerContent,
  HeaderCenter
} from './styled';
import { HeaderMenu, HeaderMenuToggleButton } from './menu';
import { HeaderVariant } from './types';
import { HeaderProvider } from './context';

export type HeaderOpenEventHandler = (open: boolean) => unknown;
export type HeaderTabletToggleEventHandler = () => unknown;

export interface HeaderProps
  extends Omit<React.ComponentProps<typeof HeaderStyled>, 'lang' | '$variant'> {
  id?: string;
  variant?: HeaderVariant;
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  buttonsTablet?: React.ReactNode;
  lang?: React.ReactNode;
  user?: React.ReactNode;
  themeSwitcher?: React.ReactNode;
  open?: boolean;
  isPreset?: boolean;
  tabletMenuOpen?: boolean;
  onOpen?: HeaderOpenEventHandler;
  onTabletOpen?: HeaderTabletToggleEventHandler;
}

export const Header: React.FC<HeaderProps> = ({
  id,
  variant = 'main',
  logo,
  nav,
  buttonsTablet,
  lang,
  user,
  themeSwitcher,
  open,
  tabletMenuOpen,
  onOpen,
  onTabletOpen,
  isPreset = false,
  ...props
}) => {
  const initialIsMenuOpen = open;
  const setInitialIsMenuOpen = useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(
    (open) => {
      if (typeof open === 'boolean') {
        onOpen?.(open);
      }
    },
    [onOpen]
  );

  const [isMenuOpen, setIsMenuOpen] =
    typeof initialIsMenuOpen === 'boolean'
      ? [initialIsMenuOpen, setInitialIsMenuOpen]
      : useState(false);

  const menuNode: React.ReactNode = (
    <HeaderMenu isPreset={isPreset}>
      {themeSwitcher}
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
        <HeaderContent $variant={variant}>
          <HeaderContainer disabled={variant === 'dashboard'}>
            <HeaderContainerContent $variant="desktop">
              <HeaderLeft>
                {logo}
                {nav}
              </HeaderLeft>
              <HeaderRight>
                {themeSwitcher}
                {lang}
                {user}
                <HeaderMenuToggleButton />
              </HeaderRight>
            </HeaderContainerContent>
            <HeaderContainerContent $variant="tablet">
              <HeaderLeft>
                <HeaderMenuToggleButton
                  isOpen={tabletMenuOpen}
                  onTabletOpen={onTabletOpen}
                />
                {buttonsTablet}
              </HeaderLeft>
              <HeaderCenter>{logo}</HeaderCenter>
              <HeaderRight>
                {lang}
                {user}
              </HeaderRight>
            </HeaderContainerContent>
            <HeaderContainerContent $variant="mobile">
              <HeaderCenter>{logo}</HeaderCenter>
              <HeaderRight>{lang}</HeaderRight>
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
export * from './user-info';
export * from './menu';
export * from './types';
export * from './context';
export * from './theme-switcher';
