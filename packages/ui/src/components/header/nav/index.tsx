import React from 'react';
import { HeaderNavStyled, HeaderNavStyledProps, HeaderMenuDropdownStyled } from './styled';
import { useHeaderMenu } from '../menu/context';
import { useHeader } from '../context';
import { MenuDropdownNav } from '@/ui/components/menu-dropdown/styled';;

export type HeaderNavProps = Omit<React.ComponentProps<typeof HeaderNavStyled>, keyof HeaderNavStyledProps>;

export const HeaderNav: React.FC<HeaderNavProps> = ({ ...props}) => {
  const { variant, $isAdmin } = useHeader();
  const { isInMenu } = useHeaderMenu();
  return (
    <>
      <HeaderMenuDropdownStyled $isAdmin={$isAdmin}>
        <MenuDropdownNav>
          {props.children}
        </MenuDropdownNav>
      </HeaderMenuDropdownStyled>
      <HeaderNavStyled
        isAdmin={$isAdmin}
        {...props} 
        $variant={variant} 
        $inMenu={isInMenu} 
      />
    </>

  );
};

export * from './styled';
export * from './dropdown';
export * from './link';
