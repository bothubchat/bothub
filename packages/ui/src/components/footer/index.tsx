import React from 'react';
import { FooterColumn, FooterContainer, FooterStyled } from './styled';

export interface FooterProps extends React.PropsWithChildren {
  id?: string; 
  logo?: React.ReactNode;
  nav?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ id, logo, nav, children }) => (
  <FooterStyled id={id}>
    <FooterContainer>
      <FooterColumn>
        {logo}
        {nav}
      </FooterColumn>
      {children}
    </FooterContainer>
  </FooterStyled>
);

export * from './styled';
