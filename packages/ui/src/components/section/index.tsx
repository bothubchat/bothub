import React from 'react';
import { SectionStyled } from './styled';
import { Container } from '../container';

export interface SectionProps extends Omit<React.ComponentProps<typeof SectionStyled>, '$bgLines'> {
  disableContainer?: boolean;
  bgLines?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  disableContainer = false,
  bgLines = false,
  children, 
  ...props
}) => (
  <SectionStyled {...props} $bgLines={bgLines}>
    {disableContainer ? children : <Container>{children}</Container>}
  </SectionStyled>
);
