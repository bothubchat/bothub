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
  ${adaptive(({ theme, $open }) => ({
    variant: 'dashboard',
    desktop: css`
      padding: 24px 20px;
      ${$open && css`
        min-width: ${theme.sidebar.width};
        max-width: ${theme.sidebar.width};
      `}
      ${!$open && css`
        min-width: ${theme.sidebar.minimizedWidth};
        max-width: ${theme.sidebar.minimizedWidth};
      `}
    `,
    tablet: css`
      padding: 18px;
      ${$open && css`
        min-width: ${theme.sidebar.tablet.width};
        max-width: ${theme.sidebar.tablet.width};
      `}
      ${!$open && css`
        min-width: ${theme.sidebar.tablet.minimizedWidth};
        max-width: ${theme.sidebar.tablet.minimizedWidth};
      `}
    `,
    miniTablet: css`
      padding: 18px;
      ${$open && css`
        min-width: ${theme.sidebar.miniTablet.width};
        max-width: ${theme.sidebar.miniTablet.width};
      `}
      ${!$open && css`
        min-width: ${theme.sidebar.tablet.minimizedWidth};
        max-width: ${theme.sidebar.tablet.minimizedWidth};
      `}
    `,
    mobile: css`
      padding: 14px;
      ${$open && css`
        min-width: ${theme.sidebar.mobile.width};
        max-width: ${theme.sidebar.mobile.width};
      `}
      ${!$open && css`
        min-width: ${theme.sidebar.mobile.minimizedWidth};
        max-width: ${theme.sidebar.mobile.minimizedWidth};
      `}
    `
  }))}
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
