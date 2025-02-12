import React from 'react';
import { TableContent, TableScrollbarWrapper, TableStyled } from './styled';
import { ScrollbarShadowsProps } from '@/ui/components/scrollbar';

export interface TableProps extends Omit<React.ComponentProps<'table'>, 'ref'> {
  scrollShadows?: ScrollbarShadowsProps;
  fullWidth?: boolean;
}

export const Table: React.FC<TableProps> = ({
  scrollShadows,
  children,
  fullWidth,
  ...props
}) => {
  if (React.Children.toArray(children).length === 0) {
    return null;
  }

  return (
    <TableStyled {...props}>
      <TableScrollbarWrapper scrollShadows={scrollShadows}>
        <TableContent $fullWidth={fullWidth}>{children}</TableContent>
      </TableScrollbarWrapper>
    </TableStyled>
  );
};

export * from './styled';
export * from './cell';
