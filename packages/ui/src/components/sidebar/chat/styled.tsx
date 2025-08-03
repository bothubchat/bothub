import { css, styled, keyframes } from 'styled-components';
import { getTypographyStyles, Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { TrashIcon } from '@/ui/icons/trash';
import { Skeleton } from '@/ui/components/skeleton';
import { adaptive } from '@/ui/adaptive';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { SidebarChatIcon } from '@/ui/icons/sidebar-chat';
import { DragDotIcon } from '@/ui/icons/drag-dot';
import { Checkbox } from '@/ui/components/checkbox';
import { Tooltip } from '@/ui/components/tooltip';
import { colorToRgba } from '@/ui/utils/colors';
import { Progress } from '../../progress';
import { CheckSmallIcon } from '@/ui/icons';

export interface SidebarChatLeftProps {
  $sidebarOpen?: boolean;
}

export const SidebarChatLeft = styled.div<SidebarChatLeftProps>`
  cursor: pointer;
  display: block;
  margin-right: 8px;
  width: 100%;
  overflow: hidden;
`;

export const SidebarChatRight = styled.div`
  display: flex;
`;

export const SidebarChatIconStyled = styled(SidebarChatIcon)`
  ${({ theme }) => css`
    path {
      stroke: ${theme.scheme === 'custom'
        ? theme.colors.custom.icon
        : theme.colors.grayScale.gray1};
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
    ${({ $active, theme }) =>
      $active &&
      css`
        fill: ${theme.colors.base.white};
        stroke: ${theme.colors.base.white};
      `}
  }
`;

export const SidebarChatProgressValue = styled.div`
  color: white;
  margin-top: 2px;
  margin-right: 8px;
  ${getTypographyStyles('body-s-medium')}
`;

export const SidebarChatProgressIcon = styled.div.attrs({
  children: <CheckSmallIcon />,
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accent.primary};
`;

export const SidebarChatNameBox = styled.div``;

export const SidebarChatName = styled(Typography).attrs({
  variant: 'body-m-medium',
  component: 'div',
})`
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.3s;
  ${adaptive({
    tablet: css`
      max-width: 130px;
    `,
    mobile: css`
      max-width: 130px;
    `,
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
    `,
  })}
`;

export const SidebarChatActions = styled.div`
  display: flex;
  gap: 6px;
  margin-left: 8px;
`;

export const SidebarChatEditAction = styled(Button).attrs({
  variant: 'text',
  children: <MenuDotIcon />,
})`
  transform: rotate(90deg);
`;

export const SidebarChatDeleteAction = styled(Button).attrs({
  variant: 'text',
  children: <TrashIcon />,
})``;

export const SidebarChatClosed = styled.div``;

export const SidebarChatCaps = styled(Typography).attrs({
  variant: 'body-s-medium',
  component: 'span',
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
  ${({ $active, theme }) =>
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
        background-color: ${theme.colors.accent.primary};
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
  ${({ $active, theme }) =>
    $active &&
    css`
      background-color: ${theme.colors.grayScale.gray4};
    `}
`;

export interface SidebarChatStyledProps {
  $active: boolean;
  $skeleton: boolean;
  $draggble: boolean;
  $isProgress: boolean;
  $progressDone: boolean;
}

export const SidebarChatStyled = styled.div<SidebarChatStyledProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 8px;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;

  ${({ $progressDone, theme }) =>
    $progressDone &&
    css`
      &::before {
        content: '';
        display: block;
        background: ${theme.colors.gradient.deluxe};
        border-radius: 10px;
        opacity: 0.2;
        position: absolute;
        inset: 0;
      }
    `};

  ${({ $draggble, theme }) => {
    if ($draggble) {
      return css`
        background: ${theme.colors.grayScale.gray3};
        border-radius: 10px;
        opacity: 0.7;
      `;
    }
  }};
  ${({ $active, $skeleton, $progressDone, theme }) => {
    if ($active) {
      return css`
        border-radius: 10px;
        background-color: ${colorToRgba(theme.colors.accent.primaryLight, 0.5)};
        transition: background-color 0.3s ease-out;
        ${SidebarChatIconStyled} {
          path {
            stroke: ${theme.colors.base.white};
          }
          border-radius: 10px;
        }
      `;
    }
    if (!$active && !$skeleton && !$progressDone) {
      return css`
        &:hover {
          border-radius: 10px;
          background-color: ${colorToRgba(
            theme.colors.accent.primaryLight,
            0.5,
          )};
          transition: background-color 0.3s ease-out;
        }
      `;
    }
  }}
  ${({ $skeleton, $active, $isProgress }) => {
    if ($skeleton || $active || $isProgress) {
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

export const SidebarChatContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const SidebarChatNameTooltip = styled(Tooltip)``;

export const SidebarChatProgress = styled(Progress).attrs({
  fullWidth: true,
})`
  & > div {
    height: 3px;
  }

  & > div > div {
    background: ${({ theme }) => theme.colors.gradient.deluxe};
  }
`;
