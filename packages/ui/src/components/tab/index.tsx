import React from 'react';
import { TabStyled, TabText } from './styled';

export interface TabProps extends React.PropsWithChildren {
  className?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Tab: React.FC<TabProps> = ({
  className,
  active = false,
  children,
  onClick
}) => (
  <TabStyled
    $active={active}
    className={className}
    onClick={onClick}
  >
    {typeof children !== 'string' && children}
    {typeof children === 'string' && (
      <TabText $active={active}>{children}</TabText>
    )}
  </TabStyled>
);

export * from './styled';
export * from './list';
