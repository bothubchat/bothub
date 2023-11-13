import React from 'react';
import { HeaderNavStyled, HeaderNavStyledProps } from './styled';
import { useHeaderMenu } from '../menu/context';
import { useHeader } from '../context';

export type HeaderNavProps = Omit<
React.ComponentProps<typeof HeaderNavStyled>, keyof HeaderNavStyledProps
>;

export const HeaderNav: React.FC<HeaderNavProps> = ({ ...props }) => {
  const { variant } = useHeader();
  const { isInMenu } = useHeaderMenu();

  return (
    <HeaderNavStyled 
      {...props} 
      $variant={variant} 
      $inMenu={isInMenu} 
    />
  );
};

export * from './styled';
export * from './dropdown';
export * from './link';
