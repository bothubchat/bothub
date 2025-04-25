import React from 'react';
import { MessageBoldStyled, MessageBoldStyledProps } from './styled';
import { useMessage } from '../../context';

export type MessageBoldProps = Omit<
  React.ComponentProps<typeof MessageBoldStyled>,
  keyof MessageBoldStyledProps
>;

export const MessageBold: React.FC<MessageBoldProps> = ({ ...props }) => {
  const { color } = useMessage();

  return (
    <MessageBoldStyled
      $messageColor={color}
      component="b"
      variant="body-l-regular"
      {...props}
    />
  );
};

export * from './styled';
