import { css, styled } from 'styled-components';
import { MessageColor } from '../../types';

export interface MessageBlockquoteStyledProps {
  $messageColor: MessageColor;
}

export const MessageBlockquoteStyled = styled.blockquote<MessageBlockquoteStyledProps>`
  margin: 10px 0;
  padding: 4px 0 4px 14px;
  border-left: 3px solid
    ${({ theme, $messageColor }) => {
      if ($messageColor !== 'default') {
        return theme.default.colors.base.white;
      }

      return theme.colors.accent.primary;
    }};
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  opacity: 0.9;

  &::selection {
    ${({ $messageColor }) => {
      switch ($messageColor) {
        case 'default':
          return css`
            background: ${({ theme }) =>
              theme.mode === 'light'
                ? theme.default.colors.accent.primary
                : theme.colors.base.white};
            color: ${({ theme }) =>
              theme.mode === 'light'
                ? theme.default.colors.base.white
                : theme.colors.accent.primary};
          `;
        case 'green':
          return css`
            background: ${({ theme }) => theme.default.colors.base.white};
            color: ${({ theme }) => theme.colors.gpt3};
          `;
        case 'purple':
          return css`
            background: ${({ theme }) => theme.default.colors.base.white};
            color: ${({ theme }) => theme.colors.gpt4};
          `;
        default:
          return css`
            background: ${({ theme }) => theme.default.colors.base.white};
            color: ${$messageColor};
          `;
      }
    }}
  }
`;
