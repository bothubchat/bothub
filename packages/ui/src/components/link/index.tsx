import React from 'react';
import { LinkStyled } from './styled';
import { LinkAlign } from './types';

export interface LinkProps extends Omit<React.ComponentProps<typeof LinkStyled>, '$align' | '$fullWidth'> {
  align?: LinkAlign;
  fullWidth?: boolean;
}

export const Link: React.FC<LinkProps> = ({ align = 'left', fullWidth = false, ...props }) => (
  <LinkStyled {...props} $align={align} $fullWidth={fullWidth} />
);

export * from './types';
