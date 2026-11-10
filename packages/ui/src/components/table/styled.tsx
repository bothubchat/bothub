import { styled, css } from 'styled-components';
import { TableCellStyled, TableCellText } from './cell/styled';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';
import { themeVar } from '@/ui/theme';

export const TableStyled = styled.div`
  display: flex;
  width: 100%;
`;

export const TableScrollbarWrapper = styled(Scrollbar).attrs(
  ({ theme, scrollShadows }) => ({
    variant: 'secondary',
    scrollShadows: {
      color: themeVar(theme, 'colors.base.black'),
      left: <ScrollbarShadow side="left" />,
      right: <ScrollbarShadow side="right" />,
      ...scrollShadows,
    },
  }),
)``;

export const TableContent = styled.table<{ $fullWidth?: boolean }>`
  border-collapse: separate;
  border-spacing: 0;
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  ${() => css`
    ${TableRow} {
      &:not(:first-child) > ${TableCellStyled} {
        border-top: none;
      }
      ${TableCellStyled} {
        &:not(:first-child) {
          border-left: none;
        }
      }
    }
  `}
`;

export const TableHead = styled.thead`
  ${() => css`
    ${TableCellStyled} {
      background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray4')};
      ${TableCellText} {
        color: ${({ theme }) =>
          themeVar(theme, 'default.colors.grayScale.gray6')};
      }
    }
    ${TableRow}:last-child > ${TableCellStyled} {
      border-bottom: none;
    }
    ${TableRow}:first-child {
      ${TableCellStyled}:first-child {
        border-top-left-radius: 8px;
      }
      ${TableCellStyled}:last-child {
        border-top-right-radius: 8px;
      }
    }
  `}
`;

export const TableBody = styled.tbody`
  ${() => css`
    ${TableRow}:last-child {
      ${TableCellStyled}:first-child {
        border-bottom-left-radius: 8px;
      }
      ${TableCellStyled}:last-child {
        border-bottom-right-radius: 8px;
      }
    }
  `}
`;

export const TableRow = styled.tr``;
