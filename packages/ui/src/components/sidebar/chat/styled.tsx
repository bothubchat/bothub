import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { EditIcon } from '@/ui/icons/edit';
import { TrashIcon } from '@/ui/icons/trash';
import { Skeleton } from '@/ui/components/skeleton';
import { adaptive } from '@/ui/adaptive';
import { Tooltip } from '@/ui/components/tooltip';

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
  white-space: nowrap;
  transition: opacity 0.3s;
  ${adaptive({
    desktop: css`
      max-width: 160px;
    `,
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

export const SidebarChatEditAction = styled(Button).attrs({ variant: 'text', children: <EditIcon /> })``;

export const SidebarChatDeleteAction = styled(Button).attrs({ variant: 'text', children: <TrashIcon /> })``;

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
      ${SidebarChatCaps},
      ${SidebarChatActions} {
        opacity: 0.4;
      }
      &:hover {
        ${SidebarChatColor},
        ${SidebarChatName},
        ${SidebarChatCaps},
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

export const SidebarChatTooltip = styled(Tooltip)``;

export const SidebarChatNameTooltip = styled(Tooltip)``;
