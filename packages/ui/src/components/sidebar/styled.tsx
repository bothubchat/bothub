import { styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';

export const SidebarStyled = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  min-width: 445px;
  max-width: 445px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border-radius: 18px;
  overflow: hidden;
  padding: 24px 20px;
  box-sizing: border-box;
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const SidebarHead = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
`;

export const SidebarBottom = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarBody = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  margin: 34px 0px;
`;

export const SidebarBodyScrollbarWrapper = styled(Scrollbar).attrs({ 
  variant: 'secondary',
  scrollShadows: {
    size: 140,
    top: <ScrollbarShadow side="top" />,
    bottom: <ScrollbarShadow side="bottom" />
  }
})`
  height: 100%;
  overflow: auto;
`;

export const SidebarBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
