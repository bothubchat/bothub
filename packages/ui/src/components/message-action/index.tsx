import React from 'react';
import { MessageActionBadge, MessageActionContent, MessageActionStyled } from './styled';

export type MessageActionProps = React.ComponentProps<'div'>;

export const MessageAction: React.FC<MessageActionProps> = ({
  children, ...props
}) => (
  <MessageActionStyled
    {...props}
  >
    <MessageActionContent>
      <MessageActionBadge>
        {children}
      </MessageActionBadge>
    </MessageActionContent>
  </MessageActionStyled>
);
