import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { EditIcon, TrashIcon } from '@/ui/icons';
import { Skeleton } from '@/ui/components/skeleton';
import { adaptive } from '@/ui/adaptive';

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

export interface SidebarChatNameProps {
  $open: boolean;
}

export const SidebarChatName = styled(Typography).attrs({ variant: 'body-m-medium', component: 'span' })<SidebarChatNameProps>`
  margin-left: 8px;
  white-space: nowrap;
  transition: opacity 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
  @media (max-width: 1700px) {
    max-width: 140px;
  }
  ${({ $open }) => !$open && css`
    opacity: 0 !important;
  `}
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

export interface SidebarChatNumbersProps {
  $open: boolean;
}

export const SidebarChatNumbers = styled(Typography).attrs({ variant: 'body-s-medium', component: 'span' })<SidebarChatNumbersProps>`
  display: inline-flex;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 10px;
  cursor: default;
  transition: opacity 0.3s;
  ${({ $open }) => !$open && css`
    opacity: 0 !important;
  `}
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
      ${SidebarChatNumbers},
      ${SidebarChatActions} {
        opacity: 0.4;
      }
      &:hover {
        ${SidebarChatColor},
        ${SidebarChatName},
        ${SidebarChatNumbers},
        ${SidebarChatActions} {
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
  ${adaptive({
    variant: 'dashboard',
    touch: css`
      ${SidebarChatActions} {
        visibility: visible;
      }
    `
  })}
`;
