import { css, styled, createGlobalStyle } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';
import { Logo } from '@/ui/components/logo';
import {
  SidebarChatIconStyled,
  SidebarChatStyled,
  SidebarChatTooltip,
} from './chat';
import {
  SidebarChatList,
  SidebarGroupDragFolder,
  SidebarGroupName,
  SidebarGroupSkeletonIcon,
  SidebarGroupsStyled,
  SidebarGroupStyled,
} from './group';
import {
  ArrowDownIcon,
  ArrowUpIcon
} from '@/ui/icons';
import {
  SidebarMenuBlockScrollbarWrapper,
  SidebarMenuNav,
  SidebarMenuStyled
} from './menu';
import { SidebarUserInfoStyled } from './user-info';
import { SidebarEmptyGroupStyled } from './group-empty';
import { TextField } from '../text-field';

export interface SidebarStyledProps {
  $open: boolean;
  $isHide: boolean;
}

export const SidebarGlobalStyle = createGlobalStyle<SidebarGlobalStyleProps>`
  ${({ $open }) => !$open && css`
  @media (min-width: ${({ theme }) => theme.dashboard.tablet.maxWidth}) {
    ${SidebarEmptyGroupStyled} {
      padding: 10px;
      margin-top: 10px;
      border-radius: 8px;
      display: flex;
      border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
      span {
        display: none;
      }
    }
    ${SidebarGroupsStyled} {
      gap: 10px;
      ${SidebarGroupStyled} {
        ${SidebarGroupName} {
          padding: 9px;
          width: fit-content;
          border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
          border-radius: 8px;
          & > * {
            display: none;
          }
          ${SidebarGroupDragFolder} {
            display: inline-flex;
            margin: 0;
          }
          ${SidebarGroupSkeletonIcon} {
            display: inline-flex;
            margin: 0;
            width: 18px;
            height: 18px;
          }
        }
        ${SidebarChatList} {
          gap: 10px;
          ${SidebarChatStyled} {
            padding: 9px;
            width: fit-content;
            border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
            border-radius: 8px;
            &:first-child {
              margin-top: 20px;
            }
            &:last-child {
              margin-bottom: 10px;
            }
            & > * {
              display: none;
            }
            ${SidebarChatTooltip} {
              & > * {
                display: block;
              }
            }
            ${SidebarChatIconStyled} {
              display: inline-flex;
            }
          }
        }
      }
    }
  }`}
`;

