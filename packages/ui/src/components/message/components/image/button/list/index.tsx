import React from 'react';
import {
  MessageImageButtonsContent,
  MessageImageButtonsStyled
} from './styled';
import { useMessageImage } from '../../context';

export type MessageImageButtonsProps = React.ComponentProps<'div'>;

export const MessageImageButtons: React.FC<MessageImageButtonsProps> = ({
  children,
  ...props
}) => {
  const { width } = useMessageImage();

  return (
    <MessageImageButtonsStyled {...props}>
      <MessageImageButtonsContent $column={width ? width < 200 : true}>
        {children}
      </MessageImageButtonsContent>
    </MessageImageButtonsStyled>
  );
};

export * from './styled';
