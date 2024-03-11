import React from 'react';
import { MessageTableContent, MessageTableStyled } from './styled';

export interface MessageTableProps extends React.PropsWithChildren {}

export const MessageTable: React.FC<MessageTableProps> = ({
  children
}) => (
  <MessageTableStyled>
    <MessageTableContent>
      {children}
    </MessageTableContent>
  </MessageTableStyled>
);

export * from './styled';
export * from './cell';
