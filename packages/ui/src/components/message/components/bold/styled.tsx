import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageColor } from '../../types';

export interface MessageBoldStyledProps {
  $messageColor: MessageColor;
}

export const MessageBoldStyled = styled(Typography).attrs({ component: 'b', variant: 'body-m-regular' })<MessageBoldStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
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
