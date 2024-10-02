import { createGlobalStyle, css, styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';
import { Logo } from '@/ui/components/logo';
import {
  SidebarChat,
  SidebarChatCaps, SidebarChatIconStyled, SidebarChatName, SidebarChatNameTooltip, SidebarChatStyled, SidebarChatTooltip
} from './chat';
import {
  SidebarGroupSkeleton,
  SidebarGroupTooltip,
  SidebarGroupArrowDown,
  SidebarGroupDragHandle,
  SidebarGroupDragFolder,
  SidebarGroupStyled,
  SidebarGroupNameBox,
  SidebarGroupName,
  SidebarGroupsStyled
} from './group';
import { SidebarMenuNavLinkStyled, SidebarMenuNavLinkText } from './menu/nav/link/styled';
import { ArrowDownIcon, ArrowUpIcon } from '@/ui/icons';
import {
  SidebarMenuBlock, SidebarMenuBlockScrollbarWrapper, SidebarMenuNav, SidebarMenuStyled
} from './menu';

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
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.3s;
  padding: 20px;
  ${({ $open }) => $open && css`
    min-width: 412px;
    max-width: 412px;
  `}
  ${({ $open }) => !$open && css`
    min-width: 80px;
    max-width: 80px;
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
  ${({ $open }) => !$open && css`
    ${SidebarToolbar} {
      flex-direction: column-reverse;
    }
    ${SidebarMenuStyled} {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
      padding: 20px 0px;
      border-radius: 0px;
      width: 100%;
      margin-bottom: 10px;
    }
    ${SidebarMenuBlock as any} {
      top: 0;
      margin-top: 20px;
      background: none;
      position: relative;
      flex-direction: column;
      padding: 0px;
      border: none;
      border-radius: 0px;
    }
    ${SidebarMenuNav} {
      gap: 10px;
    }
    ${SidebarMenuNavLinkText} {
      display: none;
    }
    ${SidebarMenuBlockScrollbarWrapper} {
      padding-right: 0px;
    }
    ${SidebarGroupsStyled} {
      gap: 10px;
    }
    ${SidebarGroupName} {
      padding: 0;
      & > * {
        display: none;
      }
      ${SidebarGroupDragFolder} {
        width: 38px;
        height: 38px;
        padding: 10px;
        border-radius: 8px;
        display: inline-flex;
        visibility: visible !important;
        border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
      }
    }
    ${SidebarChatStyled} {
      padding: 0;
      & > * {
        display: none;
      }
      margin-top: 10px;
      &:first-child {
        margin-top: 20px;
      }
      &:last-child {
        margin-bottom: 10px;
      }
      ${SidebarChatIconStyled}{
        display: inline-flex;
        height: 38px;
        width: 38px;
        padding: 9px;
        border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
        border-radius: 8px;
      }
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
  tablet: css`
      flex-direction: row-reverse;
      justify-content: ${$open ? 'space-between' : 'center'};
    `
}))}
`;

export interface SidebarHeaderProps {
  $open: boolean;
}

export const SidebarHeader = styled.div<SidebarHeaderProps>`
  display: ${({ $open }) => (
    $open ? 'flex' : 'none'
  )};
  align-items: center;
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
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const SidebarToolbar = styled.div`
  display: flex;
  width: inherit;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
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
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SidebarArrowUpButton = styled(ArrowUpIcon) <{ $hidden: boolean }>`
  position: sticky;
  top: 0px;
  z-index: 10;
  width: 38px;
  height: 38px;
  padding: 10px;
  border-radius: 8px;
  display: inline-flex;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  ${({ $hidden }) => $hidden && css` display: none;`}
`;

export const SidebarArrowDownButton = styled(ArrowDownIcon) <{ $hidden: boolean }>`
  position: sticky;
  bottom: 0px;
  opacity: 1;
  width: 38px;
  height: 38px;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  display: inline-flex;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  ${({ $hidden }) => $hidden && css` display: none;`}
`;

export const SidebarBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${adaptive({
  variant: 'dashboard',
  merge: true,
})}
`;
