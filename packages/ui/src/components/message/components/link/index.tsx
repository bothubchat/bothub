import React from 'react';
import { MessageLinkStyled, MessageLinkStyledProps } from './styled';
import { useMessage } from '../../context';

export type MessageLinkProps = Omit<
  React.ComponentProps<typeof MessageLinkStyled>,
  keyof MessageLinkStyledProps
>;

export const MessageLink: React.FC<MessageLinkProps> = ({ ...props }) => {
  const { color: messageColor } = useMessage();

  return (
    <MessageLinkStyled
      $messageColor={messageColor}
      component="a"
      variant="body-l-regular"
      {...props}
    />
  );
};

export * from './styled';
