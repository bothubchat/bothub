import React from 'react';
import { HeaderUserStyled } from './styled';
import { useHeaderMenu } from '@/ui/components/header/menu/context';
import { useHeader } from '../context';

export interface HeaderUserProps extends React.PropsWithChildren {}

export const HeaderUser: React.FC<HeaderUserProps> = ({ children }) => {
  const { variant } = useHeader();
  const { isInMenu } = useHeaderMenu();

  return (
    <HeaderUserStyled 
      $variant={variant}
      $inMenu={isInMenu}
    >
      {children}
    </HeaderUserStyled>
  );
};

export * from './styled';
export * from './button';
