import React from 'react';
import { DescriptionCardBackground, DescriptionCardContent, DescriptionCardStyled } from './styled';

export interface DescriptionCardProps extends Omit<React.ComponentProps<typeof DescriptionCardStyled>, 'title'> {
  title?: React.ReactNode;
  text?: React.ReactNode;
  button?: React.ReactNode;
  bg?: React.ReactNode;
}

export const DescriptionCard: React.FC<DescriptionCardProps> = ({
  title, text, button, bg, ...props 
}) => (
  <DescriptionCardStyled {...props}>
    {bg ?? <DescriptionCardBackground />}
    <DescriptionCardContent>
      {title}
      {text}
      {button}
    </DescriptionCardContent>
  </DescriptionCardStyled>
);

export * from './styled';
