import React from 'react';
import { HeaderNavStyled } from './styled';
import { useHeaderMenu } from '../menu/context';

export type HeaderNavProps = Omit<React.ComponentProps<typeof HeaderNavStyled>, '$inMenu'>;

export const HeaderNav: React.FC<HeaderNavProps> = ({ children, ...props }) => {
  const { isInMenu } = useHeaderMenu();

  return (
    <HeaderNavStyled {...props} $inMenu={isInMenu}>
      {children}
    </HeaderNavStyled>
  );
};

export * from './styled';
export * from './dropdown';
export * from './link';
