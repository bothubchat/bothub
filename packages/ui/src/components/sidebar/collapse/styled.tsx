import { styled } from 'styled-components';
import { ArrowUpIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';

export const SidebarCollapseStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const SidebarCollapseArrow = styled(ArrowUpIcon).attrs({ size: 16 })`
  path {
    stroke: ${({ theme }) => theme.colors.grayScale.gray1};
  }
`;

export const SidebarCollapseLabel = styled(Typography).attrs({ variant: 'body-m-medium', component: 'span' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export const SidebarCollapseLabelSkeleton = styled(Skeleton)`
  width: 180px;
`;

export const SidebarCollapseHead = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    ${SidebarCollapseArrow} path {
      stroke: ${({ theme }) => theme.colors.base.white};
    }
    ${SidebarCollapseLabel} {
      color: ${({ theme }) => theme.colors.base.white};
    }
  }
`;

export const SidebarCollapseBody = styled.div`
  width: 100%;
`;
