import { css, styled, createGlobalStyle } from 'styled-components';
import { animated } from '@react-spring/web';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';
import { Logo } from '@/ui/components/logo';
import {
  SidebarChatIconContainer,
  SidebarChatStyled,
  SidebarChatTooltip,
  SidebarChatWithOutlineStyled
} from './chat';
import {
  SidebarChatList,
  SidebarGroupDragFolder,
  SidebarGroupName,
  SidebarGroupSkeletonIcon,
  SidebarGroupsStyled,
  SidebarGroupStyled
} from './group';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { ArrowUpIcon } from '@/ui/icons/arrow-up';
import {
  SidebarMenuBlockScrollbarWrapper,
  SidebarMenuNav,
  SidebarMenuStyled
} from './menu';
import { SidebarUserInfoStyled } from './user-info';
import { SidebarEmptyGroupStyled } from './group-empty';
import { TextField } from '../text-field';
import { SidebarSectionProp } from './types';

export interface SidebarStyledProps {
  $open: boolean;
  $isHide: boolean;
}

export const SidebarGlobalStyle = createGlobalStyle<SidebarGlobalStyleProps>`
  ${({ $open }) =>
    !$open &&
    css`
      @media (min-width: ${({ theme }) => theme.dashboard.tablet.maxWidth}) {
        ${SidebarEmptyGroupStyled} {
          margin-top: 10px;
          border-radius: 8px;
          width: 38px;
          aspect-ratio: 1;
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
              ${SidebarChatWithOutlineStyled} {
                width: fit-content;
                border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
                border-radius: 8px;
                &:first-child {
                  margin-top: 20px;
                }
                &:last-child {
                  margin-bottom: 10px;
                }
                ${SidebarChatTooltip} {
                  & > * {
                    display: block;
                  }
                }
              }
            }
          }
        }
      }
    `}
`;

