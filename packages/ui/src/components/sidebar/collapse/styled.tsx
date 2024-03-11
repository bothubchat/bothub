import { styled } from 'styled-components';
import { ArrowUpIcon } from '@/ui/icons/arrow-up';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';

export const SidebarCollapseStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  width: 100%;
`;

export const SidebarCollapseArrow = styled(ArrowUpIcon).attrs({ size: 16 })`
  path {
    stroke: ${({ theme }) => theme.colors.grayScale.gray1};
  }
`;

export const SidebarCollapseLabel = styled(Typography).attrs({ variant: 'body-m-medium', component: 'span' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  white-space: nowrap;
  transition: opacity 0.3s;
`;

export interface SidebarCollapseLabelSkeletonProps {
  $open: boolean;
}

export const SidebarCollapseLabelSkeleton = styled(Skeleton)<SidebarCollapseLabelSkeletonProps>`
  width: ${({ $open }) => ($open ? '180px' : '30px')};
`;

export const SidebarCollapseHead = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    ${SidebarCollapseArrow} path {
      stroke: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)} !important;
    }
    ${SidebarCollapseLabel} {
      color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)} !important;
    }
  }
`;

export const SidebarCollapseBody = styled.div`
  width: 100%;
`;
