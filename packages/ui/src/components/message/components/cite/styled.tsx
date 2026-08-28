import { css, styled } from 'styled-components';

export interface MessageCiteStyledProps {
  $messageColor: string;
}

export const MessageCiteStyled = styled.cite<MessageCiteStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.colors.base.white;
    }
    return theme.colors.base.white;
  }};
  font-style: italic;
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
