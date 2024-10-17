import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Tooltip } from '@/ui/components/tooltip';
import { Skeleton } from '@/ui/components/skeleton';
import { ArrowDownIcon, DragDotIcon } from '@/ui/icons';
import { FolderIcon } from '@/ui/icons/folder';
import { Checkbox } from '@/ui/components/checkbox';
import { SidebarDropdownStyled } from '../dropdown';
import { SidebarChatIconContainer } from '../chat';

export const SidebarGroupsStyled = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
`;

export const SidebarGroupStyled = styled.div<{ $over?: boolean; }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${({ $over }) => {
    if ($over) {
      return css`
        background: ${({ theme }) => theme.colors.grayScale.gray7};
        border-radius: 10px;
      `;
    }
  }}
`;
export const SidebarGroupArrowDown = styled(ArrowDownIcon)`
  transition: transform 0.2s ease;
`;

export const SidebarGroupName = styled(Typography).attrs({ variant: 'body-l-medium', component: 'div' }) <{ open?: boolean; $skeleton?: boolean; }>`
  color: ${({ theme }) => theme.colors.base.white};
  display: flex;
  cursor: ${({ $skeleton }) => {
    if ($skeleton) {
      return 'not-allowed';
    }
    return 'pointer';
  }};
  padding: 8px;
  align-items: center;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  & > ${SidebarDropdownStyled} {
    overflow: hidden;
    width: 0;
    margin-left: 0;
    transition: width 0.3s ease, margin-left 0.3s ease;
  }
  &:hover {
    & > ${SidebarDropdownStyled} {
      display: flex;
      width: 38px;
      margin-left: 16px;
    }
  }
  & > ${SidebarGroupArrowDown} {
    transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export const SidebarGroupNameBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const SidebarChatList = styled.div<{ open?: boolean; isDefault?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${({ open }) => {
    if (!open) {
      return css`
        overflow: hidden;
        height: 0;
      `;
    }
  }}
  ${(isDefault) => !isDefault && css`
    min-height: 100px;

    ${SidebarChatIconContainer} svg path {
        stroke: ${({ theme }) => theme.colors.grayScale.gray4};
        fill: ${({ theme }) => theme.colors.grayScale.gray4};
      }
  `}
  transition: opacity 0.3s;
`;

export const SidebarGroupCheckbox = styled(Checkbox)`
  margin-left:10px;
`;

export const SidebarGroupDragHandle = styled(DragDotIcon)`
  margin-right: 8px;
`;

export const SidebarGroupDragFolder = styled(FolderIcon)`
  margin-right: 10px;
`;

export const SidebarGroupTooltip = styled(Tooltip)`
  display: flex;
`;

export const SidebarGroupSkeleton = styled(Skeleton)`
  margin-left: 10px;
`;

export const SidebarGroupSkeletonIcon = styled(Skeleton)``;
