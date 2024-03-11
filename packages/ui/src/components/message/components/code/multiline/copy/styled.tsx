import { styled, css } from 'styled-components';
import { MessageColor, MessageVariant } from '@/ui/components/message';
import { Button } from '@/ui/components/button';

export interface MessageMultilineCodeCopyButtonStyledProps {
  $focus: boolean;
  $messageVariant: MessageVariant;
  $messageColor: MessageColor;
}

export const MessageMultilineCodeCopyButtonStyled = styled(Button).attrs({ variant: 'text' })<MessageMultilineCodeCopyButtonStyledProps>`
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
          case 'green':
            return theme.colors.gpt3;
          case 'purple':
            return theme.colors.gpt4;
          default:
            return theme.default.colors.base.white;
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
          case 'green':
            return theme.colors.gpt3;
          case 'purple':
            return theme.colors.gpt4;
          default:
            return theme.default.colors.base.white;
        }
    }
  }} !important;
    }
  }
`;
