import React, { useCallback } from 'react';
import {
  BookmarkCardBody,
  BookmarkCardChatList,
  BookmarkCardChats,
  BookmarkCardContent,
  BookmarkCardHead,
  BookmarkCardMain,
  BookmarkCardName,
  BookmarkCardStyled,
  BookmrakCardLine
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export interface BookmarkCardProps extends React.PropsWithChildren {
  name?: string;
  actions?: React.ReactNode;
  color?: string;
  skeleton?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => unknown;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  name, actions, color, skeleton = false, children, onClick
}) => {
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
  }, [onClick]);

  return (
    <BookmarkCardStyled
      $skeleton={skeleton}
      onClick={handleClick}
    >
      <BookmarkCardContent>
        {!skeleton && (
          <BookmrakCardLine
            $skeleton={false}
            $color={color} 
          />
        )}
        {skeleton && (
          <BookmrakCardLine 
            $skeleton
            as={Skeleton}
            variant="rectangular"
          />
        )}
        <BookmarkCardMain>
          <BookmarkCardHead>
            <BookmarkCardName>
              {!skeleton && name}
              {skeleton && (
                <Skeleton />
              )}
            </BookmarkCardName>
            {actions}
          </BookmarkCardHead>
          <BookmarkCardBody>
            <BookmarkCardChats>
              <BookmarkCardChatList>
                {children}
              </BookmarkCardChatList>
            </BookmarkCardChats>
          </BookmarkCardBody>
        </BookmarkCardMain>
      </BookmarkCardContent>
    </BookmarkCardStyled>
  );
};

export * from './styled';
export * from './chat';
