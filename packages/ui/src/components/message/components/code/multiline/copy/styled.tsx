import { styled } from 'styled-components';
import { MessageVariant } from '@/ui/components/message';
import { themeVar } from '@/ui/theme';

export interface MessageMultilineCodeCopyButtonStyledProps {
  $focus: boolean;
  $messageVariant: MessageVariant;
  $messageColor: string;
}

/** Копирование кода: значок на прозрачном поле, как действия под сообщением */
export const MessageMultilineCodeCopyButtonStyled = styled.button.attrs({
  type: 'button',
})<MessageMultilineCodeCopyButtonStyledProps>`
  all: unset;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 7px;
  cursor: ${({ $focus }) => ($focus ? 'default' : 'pointer')};
  color: ${({ theme, $messageVariant, $messageColor }) => {
    switch ($messageVariant) {
      case 'user':
        return themeVar(theme, 'colors.accent.primary');
      case 'assistant':
        switch ($messageColor) {
          case 'default':
            return themeVar(theme, 'tokens.textSecondary');
          case 'green':
            return themeVar(theme, 'tokens.messageAccentGreen');
          case 'purple':
            return themeVar(theme, 'tokens.messageAccentPurple');
          default:
            return $messageColor;
        }
    }
  }};
  transition:
    background-color 120ms ease-out,
    color 120ms ease-out;
  &:hover {
    background-color: ${({ theme }) => themeVar(theme, 'tokens.hoverOverlay')};
    ${({ theme, $messageVariant, $messageColor }) =>
      $messageVariant === 'assistant' &&
      $messageColor === 'default' &&
      `color: ${themeVar(theme, 'tokens.textStrong')};`}
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => themeVar(theme, 'tokens.borderFocus')};
    outline-offset: -2px;
  }
`;
