import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '@/ui/components/message';
import { messageSelectionStyles } from '../../selection';
import { themeVar } from '@/ui/theme';

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
          background: ${themeVar(theme, 'colors.accent.primaryLight')};
          color: ${themeVar(theme, 'default.colors.base.white')};
        `;
      case 'assistant':
        if ($messageColor !== 'default') {
          return css`
            color: ${themeVar(theme, 'colors.base.white')};
            background: ${themeVar(theme, 'colors.grayScale.gray3')};
          `;
        }

        return css`
          background: ${themeVar(theme, 'tokens.surfaceTertiary')};
        `;
    }
  }}
  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
