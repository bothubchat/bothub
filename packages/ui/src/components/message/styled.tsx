import { styled, css, keyframes } from 'styled-components';
import Markdown from 'react-markdown';
import { AnimationProps, motion } from 'framer-motion';
import React from 'react';
import { Avatar } from '@/ui/components/avatar';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { CopyIcon, EditIcon } from '@/ui/icons';
import { MessageVariant } from './types';

export interface MessageStyledProps {
  $variant: MessageVariant;
}

export const MessageStyled = styled.div<MessageStyledProps>`
  display: flex;
  width: 100%;
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          justify-content: flex-end;
        `;
      case 'assistant':
        return css``;
    }
  }}
  ${() => css`
    ${MessageActions} {
      visibility: hidden;
    }
    &:hover {
      ${MessageActions} {
        visibility: visible;
      }
    }
  `}
`;

export interface MessageContentProps {
  $variant: MessageVariant;
}

export const MessageContent = styled.div<MessageContentProps>`
  display: grid;
  grid-template-areas: "avatar block actions" ". tokens .";
  column-gap: 10px;
  max-width: 90%;
  ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          grid-template-areas: "actions block avatar" ". tokens .";
        `;
      case 'assistant':
        return css``;
    }
  }}
`;

export const MessageAvatar = styled(Avatar)`
  grid-area: avatar;
  align-self: flex-end;
`;

export interface MessageBlockProps {
  $variant: MessageVariant;
}

export const MessageBlock = styled.div<MessageBlockProps>`
  display: flex;
  grid-area: block;
  border-radius: 10px;
  overflow: hidden;
  padding: 14px 16px;
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          background: ${theme.colors.accent.primary};
          border-bottom-right-radius: 0px;
        `;
      case 'assistant':
        return css`
          background: ${theme.colors.grayScale.gray2};
          border-bottom-left-radius: 0px;
        `;
    }
  }}
`;

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

export interface MessageMarkdownProps {
  $typing: boolean;
}

export const MessageMarkdown = styled(Markdown)<MessageMarkdownProps>`
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.colors.base.white};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 16px;
  line-height: 22px;
  > *:first-child {
    margin-top: 0px;
  }
  > *:last-child {
    margin-bottom: 0px;
  }
  ${({ $typing }) => $typing && css`
    > *:last-child {
      &:after {
        display: inline-block;
        width: 6px;
        height: 21px;
        border-radius: 3px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.colors.base.white};
        vertical-align: text-top;
        animation: ${messageTextCursorOpacity} 0.9s infinite;
        content: '';
        @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
          height: 17px;
        }
      }
    }
  `}
`;

export const MessageTextCursor: React.FC<AnimationProps> = styled(motion.span)`
  display: inline-flex;
  width: 6px;
  height: 22px;
  border-radius: 3px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.base.white};
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    height: 18px;
  }
`;

export const MessageTokens = styled(Typography).attrs({ variant: 'body-m-regular' })`
  grid-area: tokens;
  justify-self: flex-end;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent.primary};
  margin-top: 8px;
`;

export const MessageActions = styled.div`
  display: flex;
  grid-area: actions;
  gap: 10px;
  align-self: flex-end;
`;

export const MessageAction = styled(Button).attrs({ variant: 'text', iconSize: 18 })``;

export const MessageCopyAction = styled(MessageAction).attrs({ children: <CopyIcon /> })``;

export const MessageEditAction = styled(MessageAction).attrs({ children: <EditIcon /> })``;
