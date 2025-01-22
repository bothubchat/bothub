import { css, styled } from 'styled-components';
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
import { SidebarDropdownStyled } from '../dropdown';

export const SidebarChatLeft = styled.div`
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

export const SidebarChatIconContainer = styled.span<{ $active?: boolean, $isDefault?: boolean }>`
  display: inline-flex;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  flex-shrink: 0;
  ${SidebarChatIconStyled} {
    display: ${({ $isDefault }) => ($isDefault ? 'inline-flex' : 'none')};
    ${({ $active }) => $active && css`
      fill: ${({ theme }) => theme.colors.base.white};
      stroke: ${({ theme }) => theme.colors.base.white};
    `}
  }
`;

export const SidebarChatName = styled(Typography).attrs({ variant: 'body-m-medium', component: 'span' })`
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

export const SidebarChatEditAction = styled(Button).attrs({ variant: 'text', children: <MenuDotIcon /> })`
  transform: rotate(90deg);
`;

export const SidebarChatDeleteAction = styled(Button).attrs({ variant: 'text', children: <TrashIcon /> })``;

export const SidebarChatClosed = styled.div``;

export const SidebarChatCaps = styled(Typography).attrs({ variant: 'body-s-medium', component: 'span' })`
  display: inline-flex;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 10px;
  cursor: default;
  transition: opacity 0.3s;
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
  ${({ $draggble, theme }) => $draggble && css`
    background: ${theme.colors.grayScale.gray3};
    border-radius: 10px;
    opacity: 0.7;
  `}
  ${({ $active }) => {
    if ($active) {
      return css`
        ${SidebarChatIconStyled} {
          path {
            stroke: ${({ theme }) => theme.colors.base.white};
          }
          border-radius: 10px;
        }
      `;
    }
  }}
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      ${SidebarDropdownStyled} {
        margin-left: 0;
        width: 0;
        overflow: hidden;
        transition: width 0.3s ease, margin-left 0.3s ease;
      }
      &:hover {
        ${SidebarDropdownStyled} {
          width: 38px;
          margin-left: 16px;
          fill: ${({ theme }) => theme.colors.base.white};
        }
      }
    `
  })}
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

export const SidebarChatNameTooltip = styled(Tooltip)`overflow: hidden;`;
