import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '@/ui/components/message';

export interface MessageParagraphStyledProps {
  $variant: MessageVariant;
  $color: string;
  $wrap: boolean;
  $disableMargin: boolean;
}

export const MessageParagraphStyled = styled(
  Typography
)<MessageParagraphStyledProps>`
  color: ${({ theme, $variant, $color }) => {
    if ($variant === 'user') {
      return theme.colors.base.white;
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
      white-space: pre-wrap;
    `}
  &::selection {
    ${({ $variant, $color }) => {
      switch ($variant) {
        case 'user':
          return css`
            background: ${({ theme }) =>
              theme.mode === 'light'
                ? theme.colors.accent.primaryLight
                : theme.colors.base.white};
            color: ${({ theme }) =>
              theme.mode === 'light'
                ? theme.default.colors.base.white
                : theme.colors.accent.primary};
          `;
        case 'assistant':
          switch ($color) {
            case 'default':
              return css`
                background: ${({ theme }) =>
                  theme.mode === 'light'
                    ? theme.default.colors.accent.primary
                    : theme.colors.base.white};
                color: ${({ theme }) =>
                  theme.mode === 'light'
                    ? theme.default.colors.base.white
                    : theme.colors.accent.primary};
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
                color: ${$color};
              `;
          }
      }
    }}
  }
`;
