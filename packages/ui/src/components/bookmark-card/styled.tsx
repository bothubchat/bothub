import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { CloseIcon, EditIcon } from '@/ui/icons';
import { adaptive } from '@/ui/adaptive';

export interface BookmarkCardStyledProps {
  $skeleton: boolean;
}

export const BookmarkCardStyled = styled.div<BookmarkCardStyledProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  cursor: ${({ $skeleton }) => ($skeleton ? 'progress' : 'pointer')};
  ${() => css`
    ${BookmarkCardActions} {
      visibility: hidden;
    }
    &:hover {
      ${BookmarkCardActions} {
        visibility: visible;
      }
    }
  `}
  ${() => adaptive({
    variant: 'dashboard',
    desktop: css`
      max-width: 314px;
    `,
    tablet: css`
      max-width: 341px;
    `,
    mobile: css`
      max-width: 343px;
    `,
    touch: css`
      ${BookmarkCardActions} {
        visibility: visible !important;
      }
    `
  })}
`;

export const BookmarkCardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export interface BookmrakCardLineProps {
  $color?: string;
  $skeleton: boolean;
}

export const BookmrakCardLine = styled.div<BookmrakCardLineProps>`
  display: flex;
  width: 100%;
  height: 37px;
  background: ${({ theme, $skeleton, $color }) => {
    if ($skeleton) {
      return theme.colors.grayScale.gray1;
    } 

    return ($color ?? theme.colors.accent.primary);
  }};
`;

export const BookmarkCardMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
`;

export const BookmarkCardHead = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const BookmarkCardBody = styled.div`
  display: flex;
  width: 100%;
  margin-top: 14px;
`;

export const BookmarkCardName = styled(Typography).attrs({ variant: 'body-m-semibold' })`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BookmarkCardActions = styled.div`
  display: flex;
  gap: 14px;
`;

export const BookmarkCardAction = styled(Button).attrs({ variant: 'text', iconSize: 18 })``;

export const BookmarkCardEditAction = styled(BookmarkCardAction).attrs({ children: <EditIcon /> })``;

export const BookmarkCardDeleteAction = styled(BookmarkCardAction).attrs({ children: <CloseIcon /> })``;

export const BookmarkCardChats = styled.div`
  display: flex;
  width: 100%;
`;

export const BookmarkCardChatList = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  flex-direction: column;
`;
