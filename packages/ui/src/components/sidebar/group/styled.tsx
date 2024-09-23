import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Tooltip } from '@/ui/components/tooltip';
import { Skeleton } from '@/ui/components/skeleton';
import { ArrowDownIcon } from '@/ui/icons';

export const SidebarGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`;

export const SidebarGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
export const SidebarGroupArrowDown = styled(ArrowDownIcon)``;

export const SidebarGroupName = styled(Typography).attrs({ variant: 'body-l-medium', component: 'div' }) <{ open?: boolean; }>`
  color: ${({ theme }) => theme.colors.base.white};
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  transition: transform 0.3s;
  & > ${SidebarGroupArrowDown} {
    transform: ${({ open }) => open ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
  
`;

export const SidebarChatList = styled.div<{ open?: boolean; }>`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 100%;
  gap: 6px;
  ${({ open }) => {
    if (!open) {
      return css`
        overflow: hidden;
        height: 0;
      `;
    }
  }}
  transition: opacity 0.3s;
  
`;

export const SidebarGroupTooltip = styled(Tooltip)`
  display: flex;
`;

export const SidebarGroupSkeleton = styled(Skeleton)``;