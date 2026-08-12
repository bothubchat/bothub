import React from 'react';
import { MessageStrikeStyled, MessageStrikeStyledProps } from './styled';
import { useMessage } from '../../context';

export type MessageStrikeProps = Omit<
  React.ComponentProps<typeof MessageStrikeStyled>,
  keyof MessageStrikeStyledProps
>;

export const MessageStrike: React.FC<MessageStrikeProps> = ({
  component = 'del',
  ...props
}) => {
  const { color } = useMessage();

  return (
    <MessageStrikeStyled
      $messageColor={color}
      variant="body-l-regular"
      {...props}
      component={component}
    />
  );
};

export * from './styled';
