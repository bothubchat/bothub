import React from 'react';
import { MessageTableCellStyled, MessageTableCellText, MessageTableHeadCell } from './styled';
import { useMessage } from '../../../context';

export interface MessageTableCellProps extends React.PropsWithChildren {
  className?: string;
  head?: boolean;
}

export const MessageTableCell: React.FC<MessageTableCellProps> = ({
  className, head = false, children, ...props
}) => {
  const { color } = useMessage();

  return (
    <MessageTableCellStyled
      className={className}
      as={head ? MessageTableHeadCell : MessageTableCellStyled}
      {...props}
    >
      <MessageTableCellText
        $head={head}
        $messageColor={color}
      >
        {children}
      </MessageTableCellText>
    </MessageTableCellStyled>
  );
};

export * from './styled';
