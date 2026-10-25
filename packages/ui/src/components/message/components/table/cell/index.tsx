import React from 'react';
import {
  MessageTableCellStyled,
  MessageTableCellText,
  MessageTableHeadCell,
} from './styled';
import { useMessage } from '../../../context';

export interface MessageTableCellProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  head?: boolean;
}

export const MessageTableCell: React.FC<MessageTableCellProps> = ({
  className,
  style,
  head = false,
  children,
  ...props
}) => {
  const { color } = useMessage();
  const Cell = head ? MessageTableHeadCell : MessageTableCellStyled;

  return (
    <Cell
      className={className}
      style={style}
      {...props}
    >
      <MessageTableCellText
        $head={head}
        $messageColor={color}
      >
        {children}
      </MessageTableCellText>
    </Cell>
  );
};

export * from './styled';
