import React from 'react';
import { useTheme } from '@/ui/theme';
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
  const theme = useTheme();
  const isActive = (props.skeleton ? false : props.active) ?? false;

  return (
    <BookmarkStyled 
      $active={isActive}
      className={className}
      variants={{
        default: {},
        skeleton: {
          boxShadow: [
            `0px 0px 0px 1px ${theme.colors.grayScale.gray1}`,
            `0px 0px 0px 1px ${theme.colors.grayScale.gray5}`
          ],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse'
          }
        },
        hover: {
          boxShadow: `0px 0px 0px 1px ${theme.colors.grayScale.gray3}`
        }
      }}
      initial={props.skeleton ? 'skeleton' : 'default'}
      animate={props.skeleton ? 'skeleton' : 'default'}
      whileHover={!props.skeleton && !isActive ? 'hover' : 'default'}
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
