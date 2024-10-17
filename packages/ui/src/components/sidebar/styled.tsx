import { createGlobalStyle, css, styled } from 'styled-components';
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
import { SidebarMenuNavLinkText } from './menu/nav/link/styled';
import {
  ArrowDownIcon,
  ArrowUpIcon
} from '@/ui/icons';
import {
  SidebarMenuBlock,
  SidebarMenuBlockScrollbarWrapper,
  SidebarMenuNav,
  SidebarMenuStyled
} from './menu';
import { SidebarUserInfoStyled } from './user-info';
import { SidebarEmptyGroupStyled } from './group-empty/styled';
import { TextField } from '../text-field';

export interface SidebarStyledProps {
  $open: boolean;
}

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
  ${({ $open }) => !$open && css`
    min-width: 80px;
    max-width: 80px;
  `}
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
`;

export const SidebarTextField = styled(TextField)`
  margin-top: 10px;
`;

export interface SidebarGlobalStyleProps {
  $open: boolean;
}

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  transition: max-width 0.3s;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
    min-width: 312px; 
    max-width: 412px;
    
    ${SidebarUserInfoStyled as any} {
      display: none;
    }
    `,
    mobile: css`
    min-width: none;
    max-width: none;
    display: none;
    ${SidebarMenuStyled as any} {
      display: none;
    }
    ${SidebarUserInfoStyled as any} {
      display: none;
    }
    `
  })}
  overflow: hidden;
`;
export const SidebarContentNav = styled.div`
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
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    desktop: css`
    display: none;
    `,
    tablet: css`
    display: flex;
  `,
    mobile: css`
    display: flex;
  `
  })}
`;

export const SidebarGlobalStyle = createGlobalStyle<SidebarGlobalStyleProps>`
  ${({ $open }) => !$open && adaptive({
    variant: 'dashboard',
    desktop: css`
    ${SidebarToolbar} {
      flex-direction: column-reverse;
    }
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
    }`,
    tablet: css`
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
    ${SidebarToolbar} {
      flex-direction: row;
    }
    ${SidebarMenuStyled} {
      display: none;
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
    ${SidebarContentNav} {
      min-width: 74px;
      max-width: 74px;
    }
    ${SidebarContent} {
      max-width: none;
    }
  `,
    mobile: css`
    ${SidebarContent} {
      display: flex;
    }
    ${SidebarContentNav} {
      display: none;
    }
  `
  })}
`;

export interface SidebarHeadProps {
  $open: boolean;
}

export const SidebarMobileToggle = styled.div`
  display: none;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    mobile: css`
    display: inline-grid;
    justify-content: flex-end;
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
