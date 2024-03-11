import React from 'react';
import { MessageTitleVariant } from './types';
import { MessageTitleStyled } from './styled';
import { useMessage } from '../../context';

export interface MessageTitleProps extends React.PropsWithChildren {
  variant: MessageTitleVariant;
}

export const MessageTitle: React.FC<MessageTitleProps> = ({
  variant, children
}) => {
  const { variant: messageVariant, color: messageColor } = useMessage();

  return (
    <MessageTitleStyled
      $variant={variant}
      $messageVariant={messageVariant}
      $messageColor={messageColor}
      as={variant}
    >
      {children}
    </MessageTitleStyled>
  );
};

export * from './types';
export * from './styled';
