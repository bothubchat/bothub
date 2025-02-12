import React from 'react';
import {
  ActionMessageBadge,
  ActionMessageContent,
  ActionMessageStyled
} from './styled';

export type ActionMessageProps = React.ComponentProps<'div'>;

export const ActionMessage: React.FC<ActionMessageProps> = ({
  children,
  ...props
}) => (
  <ActionMessageStyled {...props}>
    <ActionMessageContent>
      <ActionMessageBadge>{children}</ActionMessageBadge>
    </ActionMessageContent>
  </ActionMessageStyled>
);
