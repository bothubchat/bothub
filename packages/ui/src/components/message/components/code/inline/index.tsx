import React from 'react';
import {
  MessageInlineCodeStyled,
  MessageInlineCodeStyledProps
} from './styled';
import { useMessage } from '../../../context';

export type MessageInlineCodeProps = Omit<
  React.ComponentProps<typeof MessageInlineCodeStyled>,
  keyof MessageInlineCodeStyledProps
>;

export const MessageInlineCode: React.FC<MessageInlineCodeProps> = ({
  ...props
}) => {
  const { variant, color } = useMessage();

  return (
    <MessageInlineCodeStyled
      $messageVariant={variant}
      $messageColor={color}
      {...props}
    />
  );
};

export * from './styled';
