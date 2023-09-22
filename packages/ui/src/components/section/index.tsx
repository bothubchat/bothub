import React from 'react';
import { SectionContent, SectionStyled } from './styled';
import { Container } from '../container';

export interface SectionProps extends React.ComponentProps<'div'> {
  disableContainer?: boolean;
  bg?: React.ReactNode;
  bgLines?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  disableContainer = false,
  bg = null,
  bgLines = false,
  children, 
  ...props
}) => {
  let containerNode: React.ReactNode;
  if (disableContainer) {
    containerNode = children;
  } else {
    containerNode = (
      <Container>{children}</Container>
    );
  }

  let childrenNode: React.ReactNode;
  if (bg === null) {
    childrenNode = containerNode;
  } else {
    childrenNode = (
      <>
        {bg}
        <SectionContent>
          {containerNode}
        </SectionContent>
      </>
    );
  }

  return (
    <SectionStyled {...props} $bg={bg !== null} $bgLines={bgLines}>
      {childrenNode}
    </SectionStyled>
  );  
};