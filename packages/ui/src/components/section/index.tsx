import React from 'react';
import { SectionStyled } from './styled';
import { Container } from '../container';

export interface SectionProps extends React.ComponentProps<typeof SectionStyled> {
  disableContainer?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  disableContainer = false, children, ...props
}) => (
  <SectionStyled {...props}>
    {disableContainer ? children : <Container>{children}</Container>}
  </SectionStyled>
);
