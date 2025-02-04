import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '@/ui/components/message';

export interface MessageInlineCodeStyledProps {
  $messageVariant: MessageVariant;
  $messageColor: string;
}

export const MessageInlineCodeStyled = styled(Typography).attrs({ variant: 'body-l-regular', component: 'code' }) <MessageInlineCodeStyledProps>`
  display: inline-flex;
  border-radius: 4px;
  ${({ theme, $messageVariant, $messageColor }) => {
    switch ($messageVariant) {
      case 'user':
        return css`
          background: ${theme.colors.accent.primaryLight};
          color: ${theme.default.colors.base.white};
        `;
      case 'assistant':
        if ($messageColor !== 'default') {
          return css`
            color: ${theme.colors.base.white};
            background: ${theme.colors.grayScale.gray3};
          `;
        }

        return css`
          background: ${theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.grayScale.gray3};
        `;
    }
  }}
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
