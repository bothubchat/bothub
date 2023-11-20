import { css, styled } from 'styled-components';
import Highlight from 'react-highlight';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '../../types';
import { ScrollbarStyle } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';

export interface MessageUnlineCodeProps {
  $messageVariant: MessageVariant;
}

export const MessageUnlineCode = styled(Typography).attrs({ variant: 'body-m-regular', component: 'code' })<MessageUnlineCodeProps>`
  display: inline-flex;
  border-radius: 4px;
  padding: 0.5px 4.5px;
  ${({ theme, $messageVariant }) => {
    switch ($messageVariant) {
      case 'user':
        return css`
          background: ${theme.colors.accent.primaryLight};
        `;
      case 'assistant':
        return css`
          background: ${theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.grayScale.gray3};
        `;
    }
  }}
  &::selection {
    background: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)};
    color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.accent.primary)};
  }
`;

export const MessageMultilineCode = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
`;

export interface MessageCodeHeadProps {
  $messageVariant: MessageVariant;
}

export const MessageCodeHead = styled.div<MessageCodeHeadProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme, $messageVariant }) => {
    switch ($messageVariant) {
      case 'user':
        return theme.colors.base.white;
      case 'assistant':
        return theme.colors.accent.primary;
    }
  }};
  padding: 14px;
`;

export interface MessageCodeLanguageProps {
  $messageVariant: MessageVariant;
}

export const MessageCodeLanguage = styled(Typography).attrs({ variant: 'body-s-medium' })<MessageCodeLanguageProps>`
  color: ${({ theme, $messageVariant }) => {
    switch ($messageVariant) {
      case 'user':
        return theme.colors.accent.primary;
      case 'assistant':
        return theme.default.colors.base.white;
    }
  }};  
`;

export const MessageCodeBody = styled.div`
  > pre {
    margin: 0px;
  }
`;

export const MessageCodeContent = styled(Highlight)`
  ${ScrollbarStyle}
  line-height: 1.3;
  span {
    line-height: 1.3;
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
