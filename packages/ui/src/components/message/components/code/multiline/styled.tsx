import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '@/ui/components/message';
import { themeVar } from '@/ui/theme';

/** Блок кода — карточка: строка с языком и копированием, под ней код */
export const MessageMultilineCodeStyled = styled.div`
  display: flex;
  flex-direction: column;
  /* В колонке сообщения блок занимает всю ширину, а не жмётся по коду */
  align-self: stretch;
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray3')};
  border-radius: 12px;
  overflow: hidden;
  margin: 12px 0px;
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
        return themeVar(theme, 'default.colors.base.white');
      case 'assistant':
        if ($messageColor !== 'default') {
          return themeVar(theme, 'tokens.codeAccent');
        }

        return themeVar(theme, 'tokens.surfaceRaised');
    }
  }};
  min-height: 38px;
  padding: 0 6px 0 14px;
`;

export interface MessageMultilineCodeLanguageProps {
  $messageVariant: MessageVariant;
  $messageColor: string;
}

export const MessageMultilineCodeLanguage = styled(Typography).attrs({
  variant: 'body-l-medium',
})<MessageMultilineCodeLanguageProps>`
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
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
  &::selection {
    background: ${({ theme, $messageColor }) => {
      switch ($messageColor) {
        case 'default':
          return themeVar(theme, 'default.colors.base.white');
        case 'green':
          return themeVar(theme, 'colors.gpt3');
        case 'purple':
          return themeVar(theme, 'colors.gpt4');
        default:
          return $messageColor;
      }
    }};
    color: ${({ theme, $messageColor }) => {
      if ($messageColor === 'default') {
        return themeVar(theme, 'colors.accent.primary');
      }

      return themeVar(theme, 'default.colors.base.white');
    }};
  }
`;

export const MessageMultilineCodeBody = styled.div`
  > div > pre {
    margin: 0px;
  }
`;
