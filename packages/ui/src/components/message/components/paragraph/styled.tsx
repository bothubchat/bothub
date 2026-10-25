import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '@/ui/components/message';
import { messageSelectionStyles } from '../selection';
import { themeVar } from '@/ui/theme';

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
        return themeVar(theme, 'colors.custom.message.user.text');
      }

      if (theme.scheme === 'standard') {
        return themeVar(theme, 'colors.base.white');
      }

      return theme.bright
        ? themeVar(theme, 'tokens.inkDark')
        : themeVar(theme, 'default.colors.base.white');
    }

    if (theme.scheme === 'custom') {
      return themeVar(theme, 'colors.custom.message.assistant.text');
    }

    if ($color === 'default') {
      return themeVar(theme, 'colors.base.white');
    }

    return themeVar(theme, 'colors.base.white');
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
            background: ${({ theme }) =>
              themeVar(theme, 'tokens.selectionUserBackground')};
            color: ${({ theme }) =>
              themeVar(theme, 'tokens.messageAccentDefault')};
          `;
        case 'assistant':
          return messageSelectionStyles($color);
      }
    }}
  }
`;
