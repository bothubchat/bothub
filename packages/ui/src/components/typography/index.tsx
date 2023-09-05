import React from 'react';
import { TypographyComponent, TypographyVariant } from './types';
import { TypographyStyled } from './styled';

export interface TypographyProps extends Omit<React.ComponentProps<typeof TypographyStyled>, 'ref' | '$variant'> {
  variant?: TypographyVariant;
  component?: TypographyComponent;
}

export const Typography: React.FC<TypographyProps> = ({ variant = 'body-m-medium', component = 'p', ...props }) => (
  <TypographyStyled {...props} as={component} $variant={variant} />
);

export * from './types';
