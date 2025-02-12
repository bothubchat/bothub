import React from 'react';
import { MessageItalicStyled, MessageItalicStyledProps } from './styled';
import { useMessage } from '../../context';

export type MessageItalicProps = Omit<
  React.ComponentProps<typeof MessageItalicStyled>,
  keyof MessageItalicStyledProps
>;

export const MessageItalic: React.FC<MessageItalicProps> = ({
  component = 'i',
  ...props
}) => {
  const { color } = useMessage();

  return (
    <MessageItalicStyled
      $messageColor={color}
      {...props}
      component={component}
    />
  );
};

export * from './styled';
