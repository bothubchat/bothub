import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '@/ui/components/message';
import { messageSelectionStyles } from '../selection';

export interface MessageParagraphStyledProps {
  $variant: MessageVariant;
  $color: string;
  $wrap: boolean;
  $disableMargin: boolean;
}

export const MessageParagraphStyled = styled(
  Typography,
)<MessageParagraphStyledProps>`
  color: ${({ theme, $variant, $color }) => {
    if ($variant === 'user') {
      if (theme.scheme === 'custom') {
        return theme.colors.custom.message.user.text;
      }

      if (theme.scheme === 'standard') {
        return theme.colors.base.white;
      }

      return theme.bright
        ? theme.tokens.inkDark
        : theme.default.colors.base.white;
    }

    if (theme.scheme === 'custom') {
      return theme.colors.custom.message.assistant.text;
    }

    if ($color === 'default') {
      return theme.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  ${({ $disableMargin }) =>
    !$disableMargin &&
    css`
      margin: 10px 0px;
    `}
  ${({ $wrap }) =>
    $wrap &&
    css`
      overflow-wrap: break-word;
      word-break: normal;
      white-space: pre-wrap;
    `}
  &::selection {
    ${({ $variant, $color }) => {
      switch ($variant) {
        case 'user':
          return css`
            background: ${({ theme }) => theme.tokens.selectionUserBackground};
            color: ${({ theme }) => theme.tokens.messageAccentDefault};
          `;
        case 'assistant':
          return messageSelectionStyles($color);
      }
    }}
  }
`;
