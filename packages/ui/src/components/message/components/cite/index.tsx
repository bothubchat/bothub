import React from 'react';
import { MessageCiteStyled } from './styled';

export type MessageCiteProps = React.ComponentProps<typeof MessageCiteStyled>;

export const MessageCite: React.FC<MessageCiteProps> = (props) => (
  <MessageCiteStyled {...props} />
);

export * from './styled';
