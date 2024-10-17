import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '@/ui/components/message';

export const MessageMultilineCodeStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px 0px;
`;

export interface MessageMultilineCodeHeadProps {
  $messageVariant: MessageVariant;
  $messageColor: string;
}

export const MessageMultilineCodeHead = styled.div<MessageMultilineCodeHeadProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme, $messageVariant, $messageColor }) => {
    switch ($messageVariant) {
      case 'user':
        return theme.default.colors.base.white;
      case 'assistant':
        if ($messageColor !== 'default') {
          return theme.default.colors.base.white;
        }

        return theme.colors.accent.primary;
    }
  }};
  padding: 14px;
`;

export interface MessageMultilineCodeLanguageProps {
  $messageVariant: MessageVariant;
  $messageColor: string;
}

export const MessageMultilineCodeLanguage = styled(Typography).attrs({ variant: 'body-s-medium' })<MessageMultilineCodeLanguageProps>`
  color: ${({ theme, $messageVariant, $messageColor }) => {
    switch ($messageVariant) {
      case 'user':
        return theme.colors.accent.primary;
      case 'assistant':
        switch ($messageColor) {
          case 'default':
            return theme.default.colors.base.white;
          case 'green':
            return theme.colors.gpt3;
          case 'purple':
            return theme.colors.gpt4;
          default:
            return $messageColor;
        }
    }
  }};
  &::selection {
    background: ${({ theme, $messageColor }) => {
    switch ($messageColor) {
      case 'default':
        return theme.default.colors.base.white;
      case 'green':
        return theme.colors.gpt3;
      case 'purple':
        return theme.colors.gpt4;
      default:
        return $messageColor;
    }
  }};
    color: ${({ theme, $messageColor }) => {
    if ($messageColor === 'default') {
      return theme.colors.accent.primary;
    }

    return theme.default.colors.base.white;
  }};
  }
`;

export const MessageMultilineCodeBody = styled.div`
  > div > pre {
    margin: 0px;
  }
`;
