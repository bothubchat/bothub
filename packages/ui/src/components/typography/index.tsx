import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { typography } from './typography.css';
import type {
  TypographyAlign,
  TypographyComponent,
  TypographyVariant,
} from './types';

export interface TypographyProps
  extends React.ComponentPropsWithoutRef<'span'> {
  variant?: TypographyVariant;
  component?: TypographyComponent;
  align?: TypographyAlign;
  fullWidth?: boolean;
  href?: React.ComponentProps<'a'>['href'];
  target?: React.ComponentProps<'a'>['target'];
}

type StyledComponentProps = { as?: unknown; theme?: unknown };

const TypographyComponentWithRef: ForwardRefRenderFunction<
  HTMLSpanElement,
  TypographyProps
> = (
  {
    variant = 'body-m-medium',
    component = 'span',
    align = 'left',
    fullWidth = false,
    className,
    ...props
  },
  ref,
) => {
  const elementProps: typeof props & StyledComponentProps = { ...props };
  // A styled() wrapper passes `forwardedAs` on as `as`: Typography renders
  // `component`, so it is dropped like before instead of reaching the DOM.
  delete elementProps.as;
  delete elementProps.theme;
  const Component = component as React.ElementType;
  const classes = typography({ variant, align, fullWidth });

  return (
    <Component
      {...elementProps}
      ref={ref}
      className={className ? `${classes} ${className}` : classes}
    />
  );
};

/**
 * Text in one of the design system's styles. Styled without
 * styled-components: the classes come with the package CSS, so it renders in
 * React Server Components too.
 */
export const Typography = forwardRef(TypographyComponentWithRef);

export * from './types';
