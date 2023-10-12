import React from 'react';
import { TableCellSkeleton, TableCellStyled, TableCellText } from './styled';
import { TableCellSize } from './types';

export interface TableCellProps extends Omit<React.ComponentProps<'td'>, 'ref'> {
  size?: TableCellSize;
}

export const TableCell: React.FC<TableCellProps> = ({
  size = 'md', children, ...props
}) => {
  const isText = typeof children === 'string' || (React.isValidElement(children) && children.type === TableCellSkeleton);

  return (
    <TableCellStyled
      $size={size}
      {...props}
    >
      {isText && (
        <TableCellText>
          {children}
        </TableCellText>
      )}
      {!isText && children}
    </TableCellStyled>
  );
};

export * from './types';
export * from './styled';
