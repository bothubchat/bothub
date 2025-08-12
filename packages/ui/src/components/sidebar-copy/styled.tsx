import { styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { Divider } from '@/ui/components/divider';

export const SidebarStyled = styled.div<{
  $isOpen: boolean;
}>`
  display: flex;
  flex-direction: column;
  height: 100%;
  height: 98vh;
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
  height: fit-content;
  padding-bottom: 16px;
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
`;

export const SidebarBottom = styled.div`
  display: flex;
  padding: 0 16px;
  height: fit-content;
`;

export const SidebarWrapper = styled.div<{
  $isScrollable: boolean;
  $isOpen: boolean;
}>`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0 16px;
  padding-right: ${({ $isScrollable, $isOpen }) =>
    $isScrollable && $isOpen ? 20 : 26}px;
`;

export const SidebarBodyScrollbarWrapper = styled(Scrollbar).attrs(
  ({ theme }) => ({
    variant: 'secondary',
    size: 6,
    scrollShadows: {
      size: 90,
      color: theme.colors.grayScale.gray4,
      top: <ScrollbarShadow side="top" />,
      bottom: <ScrollbarShadow side="bottom" />,
    },
  }),
)<{ $isOpen: boolean }>`
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  ${({ $isOpen }) =>
    !$isOpen &&
    `
    scrollbar-width: none;
    padding-right: 6px;
  `}
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
