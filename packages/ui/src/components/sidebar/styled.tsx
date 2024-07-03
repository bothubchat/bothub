import { createGlobalStyle, css, styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';
import { Logo } from '@/ui/components/logo';
import {
  SidebarChatCaps, SidebarChatName, SidebarChatNameTooltip, SidebarChatTooltip 
} from './chat';
import { SidebarGroupSkeleton, SidebarGroupTooltip } from './group';

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
  background: ${({ theme }) => theme.colors.grayScale.gray7};
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.3s;
  padding: 18px;
  padding-right: 9px;
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
    padding-right: 7px;
    ${({ $open }) => $open && css`
      min-width: 302px;
      max-width: 302px;
    `}
    ${({ $open }) => !$open && css`
      min-width: 62px;
      max-width: 62px;
    `}
  }
  max-height: 100vh;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      border-right: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
    `,
    tablet: css`
      border-radius: 18px;
    `,
    mobile: css`
      border-radius: 18px;
    `
  })}
`;

export interface SidebarGlobalStyleProps {
  $open: boolean;
}

export const SidebarGlobalStyle = createGlobalStyle<SidebarGlobalStyleProps>`
  ${({ $open }) => $open && css`
    ${SidebarGroupSkeleton} {
      width: 120px;
    }
    ${SidebarChatTooltip} {
      visibility: hidden !important;
    }
    ${SidebarGroupTooltip} {
      visibility: hidden !important;
    }
  `}
  ${({ $open }) => !$open && css`
    ${SidebarChatName} {
      opacity: 0 !important;
    }
    ${SidebarChatCaps} {
      opacity: 0 !important;
    }
    ${SidebarGroupSkeleton} {
      width: 30px;
    }
    ${SidebarChatNameTooltip} {
      visibility: hidden !important;
    }
  `}
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export interface SidebarHeadProps {
  $open: boolean;
}

export const SidebarHead = styled.div<SidebarHeadProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  flex-shrink: 0;
  position: relative;
  ${adaptive(({ $open }) => ({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      padding-right: 9px;
    `,
    tablet: css`
      flex-direction: row-reverse;
      justify-content: ${$open ? 'space-between' : 'center'};
      padding-right: 7px;
    `
  }))}
`;

export interface SidebarHeaderProps {
  $open: boolean;
}

export const SidebarHeader = styled.div<SidebarHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $open }) => (
    $open ? 'space-between' : 'center'
  )};
  width: 100%;
  height: 39px;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      width: auto;
    `
  })}
`;

export interface SidebarHeaderMainProps {
  $open: boolean;
}

export const SidebarHeaderMain = styled.div<SidebarHeaderMainProps>`
  display: ${({ $open }) => (
    $open ? 'flex' : 'none'
  )};
  align-items: center;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      display: none;
    `
  })}
`;

export const SidebarLogo = styled(Logo).attrs({ size: 39 })``;

export const SidebarLogoLink = styled.a`
  display: inline-flex;
  transition: 0.35s opacity;
  &:hover {
    opacity: 0.7;
  }
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
  flex-direction: column;
  gap: 14px;
  width: 100%;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      padding-right: 9px;
    `,
    tablet: css`
      padding-right: 7px;
    `
  })}
`;

export const SidebarBody = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      margin: 18px 0px;
    `,
    tablet: css`
      margin: 14px 0px;
    `,
    mobile: css`
      margin: 14px 0px;
    `
  })}
`;

export const SidebarBodyScrollbarWrapper = styled(Scrollbar).attrs(
  ({ theme }) => ({ 
    variant: 'secondary',
    scrollShadows: {
      size: 90,
      color: theme.colors.grayScale.gray7,
      top: <ScrollbarShadow side="top" />,
      bottom: <ScrollbarShadow side="bottom" />
    }
  })
)`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SidebarBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
      padding-right: 9px;
    `,
    tablet: css`
      padding-right: 7px;
    `
  })}
`;
