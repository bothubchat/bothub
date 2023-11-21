import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '../../types';

export interface MessageParagraphStyledProps {
  $variant: MessageVariant;
  $wrap: boolean;
  $disableMargin: boolean;
}

export const MessageParagraphStyled = styled(Typography).attrs({ variant: 'body-m-regular', component: 'p' })<MessageParagraphStyledProps>`
  color: ${({ theme, $variant }) => {
    if ($variant === 'user') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  ${({ $disableMargin }) => !$disableMargin && css`
    margin: 10px 0px;
  `}
  ${({ $wrap }) => $wrap && css`
    white-space: pre-wrap;
  `}
  &::selection {
    ${({ $variant }) => {
    switch ($variant) {
      case 'user':
        return css`
          background: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.base.white)};
          color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.accent.primary)};
        `;
      case 'assistant':
        return css`
          background: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.accent.primary : theme.colors.base.white)};
          color: ${({ theme }) => (theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.accent.primary)};
        `;
    }
  }}
  }
`;
