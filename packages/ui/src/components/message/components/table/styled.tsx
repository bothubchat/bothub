import { styled, css } from 'styled-components';
import { MessageTableCellStyled } from './cell';
import { themeVar } from '@/ui/theme';

export const MessageTableStyled = styled.div``;

export const MessageTableContent = styled.table`
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray3')};
  border-collapse: separate;
  border-spacing: 0px;
  border-radius: 10px;
  overflow: hidden;
  ${() => css`
    ${MessageTableRow} {
      &:first-child {
        ${MessageTableCellStyled} {
          border-top-width: 0px;
        }
      }
      &:not(:first-child) {
        ${MessageTableCellStyled} {
          border-top-width: 0px;
        }
      }
      &:last-child {
        ${MessageTableCellStyled} {
          border-bottom-width: 0px;
        }
      }
      ${MessageTableCellStyled} {
        border-left-width: 0px;
        &:last-child {
          border-right-width: 0px;
        }
      }
    }
    ${MessageTableHead} ~ ${MessageTableBody} {
      ${MessageTableRow} {
        &:first-child {
          ${MessageTableCellStyled} {
            border-top-width: 1px;
          }
        }
      }
    }
  `}
`;

export const MessageTableHead = styled.thead``;

export const MessageTableBody = styled.tbody``;

export const MessageTableRow = styled.tr``;
