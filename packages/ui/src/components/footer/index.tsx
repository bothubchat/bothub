import React from 'react';
import { FooterColumn, FooterContainer, FooterStyled } from './styled';

export interface FooterProps extends React.PropsWithChildren {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ logo, nav, children }) => (
  <FooterStyled>
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
