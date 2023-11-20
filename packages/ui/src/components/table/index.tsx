import React from 'react';
import {
  TableBody, TableContent, TableScrollbarWrapper, TableStyled 
} from './styled';
import { ScrollbarShadowsProps } from '@/ui/components/scrollbar';

export interface TableProps extends Omit<React.ComponentProps<'table'>, 'ref'> {
  head?: React.ReactNode;
  scrollShadows?: ScrollbarShadowsProps;
}

export const Table: React.FC<TableProps> = ({
  head, scrollShadows, children, ...props
}) => {
  if (React.Children.toArray(children).length === 0) {
    return null;
  }

  return (
    <TableStyled
      {...props}
    >
      <TableScrollbarWrapper
        scrollShadows={scrollShadows}
      >
        <TableContent>
          {head}
          <TableBody>
            {children}
          </TableBody>
        </TableContent>
      </TableScrollbarWrapper>
    </TableStyled>
  );
};

export * from './styled';
export * from './cell';
