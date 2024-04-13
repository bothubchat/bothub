import { css, styled } from 'styled-components';
import HL from 'react-highlight';
import { Typography } from '@/ui/components/typography';
import { MessageColor, MessageVariant } from '@/ui/components/message';
import { ScrollbarStyle } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';
import { interopDefaultCJSImport } from '@/ui/utils';

const Highlight = interopDefaultCJSImport<typeof HL>(HL);

export const MessageMultilineCodeStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px 0px;
`;

export interface MessageMultilineCodeHeadProps {
  $messageVariant: MessageVariant;
  $messageColor: MessageColor;
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
  $messageColor: MessageColor;
}

export const MessageMultilineCodeLanguage = styled(Typography).attrs({ variant: 'body-s-medium' })<MessageMultilineCodeLanguageProps>`
  color: ${({ theme, $messageVariant, $messageColor }) => {
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
  }};
  &::selection {
    background: ${({ theme, $messageColor }) => {
    switch ($messageColor) {
      case 'green':
        return theme.colors.gpt3;
      case 'purple':
        return theme.colors.gpt4;
      default:
        return theme.default.colors.base.white;
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
  > pre {
    margin: 0px;
  }
`;

export interface MessageMultilineCodeContentProps {
  $messageColor: MessageColor;
}

export const MessageMultilineCodeContent = styled(Highlight)<MessageMultilineCodeContentProps>`
  ${ScrollbarStyle}
  line-height: 1.3;
  span {
    line-height: 1.3;
  }
  &::selection,
  *::selection {
    ${({ $messageColor }) => {
    switch ($messageColor) {
      case 'green':
        return css`
          background: ${({ theme }) => theme.default.colors.base.white} !important;
          color: ${({ theme }) => theme.colors.gpt3} !important;
        `;
      case 'purple':
        return css`
          background: ${({ theme }) => theme.default.colors.base.white} !important;
          color: ${({ theme }) => theme.colors.gpt4} !important;
        `;
      default:
        return css`
          background: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)} !important;
          color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.accent.primary)} !important;
        `;
    }
  }}
  }
  ${adaptive({
    variant: 'dashboard',
    miniTablet: css`
      font-size: 14px !important;
      span {
        font-size: 14px !important;
      }
    `,
    mobile: css`
      font-size: 12px !important;
      span {
        font-size: 12px !important;
      }
    `,
    touch: css`
      &::-webkit-scrollbar {
        display: none;
      }
    `
  })}
`;
