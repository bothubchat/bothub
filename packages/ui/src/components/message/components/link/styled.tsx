import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageColor } from '../../types';

export interface MessageLinkStyledProps {
  $messageColor: MessageColor;
}

export const MessageLinkStyled = styled(Typography).attrs({ component: 'a', variant: 'body-m-regular' })<MessageLinkStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  text-decoration: underline;
  &::selection {
    ${({ $messageColor }) => {
    switch ($messageColor) {
      case 'default':
        return css`
          background: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)};
          color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.accent.primary)};
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
