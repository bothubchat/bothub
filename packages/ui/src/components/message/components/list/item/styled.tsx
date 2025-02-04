import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageListVariant } from '../types';

export interface MessageListItemStyledProps {
  $variant: MessageListVariant;
  $messageColor: string;
}

export const MessageListItemStyled = styled(Typography).attrs({ component: 'li', variant: 'body-l-regular' }) <MessageListItemStyledProps>`
  display: block;
  position: relative;
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  &:not(:first-child) {
    margin-top: 10px;
  }
  ${({ theme, $variant, $messageColor }) => {
    switch ($variant) {
      case 'dot': {
        let dotColor: string;
        if ($messageColor !== 'default') {
          dotColor = theme.default.colors.base.white;
        } else {
          dotColor = theme.colors.accent.primary;
        }

        return css`
          padding-left: 22px;
          &:before {
            display: inline-block;
            position: absolute;
            left: 0px;
            font-weight: 700;
            color: ${dotColor};
            padding-right: 8px;
            content: "•";
          }

        `;
      }
      case 'number': {
        let numberColor: string;
        if ($messageColor !== 'default') {
          numberColor = theme.colors.base.white;
        } else {
          numberColor = theme.mode === 'dark' ? theme.default.colors.grayScale.gray6 : theme.default.colors.base.black;
        }

        return css`
          &:before {
            display: inline-block;
            position: relative;
            left: 0px;
            padding-right: 8px;
            color: ${numberColor};
            counter-increment: item;
            content: counter(item) ".";
          }
          & > ol {
            padding-left: 22px;
          }
        `;
      }
    }
  }}
  &::selection {
    ${({ $messageColor }) => {
    switch ($messageColor) {
      case 'default':
        return css`
          background: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)};
          color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.accent.primary)};
        `;
      case 'green':
        return css`
          background: ${({ theme }) => theme.default.colors.base.white};
          color: ${({ theme }) => theme.colors.gpt3};
        `;
      case 'purple':
        return css`
          background: ${({ theme }) => theme.default.colors.base.white};
          color: ${({ theme }) => theme.colors.gpt4};
        `;
      default:
        return css`
          background: ${({ theme }) => theme.default.colors.base.white};
          color: ${$messageColor};
        `;
    }
  }}
  }
`;
