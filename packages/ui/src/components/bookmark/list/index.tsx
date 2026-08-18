import React from 'react';
import {
  BookmarkList,
  BookmarkListContent,
  BookmarkListScrollbarWrapper,
  BookmarksContent,
  BookmarksStyled,
} from './styled';

export interface BookmarksProps extends React.PropsWithChildren {
  className?: string;
  add?: React.ReactNode;
  'aria-label'?: string;
}

export const Bookmarks: React.FC<BookmarksProps> = ({
  className,
  add,
  children,
  'aria-label': ariaLabel,
}) => (
  <BookmarksStyled className={className}>
    <BookmarksContent>
      {React.Children.toArray(children).length !== 0 && (
        <BookmarkList>
          <BookmarkListScrollbarWrapper>
            <BookmarkListContent aria-label={ariaLabel}>
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
