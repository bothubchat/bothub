import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { TypographyAlign, TypographyVariant } from './types';
import { TypographyStyled, getTypographyStyles } from './styled';
import type { TypographyComponent } from './types';

export interface TypographyProps
  extends Omit<
    React.ComponentProps<typeof TypographyStyled>,
    'ref' | '$variant' | '$align' | '$fullWidth'
  > {
  variant?: TypographyVariant;
  component?: TypographyComponent;
  align?: TypographyAlign;
  fullWidth?: boolean;
  href?: React.ComponentProps<'a'>['href'];
  target?: React.ComponentProps<'a'>['target'];
}

const TypographyComponentWithRef: ForwardRefRenderFunction<
  HTMLSpanElement,
  TypographyProps
> = (
  {
    variant = 'body-m-medium',
    component = 'span',
    align = 'left',
    fullWidth = false,
    ...props
  },
  ref
) => (
  <TypographyStyled
    {...props}
    ref={ref}
    as={component}
    $variant={variant}
    $align={align}
    $fullWidth={fullWidth}
  />
);

export const Typography = forwardRef(TypographyComponentWithRef);

export { getTypographyStyles };
export * from './types';
