import React from 'react';
import { BookmarkCardChatIcon, BookmarkCardChatName, BookmarkCardChatStyled } from './styled';
import { Skeleton } from '@/ui/components/skeleton';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export interface BookmarkCardChatDefaultProps {
  name: string;
  skeleton?: false;
}

export interface BookmarkCardChatSkeletonProps {
  skeleton: true;
}

export type BookmarkCardChatProps = BookmarkCardChatDefaultProps | BookmarkCardChatSkeletonProps;

export const BookmarkCardChat: React.FC<BookmarkCardChatProps> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <BookmarkCardChatStyled>
      <IconProvider
        fill={props.skeleton ? theme.colors.grayScale.gray1 : theme.colors.base.white}
      >
        <BookmarkCardChatIcon />
      </IconProvider>
      <BookmarkCardChatName>
        {!props.skeleton && props.name}
        {props.skeleton && (
          <Skeleton />
        )}
      </BookmarkCardChatName>
    </BookmarkCardChatStyled>
  );
};
