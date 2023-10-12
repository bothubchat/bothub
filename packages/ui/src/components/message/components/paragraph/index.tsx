import React from 'react';
import { MessageParagraphStyled, MessageParagraphStyledProps } from './styled';

export type MessageParagraphProps = Omit<
React.ComponentProps<typeof MessageParagraphStyled>, keyof MessageParagraphStyledProps> & {
  disableMargin?: boolean;
};

export const MessageParagraph: React.FC<MessageParagraphProps> = ({
  disableMargin = false, ...props
}) => (
  <MessageParagraphStyled
    $disableMargin={disableMargin}
    {...props}
  />
);

export * from './styled';
