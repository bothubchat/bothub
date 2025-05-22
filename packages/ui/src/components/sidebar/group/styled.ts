import { css, keyframes, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Tooltip } from '@/ui/components/tooltip';
import { Skeleton } from '@/ui/components/skeleton';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { DragDotIcon } from '@/ui/icons/drag-dot';
import { FolderIcon } from '@/ui/icons/folder';
import { Checkbox } from '@/ui/components/checkbox';
import { adaptive } from '@/ui/adaptive';
import { SidebarDropdownStyled } from '../dropdown';
import { colorToRgba } from '@/ui/utils/colors';

export const SidebarGroupsStyled = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
`;

export const SidebarGroupStyled = styled.div<{ $over?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${({ $over, theme }) => {
    if ($over) {
      return css`
        background: ${colorToRgba(theme.colors.accent.primaryLight, 0.4)};
        border-radius: 10px;
      `;
    }
  }}
`;
export const SidebarGroupArrowDown = styled(ArrowDownIcon)`
  transition: transform 0.2s ease;
`;

const SidebarGroupNameOutlineAnimation = keyframes`
  from {
    opacity: 0;
    left: 0;
  }
  to {
    opacity: 1;
    left: -3px;
  }
`;

export interface SidebarGroupNameWithOutlineProps {
  $active?: boolean;
  $open?: boolean;
}

export const SidebarGroupNameWithOutline = styled.div<SidebarGroupNameWithOutlineProps>`
  width: 100%;
  position: relative;
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    z-index: 0;
  }
  &:hover {
    &:before {
      background-color: ${({ theme }) => theme.colors.accent.primary};
    }
  }
  ${({ $active, theme }) =>
    $active &&
    css`
      width: calc(100% - 3px);
      margin-left: 3px;
      &:before {
        background-color: ${theme.colors.accent.primary};
        animation: ${SidebarGroupNameOutlineAnimation} 0.3s ease-out 1 forwards;
      }
    `}
`;

export const SidebarGroupNameWithBg = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  position: relative;
`;

export interface SidebarGroupNameProps {
  $open?: boolean;
  $skeleton?: boolean;
  $edit?: boolean;
}

export const SidebarGroupName = styled(Typography).attrs({
  variant: 'body-l-medium',
  component: 'div'
})<SidebarGroupNameProps>`
  color: ${({ theme }) => theme.colors.base.white};
  display: flex;
  cursor: ${({ $skeleton }) => ($skeleton ? 'not-allowed' : 'pointer')};
  padding: 8px;
  align-items: center;
  position: relative;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) =>
      colorToRgba(theme.colors.accent.primaryLight, 0.5)};
    border-radius: 10px;
    transition: background-color 0.3s ease-out;
  }
  & > ${SidebarDropdownStyled} {
    display: flex;
    width: 24px;
    margin-left: 16px;
  }
  & > ${SidebarGroupArrowDown} {
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export const SidebarGroupNameBox = styled.div`
  width: 100%;
  white-space: nowrap;
  display: block;
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SidebarChatList = styled.div<{
  $open?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 40px;
  ${({ $open }) => {
    if (!$open) {
      return css`
        display: none;
      `;
    }
    return css`
      margin-top: 3px;
    `;
  }}
  transition: opacity 0.3s;
`;

export const SidebarGroupCheckbox = styled(Checkbox)`
  margin-left: 16px !important;
`;

export const SidebarGroupDragHandle = styled(DragDotIcon)`
  margin-right: 8px;
`;

export const SidebarGroupDragFolder = styled(FolderIcon)`
  margin-right: 10px;
`;

export const SidebarGroupTooltip = styled(Tooltip)`
  overflow: hidden;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      display: flex;
    `,
    tablet: css`
      display: none;
    `
  })}
`;

export const SidebarGroupIconContainer = styled.div`
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      display: none;
    `,
    tablet: css`
      display: flex;
    `
  })}
`;

export const SidebarGroupSkeleton = styled(Skeleton)`
  margin-left: 10px;
`;

export const SidebarGroupSkeletonIcon = styled(Skeleton)``;
