import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { Plus2Icon } from '@/ui/icons';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';

export const BookmarksStyled = styled.div`
  display: flex;
  width: 100%;
  grid-area: tabs;
  box-sizing: border-box;
  padding: 16px 20px;
  padding-bottom: 8px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border-radius: 18px;
`;

export const BookmarksContent = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
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
  padding-bottom: 8px;
`;

export const BookmarkListContent = styled.div`
  display: flex;
  gap: 20px;
`;

export const AddBookmarkButton = styled(Button).attrs({ children: <Plus2Icon /> })`
  margin-bottom: 8px;
`;
