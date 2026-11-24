import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { themeVar } from '@/ui/theme';

export const MessageTableCellStyled = styled.td`
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray3')};
  padding: 8px 12px;
`;

export const MessageTableHeadCell = styled(MessageTableCellStyled).attrs({
  as: 'th',
})`
  background: ${({ theme }) => themeVar(theme, 'tokens.surfaceRaised')};
`;

export interface MessageTableCellTextProps {
  $head: boolean;
  $messageColor: string;
}

export const MessageTableCellText = styled(Typography).attrs({
  variant: 'body-m-medium',
})<MessageTableCellTextProps>`
  ${({ theme, $head }) =>
    $head &&
    css`
      color: ${themeVar(theme, 'default.colors.grayScale.gray6')};
    `}
  &::selection {
    ${({ $messageColor }) => {
      switch ($messageColor) {
        case 'default':
          return css`
            background: ${({ theme }) =>
              themeVar(theme, 'tokens.accentContrast')};
            color: ${({ theme }) =>
              themeVar(theme, 'tokens.messageAccentDefault')};
          `;
        case 'green':
          return css`
            background: ${({ theme }) =>
              themeVar(theme, 'tokens.messageAccentGreenInverse')};
            color: ${({ theme }) =>
              themeVar(theme, 'tokens.messageAccentGreen')};
          `;
        case 'purple':
          return css`
            background: ${({ theme }) =>
              themeVar(theme, 'tokens.messageAccentPurpleInverse')};
            color: ${({ theme }) =>
              themeVar(theme, 'tokens.messageAccentPurple')};
          `;
        default:
          return css`
            background: ${({ theme }) =>
              theme.mode === 'light'
                ? $messageColor
                : themeVar(theme, 'default.colors.base.white')};
            color: ${({ theme }) =>
              theme.mode === 'light'
                ? themeVar(theme, 'default.colors.base.white')
                : $messageColor};
          `;
      }
    }}
  }
`;