export const SidebarStyled = styled.aside<SidebarStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  width: 100%;
  position: relative;
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
  @media (min-width: ${({ theme }) => theme.dashboard.tablet.maxWidth}) {
    ${({ $open, theme }) => !$open && css`
    min-width: 80px;
    max-width: 80px;
    ${SidebarMenuStyled} {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-bottom: 1px solid ${theme.colors.grayScale.gray3};
      padding: 20px 0px;
      border-radius: 0px;
      width: 100%;
      margin-bottom: 10px;
      ${SidebarMenuNav} {
        gap: 10px;
        background: none;
      }
      ${SidebarMenuBlockScrollbarWrapper} {
        padding-right: 0px;
      }
    }
  `}
  }
  @media (max-width: ${({ theme }) => theme.dashboard.tablet.maxWidth}) {
    padding: 18px;
    gap: 14px;
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 100%;
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
  ${({ $isHide }) => $isHide && css`
    max-width: 0px;
    min-width: 0px;
    padding: 0px;
  `}
`;

export const SidebarTextField = styled(TextField)`
  margin-top: 20px;
`;

export interface SidebarGlobalStyleProps {
  $open: boolean;
}

export const SidebarContent = styled.div<{ $open?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: max-width 0.3s;
  ${adaptive({
  variant: 'dashboard',
  tablet: css`
    min-width: 312px;
    max-width: none;
    width: 100%;
    ${SidebarUserInfoStyled} {
      display: none;
    }
    ${SidebarMenuStyled} {
      display: none;
    }
    `,
  mobile: css`
    min-width: none;
    max-width: none;
    display: flex;
    ${SidebarUserInfoStyled} {
      display: none;
    }
    ${SidebarMenuStyled} {
      display: none;
    }
    `
})}
  ${({ $open }) => !$open && adaptive({
  variant: 'dashboard',
  tablet: css`
      max-width: 412px;
    `,
  mobile: css`
      opacity: 0;
      visibility: hidden;
    `
})}
`;

export const SidebarContentNav = styled.div<{ $open?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: max-width 0.3s;
  justify-content: space-between;
  width: 100%;
  position: relative;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.grayScale.gray7};
  padding: 16px;
  ${({ $open }) => $open ?
    adaptive({
      variant: 'dashboard',
      merge: true,
      desktop: css`display: none;`,
      tablet: css`
        max-width: 72px;
        display: flex;
      `,
      mobile: css`display: none;`,
    })
    :
    adaptive({
      variant: 'dashboard',
      merge: true,
      desktop: css`display: none;`,
      tablet: css`
        max-width: none; 
        display: flex;
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.colors.grayScale.gray7};
        padding: 16px;
        border-radius: 20px;
        flex-direction: column;
      `,
      mobile: css`
        display: flex;
        position: absolute;
        width: calc(100% - 36px);
        height: calc(100% - 36px);
        margin: 0 auto;

      `,
    })}
`;

export const SidebarContentNavMenuWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  margin-top: 16px;
`;

export const SidebarContentNavMenuScrollbarWrapper = styled(Scrollbar).attrs({
  variant: 'secondary',
  scrollShadows: {
    top: <ScrollbarShadow side="top" />,
    bottom: <ScrollbarShadow side="bottom" />
  }
})`
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SidebarContentNavContainer = styled.div<{ $open?: boolean }>``;

export interface SidebarHeadProps {
  $open: boolean;
}

export const SidebarMobileToggle = styled.div`
  display: none;
  ${adaptive({
  variant: 'dashboard',
  merge: true,
  mobile: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
})}
`;
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

export const SidebarToolbar = styled.div<{
  $open: boolean;
}>`
  display: flex;
  width: inherit;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  ${adaptive({
  variant: 'dashboard',
  merge: true,
  tablet: css`
    flex-direction: row;
    `,
})}
  ${({ $open }) => !$open && adaptive({
  variant: 'dashboard',
  merge: true,
  desktop: css`
    flex-direction: column-reverse;
    `,
})}
`;

export const SidebarDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  margin-top: 14px;
`;

export const SidebarWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

export const SidebarLogo = styled(Logo).attrs({ size: 39 })``;

export const SidebarLogoLink = styled.a`
  display: inline-flex;
  transition: 0.35s opacity;
  &:hover {
    opacity: 0.7;
  }
`;

export const SidebarHeader = styled.div<SidebarHeaderProps>`
  display: ${({ $open }) => (
    $open ? 'flex' : 'none'
  )};
  position: relative;
  align-items: center;
  width: 100%;
  margin-bottom: 34px;
  justify-content: space-between;
  height: 39px;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      width: auto;
      display: none;
    `
  })}
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
  margin-top: 14px;
  ${adaptive({
  variant: 'dashboard',
  tablet: css`display: none;`,
  mobile: css`display:none;`,
})}
`;

export const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
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

export const SidebarArrowUpButton = styled(ArrowUpIcon) <{ $hidden: boolean }>`
  position: sticky;
  margin-bottom: 10px;
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
  ${adaptive({
  variant: 'dashboard',
  merge: true,
  tablet: css`
    display: none;
  `,
  mobile: css`
    display: none;
  `,
})}
`;

export const SidebarArrowDownButton = styled(ArrowDownIcon) <{ $hidden: boolean }>`
  position: sticky;
  margin-top: 10px;
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
  ${adaptive({
  variant: 'dashboard',
  merge: true,
  tablet: css`
    display: none;
  `,
  mobile: css`
    display: none;
  `,
})}
`;

export const SidebarHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  &:last-child {
    ${adaptive({
  variant: 'dashboard',
  tablet: css`
      display:none;
      `,
})}
  }
`;

export const SidebarBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;