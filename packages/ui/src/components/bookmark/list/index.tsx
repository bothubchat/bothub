import React from 'react';
import {
  BookmarkList, 
  BookmarkListContent, 
  BookmarkListScrollbarWrapper, 
  BookmarksContent, 
  BookmarksStyled 
} from './styled';

export interface BookmarksProps extends React.PropsWithChildren {
  className?: string;
  add?: React.ReactNode;
}

export const Bookmarks: React.FC<BookmarksProps> = ({
  className, add, children 
}) => (
  <BookmarksStyled
    className={className}
  >
    <BookmarksContent>
      {React.Children.toArray(children).length !== 0 && (
        <BookmarkList>
          <BookmarkListScrollbarWrapper>
            <BookmarkListContent>
              {children}
            </BookmarkListContent>
          </BookmarkListScrollbarWrapper>
        </BookmarkList>
      )}
      {add}
    </BookmarksContent>
  </BookmarksStyled>
);

export * from './styled';
