import React from 'react';
import { useMessage } from '../../context';
import { MessageCiteStyled, MessageCiteStyledProps } from './styled';

export type MessageCiteProps = Omit<
  React.ComponentProps<typeof MessageCiteStyled>,
  keyof MessageCiteStyledProps
>;

export const MessageCite: React.FC<MessageCiteProps> = ({ ...props }) => {
  const { color } = useMessage();

  return (
    <MessageCiteStyled
      $messageColor={color}
      {...props}
    />
  );
};

export * from './styled';
