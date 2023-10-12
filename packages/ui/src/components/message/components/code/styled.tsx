import { css, styled } from 'styled-components';
import Highlight from 'react-highlight';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { CopyIcon } from '@/ui/icons';
import { MessageVariant } from '../../types';

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
          background: ${theme.colors.grayScale.gray3};
        `;
    }
  }}
  &::selection {
    background: ${({ theme }) => theme.colors.base.white};
    color: ${({ theme }) => theme.colors.accent.primary};
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
        return theme.colors.base.white;
    }
  }};  
`;

export interface MessageCodeCopyButtonProps {
  $messageVariant: MessageVariant;
}

export const MessageCodeCopyButton = styled(Button).attrs({ variant: 'text', children: <CopyIcon /> })<MessageCodeCopyButtonProps>`
  > svg path {
    fill: ${({ theme, $messageVariant }) => {
    switch ($messageVariant) {
      case 'user':
        return theme.colors.accent.primary;
      case 'assistant':
        return theme.colors.base.white;
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
        return theme.colors.base.white;
    }
  }} !important;
    }
  }
`;

export const MessageCodeBody = styled.div`
  > pre {
    margin: 0px;
  }
`;

export const MessageCodeContent = styled(Highlight)``;
