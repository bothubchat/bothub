import { css, styled, keyframes } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { TrashIcon } from '@/ui/icons/trash';
import { Skeleton } from '@/ui/components/skeleton';
import { adaptive } from '@/ui/adaptive';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { SidebarChatIcon } from '@/ui/icons/sidebar-chat';
import { DragDotIcon } from '@/ui/icons/drag-dot';
import { Checkbox } from '@/ui/components/checkbox';
import { Tooltip } from '../../tooltip';
import { colorToRgba } from '@/ui/utils/colorToRgba';

export interface SidebarChatLeftProps {
  $sidebarOpen?: boolean;
}

export const SidebarChatLeft = styled.div<SidebarChatLeftProps>`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: pointer;
`;

export const SidebarChatRight = styled.div`
  display: flex;
`;

export const SidebarChatIconStyled = styled(SidebarChatIcon)`
  ${({ theme }) => css`
    path {
      stroke: ${theme.colors.grayScale.gray1};
    }
  `}
  display: none;
`;

export interface SidebarChatIconContainerProps {
  $active?: boolean;
  $isDefault?: boolean;
}

export const SidebarChatIconContainer = styled.span<SidebarChatIconContainerProps>`
  display: inline-flex;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  flex-shrink: 0;
  ${SidebarChatIconStyled} {
    display: ${({ $isDefault }) => ($isDefault ? 'inline-flex' : 'none')};
    ${({ $active }) =>
      $active &&
      css`
        fill: ${({ theme }) => theme.colors.base.white};
        stroke: ${({ theme }) => theme.colors.base.white};
      `}
    ${({ $active }) =>
      $active &&
      css`
        fill: ${({ theme }) => theme.colors.base.white};
        stroke: ${({ theme }) => theme.colors.base.white};
      `}
  }
`;

export const SidebarChatName = styled(Typography).attrs({
  variant: 'body-m-medium',
  component: 'span'
})`
  white-space: nowrap;
  width: 100%;
  transition: opacity 0.3s;
  ${adaptive({
    tablet: css`
      max-width: 130px;
    `,
    mobile: css`
      max-width: 130px;
    `
  })}
`;

export const SidebarChatNameSkeleton = styled(Skeleton)`
  ${adaptive({
    desktop: css`
      width: 160px;
    `,
    tablet: css`
      width: 130px;
    `,
    mobile: css`
      width: 130px;
    `
  })}
`;

export const SidebarChatActions = styled.div`
  display: flex;
  gap: 6px;
  margin-left: 8px;
`;

export const SidebarChatEditAction = styled(Button).attrs({
  variant: 'text',
  children: <MenuDotIcon />
})`
  transform: rotate(90deg);
`;

export const SidebarChatDeleteAction = styled(Button).attrs({
  variant: 'text',
  children: <TrashIcon />
})``;

export const SidebarChatClosed = styled.div``;

export const SidebarChatCaps = styled(Typography).attrs({
  variant: 'body-s-medium',
  component: 'span'
})`
  display: inline-flex;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 10px;
  cursor: default;
  transition: opacity 0.3s;
`;

const SidebarChatOutlineAnimation = keyframes`
  from {
    opacity: 0;
    left: 0px;
  }
  to {
    opacity: 1;
    left: -3px;
  }
`;

export interface SidebarChatWithOutlineStyledProps {
  $active: boolean;
}

export const SidebarChatWithOutlineStyled = styled.div<SidebarChatWithOutlineStyledProps>`
  margin-left: 3px;
  height: 100%;
  position: relative;
  ${({ $active }) =>
    $active &&
    css`
      border-radius: 10px;
      &:before {
        content: '';
        width: 20px;
        height: 100%;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0px;
        background-color: ${({ theme }) => theme.colors.accent.primary};
        z-index: 0;
        animation: ${SidebarChatOutlineAnimation} 0.3s ease-in-out 1 forwards;
      }
    `};
`;

export interface SidebarChatWithBackgroundStyledProps {
  $active: boolean;
}

export const SidebarChatWithBackgroundStyled = styled.div<SidebarChatWithBackgroundStyledProps>`
  height: 100%;
  border-radius: 10px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
`;

export interface SidebarChatStyledProps {
  $active: boolean;
  $skeleton: boolean;
  $draggble: boolean;
}

export const SidebarChatStyled = styled.div<SidebarChatStyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${({ $draggble }) => {
    if ($draggble) {
      return css`
        background: ${({ theme }) => theme.colors.grayScale.gray3};
        border-radius: 10px;
        opacity: 0.7;
      `;
    }
  }};
  ${({ $active, $skeleton }) => {
    if ($active) {
      return css`
        border-radius: 10px;
        background-color: ${({ theme }) =>
          colorToRgba(theme.colors.accent.primaryLight, 0.5)};
        transition: background-color 0.3s ease-out;
        ${SidebarChatIconStyled} {
          path {
            stroke: ${({ theme }) => theme.colors.base.white};
          }
          border-radius: 10px;
        }
      `;
    }
    if (!$active && !$skeleton) {
      return css`
        &:hover {
          border-radius: 10px;
          background-color: ${({ theme }) =>
            colorToRgba(theme.colors.accent.primaryLight, 0.5)};
          transition: background-color 0.3s ease-out;
        }
      `;
    }
  }}
  ${({ $skeleton, $active }) => {
    if ($skeleton || $active) {
      return css``;
    }
    return css`
      ${SidebarChatIconContainer},
      ${SidebarChatName},
      ${SidebarChatCaps} {
        opacity: 0.4;
      }
      &:hover {
        ${SidebarChatIconContainer},
        ${SidebarChatName},
        ${SidebarChatCaps} {
          opacity: 1;
        }
      }
    `;
  }}
`;

export const SidebarChatCheckbox = styled(Checkbox)`
  margin-left: 20px;
`;

export const SidebarChatTooltip = styled(Tooltip)`
  overflow: hidden;
`;

export const SidebarChatDragHandle = styled(DragDotIcon)`
  outline: none;
  touch-action: none;
  margin-right: 10px;
  cursor: grab;
`;

export const SidebarChatNameTooltip = styled(Tooltip)`
  overflow: hidden;
`;
