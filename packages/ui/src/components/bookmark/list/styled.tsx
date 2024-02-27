import { css, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { Plus2Icon } from '@/ui/icons';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';

export const BookmarksStyled = styled.div`
  display: flex;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      padding: 16px 20px;
      padding-bottom: 8px;
    `,
    tablet: css`
      padding: 16px 18px;
      padding-bottom: 8px;
    `,
    mobile: css`
      padding: 10px 16px;
      padding-bottom: 5px;
    `
  })}
`;

export const BookmarksContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export const BookmarkList = styled.div`
  display: flex;
  overflow: hidden;
`;

export const BookmarkListScrollbarWrapper = styled(Scrollbar).attrs({ 
  variant: 'secondary', 
  size: 4,
  scrollShadows: {
    left: <ScrollbarShadow side="left" />,
    right: <ScrollbarShadow side="right" />
  }  
})`
  display: flex;
  overflow: auto;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      padding-bottom: 8px;
    `,
    mobile: css`
      padding-bottom: 5px;
    `
  })}
`;

export const BookmarkListContent = styled.div`
  display: flex;
  gap: 20px;
`;

export const AddBookmarkButton = styled(Button).attrs({ children: <Plus2Icon /> })`
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      margin-bottom: 8px;
    `,
    mobile: css`
      margin-bottom: 5px;
    `
  })}
`;
