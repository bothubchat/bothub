import React from 'react';
import { SectionContainer, SectionContent, SectionStyled } from './styled';

export interface SectionProps extends React.ComponentProps<'div'> {
  disableContainer?: boolean;
  bg?: React.ReactNode;
  bgLines?: boolean;
  fullHeight?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  disableContainer = false,
  bg = null,
  bgLines = false,
  fullHeight = false,
  children,
  ...props
}) => {
  let containerNode: React.ReactNode;
  if (disableContainer) {
    containerNode = children;
  } else {
    containerNode = (
      <SectionContainer $fullHeight={fullHeight}>{children}</SectionContainer>
    );
  }

  let childrenNode: React.ReactNode;
  if (bg === null) {
    childrenNode = containerNode;
  } else {
    childrenNode = (
      <>
        {bg}
        <SectionContent $fullHeight={fullHeight}>
          {containerNode}
        </SectionContent>
      </>
    );
  }

  return (
    <SectionStyled
      $bg={bg !== null}
      $bgLines={bgLines}
      $fullHeight={fullHeight}
      {...props}
    >
      {childrenNode}
    </SectionStyled>
  );
};
