import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export interface MessageBoldStyledProps {
  $messageColor: string;
}

export const MessageBoldStyled = styled(Typography)<MessageBoldStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.colors.base.white;
    }
    return theme.colors.base.white;
  }};
  font-weight: 700;
  &::selection {
    ${({ $messageColor, theme }) => {
      switch ($messageColor) {
        case 'default':
          return css`
            background: ${theme.mode === 'light'
              ? theme.default.colors.accent.primary
              : theme.colors.base.white};
            color: ${theme.mode === 'light'
              ? theme.default.colors.base.white
              : theme.colors.accent.primary};
          `;
        case 'green':
          return css`
            background: ${theme.default.colors.base.white};
            color: ${theme.colors.gpt3};
          `;
        case 'purple':
          return css`
            background: ${theme.default.colors.base.white};
            color: ${theme.colors.gpt4};
          `;
        default:
          return css`
            background: ${theme.default.colors.base.white};
            color: ${$messageColor};
          `;
      }
    }}
  }
`;
