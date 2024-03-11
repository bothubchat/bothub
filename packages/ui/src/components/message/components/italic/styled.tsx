import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageColor } from '../../types';

export interface MessageItalicStyledProps {
  $messageColor: MessageColor;
}

export const MessageItalicStyled = styled(Typography).attrs({
  variant: 'body-m-regular'
})<MessageItalicStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  font-style: italic;
  &::selection {
    ${({ $messageColor }) => {
    switch ($messageColor) {
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
          background: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)};
          color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.accent.primary)};
        `;
    }
  }}
  }
`;
