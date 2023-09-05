import React from 'react';
import { ContainerStyled } from './styled';

export type ContainerProps = React.ComponentProps<typeof ContainerStyled>;

export const Container: React.FC<ContainerProps> = ({ ...props }) => (
  <ContainerStyled {...props} />
);
