import React from 'react';
import { MessageBlockquoteStyled } from './styled';
import { useMessage } from '../../context';

export type MessageBlockquoteProps = React.ComponentProps<'blockquote'>;

export const MessageBlockquote: React.FC<MessageBlockquoteProps> = ({
  children,
  ...props
}) => {
  const { color } = useMessage();

  return (
    <MessageBlockquoteStyled
      $messageColor={color}
      {...props}
    >
      {children}
    </MessageBlockquoteStyled>
  );
};

export * from './styled';
