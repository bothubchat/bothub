import { styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { Divider } from '@/ui/components/divider';

export const SidebarStyled = styled.div<{
  $isOpen: boolean;
}>`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: ${({ $isOpen }) => ($isOpen ? '324px' : '74px')};
  ${({ $isOpen }) => !$isOpen && 'justify-content: center;'}
  padding: 20px 0;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border-radius: 18px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

export const SidebarTop = styled.div<{
  $isOpen: boolean;
}>`
  ${({ $isOpen }) => $isOpen && 'margin: 0 16px;'}

  padding-bottom: 16px;
`;

export const SidebarContent = styled.div`
  height: 100%;
  display: flex;
`;

export const SidebarBottom = styled.div`
  padding: 0 16px;
`;

export const SidebarWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  margin: 0 16px;
`;

export const SidebarBodyScrollbarWrapper = styled(Scrollbar).attrs(
  ({ theme }) => ({
    variant: 'secondary',
    scrollShadows: {
      size: 90,
      color: theme.colors.grayScale.gray4,
      top: <ScrollbarShadow side="top" />,
      bottom: <ScrollbarShadow side="bottom" />
    }
  })
)`
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SidebarToolbar = styled.div<{
  $isOpen: boolean;
}>`
  display: flex;
  height: fit-content;
  ${({ $isOpen }) => !$isOpen && 'margin-top: 20px;'}
  flex-direction: ${({ $isOpen }) => ($isOpen ? 'row' : 'column-reverse')};
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const SidebarButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SidebarHead = styled.div<{
  $isOpen: boolean;
}>`
  position: relative;
  display: grid;
  ${({ $isOpen }) => $isOpen && 'grid-template-columns: 1fr auto auto;'}
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const SidebarDivider = styled(Divider)<{
  $isOpen: boolean;
}>`
  margin: 0 auto;
  margin-top: 16px;
  width: ${({ $isOpen }) => ($isOpen ? `width: 100%` : `calc(100% - 32px)`)};
  background: ${({ theme }) => theme.colors.grayScale.gray2};
`;
