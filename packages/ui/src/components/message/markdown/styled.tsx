import ReactMarkdown from 'react-markdown';
import { css, keyframes, styled } from 'styled-components';
import React from 'react';
import { MessageColor } from '@/ui/components/message/types';
import {
  MessageBoldStyled, 
  MessageInlineCodeStyled,
  MessageItalicStyled,
  MessageLinkStyled, 
  MessageListItemStyled, 
  MessageListStyled, 
  MessageMultilineCodeContent, 
  MessageMultilineCodeStyled, 
  MessageParagraphStyled, 
  MessagePre,
  MessageTableCellStyled,
  MessageTableRow,
  MessageTableStyled,
  MessageTitleStyled
} from '@/ui/components/message/components';

export const MessageMarkdownStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

export interface MessageMarkdownStyledProps {
  $typing: boolean;
  $color: MessageColor;
  $singleDollarTextMath: boolean;
}

export const MessageMarkdownLine = React.memo(styled(ReactMarkdown)<MessageMarkdownStyledProps>`
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.colors.base.white};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  > *:first-child {
    margin-top: 0px;
  }
  > *:last-child {
    margin-bottom: 0px;
  }
  > ${MessagePre}:first-child {
    > ${MessageMultilineCodeStyled} {
      margin-top: 0px;
    }
  }
  > ${MessagePre}:last-child {
    > ${MessageMultilineCodeStyled} {
      margin-bottom: 0px;
    }
  }
  ${({ $typing, $color }) => $typing && css`
    &:last-child > ${MessageParagraphStyled}:last-child,
    &:last-child > ${MessageBoldStyled}:last-child,
    &:last-child > ${MessageItalicStyled}:last-child,
    &:last-child > ${MessageInlineCodeStyled}:last-child,
    &:last-child > ${MessagePre}:last-child > ${MessageMultilineCodeStyled}:last-child ${MessageMultilineCodeContent},
    &:last-child > ${MessageTableStyled} *:last-child > ${MessageTableRow}:last-child > ${MessageTableCellStyled}:last-child,
    &:last-child > ${MessageListStyled}:last-child > ${MessageListItemStyled}:last-child,
    &:last-child > ${MessageTitleStyled}:last-child,
    &:last-child > ${MessageLinkStyled}:last-child {
      &:after {
        display: inline-flex;
        width: calc(var(--bothub-typing-cursor-size, 21px) / 3.5);
        height: var(--bothub-typing-cursor-size, 21px);
        border-radius: calc(var(--bothub-typing-cursor-size, 21px) / 7);
        flex-shrink: 0;
        background: ${({ theme }) => {
    if ($color !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
        vertical-align: text-top;
        animation: ${messageTextCursorOpacity} 0.9s infinite;
        content: '';
        @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
          height: 17px;
        }
      }
    }
  `}
`, (prevProps, nextProps) => (
  prevProps.children === nextProps.children
  && prevProps.$typing === nextProps.$typing
  && prevProps.$color === nextProps.$color
  && prevProps.$singleDollarTextMath === nextProps.$singleDollarTextMath
));

export const messageTextCursorOpacity = keyframes`
  from {
    opacity: 0.75;
  }
  50% {
    opacity: 0;
  }
  to {
    opacity: 0.75;
  }
`;
