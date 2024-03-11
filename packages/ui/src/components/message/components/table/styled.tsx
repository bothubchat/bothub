import { styled, css } from 'styled-components';
import { MessageTableCellStyled } from './cell';

export const MessageTableStyled = styled.div``;

export const MessageTableContent = styled.table`
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-collapse: separate;
  border-spacing: 0px;
  border-radius: 8px;
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