export const SidebarStyled = styled(animated.aside)<SidebarStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  width: 100%;
  border-radius: 20px;
  position: relative;
  height: 100%;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.3s;
  padding: 20px;
  padding-right: 0px;
  ${({ $open }) =>
    $open &&
    css`
      min-width: 342px;
      max-width: 342px;
    `}
  @media (min-width: ${({ theme }) => theme.dashboard.tablet.maxWidth}) {
    ${({ $open, theme }) =>
      !$open &&
      css`
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
        ${SidebarChatWithOutlineStyled} {
          margin-left: 2px;
        }
        ${SidebarChatStyled} {
          padding: 5px 5px 5px 4px;
          > * {
            display: none;
          }
          ${SidebarChatIconContainer} {
            display: inline-flex;
            width: 26px;
            height: 26px;
            justify-content: center;
            align-items: center;
            margin: 0;
          }
        }
      `}
  }
  @media (max-width: ${({ theme }) => theme.dashboard.tablet.maxWidth}) {
    padding: 18px;
    padding-right: 0px;
    gap: 14px;
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 100%;
  }
  max-height: 100vh;
  ${({ $isHide }) =>
    !$isHide &&
    adaptive({
      variant: 'dashboard',
      tablet: css`
        border-radius: 18px;
      `,
      mobile: css`
        border-radius: 0;
      `
    })}
  ${({ $isHide }) =>
    $isHide &&
    css`
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

export interface SidebarContentProps {
  $open?: boolean;
  $section?: SidebarSectionProp;
}

export const SidebarContent = styled.div<SidebarContentProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: max-width 0.3s;
  ${({ $section }) =>
    adaptive({
      variant: 'dashboard',
      tablet:
        $section === 'chats'
          ? css`
              min-width: 342px;
              max-width: none;
              width: 100%;
              ${SidebarUserInfoStyled} {
                display: none;
              }
              ${SidebarMenuStyled} {
                display: none;
              }
            `
          : css`
              display: none;
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
  ${({ $open }) =>
    !$open &&
    adaptive({
      variant: 'dashboard',
      mobile: css`
        opacity: 0;
        visibility: hidden;
      `
    })}
`;

export interface SidebarContentNavProps {
  $open?: boolean;
  $section?: SidebarSectionProp;
}

export const SidebarContentNav = styled.div<SidebarContentNavProps>`
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
  ${({ $open, $section }) =>
    $open
      ? adaptive({
          variant: 'dashboard',
          merge: true,
          desktop: css`
            display: none;
          `,
          tablet:
            $section === 'nav'
              ? css`
                  max-width: none;
                  display: flex;
                  width: 40vw;
                  height: 100%;
                  background: ${({ theme }) => theme.colors.grayScale.gray7};
                  padding: 16px;
                  border-radius: 20px;
                  gap: 16px;
                  flex-direction: column;
                  margin-right: 16px;
                `
              : css`
                  display: none;
                `,
          mobile: css`
            display: none;
          `
        })
      : adaptive({
          variant: 'dashboard',
          merge: true,
          desktop: css`
            display: none;
          `,
          tablet:
            $section === 'nav'
              ? css`
                  max-width: none;
                  display: flex;
                  width: 40vw;
                  height: 100%;
                  background: ${({ theme }) => theme.colors.grayScale.gray7};
                  padding: 16px;
                  border-radius: 20px;
                  flex-direction: column;
                  margin-right: 16px;
                `
              : css`
                  display: none;
                `,
          mobile: css`
            display: flex;
            position: absolute;
            width: calc(100% - 36px);
            height: calc(100% - 36px);
            margin: 0 auto;
          `
        })}
`;

export const SidebarContentNavMenuWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  margin-top: 16px;
  height: calc(100% - 30px);
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

export const SidebarContentNavContainer = styled.div`
  max-height: calc(100% - 100px);
`;

export interface SidebarHeadProps {
  $open: boolean;
}

export const SidebarTabletThemeSwitcher = styled.div`
  display: none;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    `
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
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const SidebarToolbar = styled.div<{
  $open: boolean;
}>`
  display: flex;
  width: inherit;
  padding-right: 20px;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  & > * {
    width: fit-content;
  }
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      flex-direction: row;
    `
  })}
  ${({ $open }) =>
    !$open &&
    adaptive({
      variant: 'dashboard',
      merge: true,
      desktop: css`
        flex-direction: column-reverse;
      `
    })}
`;

export const SidebarToggle = styled.div`
  display: flex;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      display: none;
    `
  })}
`;

export const SidebarSearchContainer = styled.div`
  width: 100%;
  padding-right: 20px;
`;

export const SidebarDeleteButtonContainer = styled.div`
  width: 100%;
  padding-right: 20px;
`;

export const SidebarDivider = styled.div`
  height: 1px;
  width: calc(100% - 20px);
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
  display: ${({ $open }) => ($open ? 'grid' : 'none')};
  grid-template-columns: 1fr auto auto;
  align-items: center;
  position: relative;
  padding-right: 20px;
  width: 100%;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
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
  padding-right: 20px;
  ${adaptive({
    variant: 'dashboard',
    tablet: css`
      display: none;
    `,
    mobile: css`
      display: none;
    `
  })}
`;

export const SidebarBanner = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  width: 100%;
  margin-top: 14px;
  padding-right: 20px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    display: block;
  }
`;

export const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  right: 0px;
  padding-right: 14px;
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

export const SidebarArrowUpButton = styled(ArrowUpIcon)<{ $hidden: boolean }>`
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
  cursor: pointer;
  &:hover {
    transition: background 0.2s;
    background-color: ${({ theme }) => theme.colors.grayScale.gray7};
  }
  & path {
    stroke: ${({ theme }) => theme.colors.base.white};
  }
  ${({ $hidden }) =>
    $hidden &&
    css`
      display: none;
    `}
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      display: none;
    `,
    mobile: css`
      display: none;
    `
  })}
`;

export const SidebarArrowDownButton = styled(ArrowDownIcon)<{
  $hidden: boolean;
}>`
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
  ${({ $hidden }) =>
    $hidden &&
    css`
      display: none;
    `}
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      display: none;
    `,
    mobile: css`
      display: none;
    `
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
        display: none;
      `
    })}
  }
`;

export const SidebarBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
