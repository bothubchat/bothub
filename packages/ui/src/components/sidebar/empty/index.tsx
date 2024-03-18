import React from 'react';
import { SidebarEmptyIcon, SidebarEmptyStyled, SidebarEmptyText } from './styled';

export type SidebarEmptyProps = React.ComponentProps<'div'>;

export const SidebarEmpty: React.FC<SidebarEmptyProps> = ({
  children, ...props
}) => (
  <SidebarEmptyStyled
    {...props}
  >
    <SidebarEmptyIcon />
    {typeof children === 'string' && (
      <SidebarEmptyText>
        {children}
      </SidebarEmptyText>
    )}
    {typeof children !== 'string' && children}
  </SidebarEmptyStyled>
);
