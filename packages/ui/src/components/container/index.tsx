import React from 'react';
import { ContainerStyled, ContainerStyledProps } from './styled';

export interface ContainerProps
  extends Omit<
    React.ComponentProps<typeof ContainerStyled>,
    keyof ContainerStyledProps
  > {
  disabled?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  disabled = false,
  ...props
}) => (
  <ContainerStyled
    {...props}
    $disabled={disabled}
  />
);
