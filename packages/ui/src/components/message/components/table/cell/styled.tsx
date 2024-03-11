import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageColor } from '@/ui/components/message/types';

export const MessageTableCellStyled = styled.td`
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background: ${({ theme }) => theme.colors.base.black};
  padding: 10px;
`;

export const MessageTableHeadCell = styled(MessageTableCellStyled).attrs({ as: 'th' })`
  background: ${({ theme }) => theme.colors.grayScale.gray4};
`;

export interface MessageTableCellTextProps {
  $head: boolean;
  $messageColor: MessageColor;
}

export const MessageTableCellText = styled(Typography).attrs({ variant: 'body-s-medium' })<MessageTableCellTextProps>`
  ${({ theme, $head }) => $head && css`
    color: ${theme.default.colors.grayScale.gray6};
  `}
  &::selection {
    ${({ $messageColor }) => {
    switch ($messageColor) {
      case 'green':
        return css`
          background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.gpt3 : theme.default.colors.base.white)};
          color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.gpt3)};
        `;
      case 'purple':
        return css`
          background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.gpt4 : theme.default.colors.base.white)};
          color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.gpt4)};
        `;
      default:
        return css`
          background: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)};
          color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.accent.primary)};
        `;
    }
  }}
  }
`;
