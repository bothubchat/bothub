import React from 'react';
import { MessageHrStyled } from './styled';
import { useMessage } from '../../context';

export type MessageHrProps = React.ComponentProps<'hr'>;

export const MessageHr: React.FC<MessageHrProps> = (props) => {
  const { color } = useMessage();

  return (
    <MessageHrStyled
      $messageColor={color}
      {...props}
    />
  );
};

export * from './styled';
