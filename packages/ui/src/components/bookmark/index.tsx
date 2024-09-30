import React from 'react';
import { BookmarkCloseButton, BookmarkName, BookmarkStyled } from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export interface BookmarkDefaultProps extends React.PropsWithChildren {
  active?: boolean;
  disableClose?: boolean;
  skeleton?: false;
}

export interface BookmarkSkeletonProps {
  skeleton: true;
}

export type BookmarkProps = (BookmarkDefaultProps | BookmarkSkeletonProps) & {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Bookmark: React.FC<BookmarkProps> = ({
  className, ...props
}) => {
  const isActive = (props.skeleton ? false : props.active) ?? false;

  return (
    <BookmarkStyled 
      $active={isActive}
      $skeleton={props.skeleton}
      className={className}
      onClick={props.onClick}
    >
      <BookmarkName>
        {!props.skeleton && props.children}
        {props.skeleton && (
          <Skeleton width={80} />
        )}
      </BookmarkName>
      {(!props.skeleton && !props.disableClose) && (
        <BookmarkCloseButton onClick={props.onClose} />
      )}
      {props.skeleton && (
        <Skeleton
          width={18}
          height={18}
        />
      )}
    </BookmarkStyled>
  );
};

export * from './card';
export * from './list';
