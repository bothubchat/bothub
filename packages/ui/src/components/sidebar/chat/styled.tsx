import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { EditIcon, TrashIcon } from '@/ui/icons';
import { Skeleton } from '@/ui/components/skeleton';

export const SidebarChatLeft = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const SidebarChatRight = styled.div``;

export interface SidebarChatColorProps {
  $skeleton?: boolean; 
  $color?: string;
}

export const SidebarChatColor = styled.span<SidebarChatColorProps>`
  display: inline-flex;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 4px;
  ${({ theme, $skeleton, $color }) => !$skeleton && css`
    background: ${$color ?? theme.colors.accent.primary};
  `}
`;

export const SidebarChatName = styled(Typography).attrs({ variant: 'body-m-medium', component: 'span' })`
  margin-left: 8px;
`;

export const SidebarChatNameSkeleton = styled(Skeleton)`
  width: 200px;
`;

export const SidebarChatActions = styled.div`
  display: flex;
  gap: 6px;
  margin-left: 8px;
`;

export const SidebarChatEditAction = styled(Button).attrs({ variant: 'text', children: <EditIcon /> })``;

export const SidebarChatDeleteAction = styled(Button).attrs({ variant: 'text', children: <TrashIcon /> })``;

export const SidebarChatNumbers = styled(Typography).attrs({ variant: 'body-s-medium', component: 'span' })`
  display: inline-flex;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 10px;
  cursor: default;
`;

export interface SidebarChatStyledProps {
  $active: boolean;
  $skeleton: boolean;
}

export const SidebarChatStyled = styled.div<SidebarChatStyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${({ $skeleton, $active }) => {
    if ($skeleton || $active) {
      return css``;
    }

    return css`
      ${SidebarChatColor},
      ${SidebarChatName},
      ${SidebarChatNumbers} {
        opacity: 0.4;
      }
      &:hover {
        ${SidebarChatColor},
        ${SidebarChatName},
        ${SidebarChatNumbers} {
          opacity: 1;
        }
      }
    `;
  }}
  ${SidebarChatActions} {
    visibility: hidden;
  }
  &:hover {
    ${SidebarChatActions} {
      visibility: visible;
    }
  }
`;
