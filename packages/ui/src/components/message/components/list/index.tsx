import React from 'react';
import { MessageListVariant } from './types';
import { MessageListStyled } from './styled';
import { MessageListProvider } from './context';

export interface MessageListProps extends React.PropsWithChildren {
  variant?: MessageListVariant;
  start?: number;
}

export const MessageList: React.FC<MessageListProps> = ({
  variant = 'dot',
  start,
  children
}) => (
  <MessageListProvider variant={variant}>
    <MessageListStyled
      $start={start}
      as={variant === 'number' ? 'ol' : 'ul'}
      start={start}
    >
      {children}
    </MessageListStyled>
  </MessageListProvider>
);

export * from './styled';
export * from './item';
