import React from 'react';
import {
  MessageList, MessagesContainer, MessagesContent, MessagesScrollbarWrapper, MessagesStyled 
} from './styled';

export interface MessagesProps extends React.PropsWithChildren {
  className?: string;
}

export const Messages: React.FC<MessagesProps> = ({ className, children }) => (
  <MessagesStyled className={className}>
    <MessagesScrollbarWrapper>
      <MessagesContent>
        <MessagesContainer>
          <MessageList>
            {children}
          </MessageList>
        </MessagesContainer>
      </MessagesContent>
    </MessagesScrollbarWrapper>
  </MessagesStyled>
);
