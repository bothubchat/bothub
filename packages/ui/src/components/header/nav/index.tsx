import React from 'react';
import { HeaderNavStyled } from './styled';

export type HeaderNavProps = React.ComponentProps<typeof HeaderNavStyled>;

export const HeaderNav: React.FC<HeaderNavProps> = ({ children, ...props }) => (
  <HeaderNavStyled {...props}>
    {children}
  </HeaderNavStyled>
);

export * from './styled';
