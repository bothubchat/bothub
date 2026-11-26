import React from 'react';
import { divider, dividerContainer } from './divider.css';

export type DividerProps = React.ComponentPropsWithoutRef<'div'>;

// Rendered by a styled() wrapper with `forwardedAs`, like the styled
// component it replaces.
type DividerElementProps = DividerProps & { as?: React.ElementType };

const DividerLine = ({
  as: Component = 'div',
  className,
  ...props
}: DividerElementProps) => (
  <Component
    {...props}
    className={className ? `${divider} ${className}` : divider}
  />
);

export const Divider = ({ children, ...props }: DividerProps) => {
  if (children) {
    return (
      <div className={dividerContainer}>
        <DividerLine {...props} />
        {children}
        <DividerLine {...props} />
      </div>
    );
  }

  return <DividerLine {...props} />;
};
