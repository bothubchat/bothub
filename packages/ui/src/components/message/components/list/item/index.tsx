import React from 'react';
import { MessageListItemStyled } from './styled';
import { useMessageList } from '../context';
import { useMessage } from '../../../context';

export type MessageListItemProps = React.ComponentProps<'li'>;

export const MessageListItem: React.FC<MessageListItemProps> = ({
  children,
  ...props
}) => {
  const { color } = useMessage();
  const { variant } = useMessageList();

  return (
    <MessageListItemStyled
      $variant={variant}
      $messageColor={color}
      {...props}
      ref={null}
    >
      {children}
    </MessageListItemStyled>
  );
};

export * from './styled';
