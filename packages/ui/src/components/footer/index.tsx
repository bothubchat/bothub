import React from 'react';
import { FooterMainColumn, FooterContainer, FooterStyled } from './styled';

export interface FooterProps extends React.PropsWithChildren {
  id?: string; 
  logo?: React.ReactNode;
  nav?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ id, logo, nav, children }) => (
  <FooterStyled id={id}>
    <FooterContainer>
      <FooterMainColumn>
        {logo}
        {nav}
      </FooterMainColumn>
      {children}
    </FooterContainer>
  </FooterStyled>
);

export * from './styled';
