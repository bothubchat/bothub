import React from 'react';
import {
  TableBody, TableContent, TableScrollbarWrapper, TableStyled 
} from './styled';

export interface TableProps extends Omit<React.ComponentProps<'table'>, 'ref'> {
  head?: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  head, children, ...props
}) => (
  <TableStyled
    {...props}
  >
    <TableScrollbarWrapper>
      <TableContent>
        {head}
        <TableBody>
          {children}
        </TableBody>
      </TableContent>
    </TableScrollbarWrapper>
  </TableStyled>
);

export * from './styled';
export * from './cell';
