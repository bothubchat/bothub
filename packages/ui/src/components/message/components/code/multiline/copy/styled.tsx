import { styled, css } from 'styled-components';
import { MessageVariant } from '@/ui/components/message';
import { Button } from '@/ui/components/button';

export interface MessageMultilineCodeCopyButtonStyledProps {
  $focus: boolean;
  $messageVariant: MessageVariant;
  $messageColor: string;
}

export const MessageMultilineCodeCopyButtonStyled = styled(Button).attrs({ variant: 'text' }) <MessageMultilineCodeCopyButtonStyledProps>`
  ${({ $focus }) => $focus && css`
    cursor: default;
  `}
  > svg path {
    fill: ${({ theme, $messageVariant, $messageColor }) => {
    switch ($messageVariant) {
      case 'user':
        return theme.colors.accent.primary;
      case 'assistant':
        switch ($messageColor) {
          case 'default':
            return theme.default.colors.base.white;
          case 'green':
            return theme.mode === 'dark' ? theme.colors.gpt3 : theme.default.colors.base.white;
          case 'purple':
            return theme.mode === 'dark' ? theme.colors.gpt4 : theme.default.colors.base.white;
          default:
            return $messageColor;
        }
    }
  }} !important;
  }
  &:hover {
    > svg path {
      fill: ${({ theme, $messageVariant, $messageColor }) => {
    switch ($messageVariant) {
      case 'user':
        return theme.colors.accent.primary;
      case 'assistant':
        switch ($messageColor) {
          case 'default':
            return theme.default.colors.base.white;
          case 'green':
            return theme.mode === 'dark' ? theme.colors.gpt3 : theme.default.colors.base.white;
          case 'purple':
            return theme.mode === 'dark' ? theme.colors.gpt4 : theme.default.colors.base.white;
          default:
            return $messageColor;
        }
    }
  }} !important;
    }
  }
`;
