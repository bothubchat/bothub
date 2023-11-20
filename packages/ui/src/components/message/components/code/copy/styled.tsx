import { styled, css } from 'styled-components';
import { MessageVariant } from '../../../types';
import { Button } from '@/ui/components/button';

export interface MessageCodeCopyButtonStyledProps {
  $focus: boolean;
  $messageVariant: MessageVariant;
}

export const MessageCodeCopyButtonStyled = styled(Button).attrs({ variant: 'text' })<MessageCodeCopyButtonStyledProps>`
  ${({ $focus }) => $focus && css`
    cursor: default;
  `}
  > svg path {
    fill: ${({ theme, $messageVariant }) => {
    switch ($messageVariant) {
      case 'user':
        return theme.colors.accent.primary;
      case 'assistant':
        return theme.default.colors.base.white;
    }
  }} !important;
  }
  &:hover {
    > svg path {
      fill: ${({ theme, $messageVariant }) => {
    switch ($messageVariant) {
      case 'user':
        return theme.colors.accent.primary;
      case 'assistant':
        return theme.default.colors.base.white;
    }
  }} !important;
    }
  }
`;
