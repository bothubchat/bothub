import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { TableCellSize } from './types';
import { Skeleton } from '@/ui/components/skeleton';

export interface TableCellStyledProps {
  $size: TableCellSize;
}

export const TableCellStyled = styled.td<TableCellStyledProps>`
  background: ${({ theme }) => theme.colors.base.black};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  text-align: center;
  box-sizing: border-box;
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          padding: 14px 20px;
        `;
      case 'md':
        return css`
          padding: 23px;
          width: 215px;
          min-width: 120px;
        `;
    }
  }}
`;

export const TableCellText = styled(Typography).attrs({
  variant: 'body-s-medium',
})`
  display: inline-flex;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  gap: 8px;
  vertical-align: bottom;
`;

export const TableCellSkeleton = styled(Skeleton).attrs({ width: 90 })``;
