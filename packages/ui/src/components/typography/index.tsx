import React from 'react';
import { TypographyAlign, TypographyComponent, TypographyVariant } from './types';
import { TypographyStyled } from './styled';

export interface TypographyProps extends Omit<React.ComponentProps<typeof TypographyStyled>, 'ref' | '$variant' | '$align' | '$fullWidth'> {
  variant?: TypographyVariant;
  component?: TypographyComponent;
  align?: TypographyAlign;
  fullWidth?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body-m-medium', component = 'p', align = 'left', fullWidth = false, ...props 
}) => (
  <TypographyStyled 
    {...props} 
    as={component} 
    $variant={variant} 
    $align={align}
    $fullWidth={fullWidth}
  />
);

export * from './types';
