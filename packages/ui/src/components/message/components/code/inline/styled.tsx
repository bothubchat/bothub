import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '@/ui/components/message';
import { messageSelectionStyles } from '../../selection';

export interface MessageInlineCodeStyledProps {
  $messageVariant: MessageVariant;
  $messageColor: string;
}

export const MessageInlineCodeStyled = styled(Typography).attrs({
  variant: 'body-l-regular',
  component: 'code',
})<MessageInlineCodeStyledProps>`
  display: inline-flex;
  border-radius: 4px;
  ${({ theme, $messageVariant, $messageColor }) => {
    switch ($messageVariant) {
      case 'user':
        return css`
          background: ${theme.colors.accent.primaryLight};
          color: ${theme.default.colors.base.white};
        `;
      case 'assistant':
        if ($messageColor !== 'default') {
          return css`
            color: ${theme.colors.base.white};
            background: ${theme.colors.grayScale.gray3};
          `;
        }

        return css`
          background: ${theme.mode === 'light'
            ? theme.default.colors.base.white
            : theme.colors.grayScale.gray3};
        `;
    }
  }}
  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
