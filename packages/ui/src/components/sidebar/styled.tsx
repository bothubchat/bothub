import { css, styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';

export interface SidebarStyledProps {
  $open: boolean;
}

export const SidebarStyled = styled.aside<SidebarStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border-radius: 18px;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.3s;
  padding: 18px;
  ${({ $open }) => $open && css`
    min-width: 352px;
    max-width: 352px;
  `}
  ${({ $open }) => !$open && css`
    min-width: 74px;
    max-width: 74px;
  `}
  @media (max-width: ${({ theme }) => theme.dashboard.tablet.maxWidth}) {
    padding: 14px;
    ${({ $open }) => $open && css`
      min-width: 302px;
      max-width: 302px;
    `}
    ${({ $open }) => !$open && css`
      min-width: 62px;
      max-width: 62px;
    `}
  }
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
  justify-content: center;
  align-items: center;
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
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      margin: 34px 0px;
    `,
    tablet: css`
      margin: 30px 0px;
    `,
    mobile: css`
      margin: 25px 0px;
    `
  })}
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
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SidebarBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
