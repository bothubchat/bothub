import { styled } from 'styled-components';
import { MessageColor } from '../../types';
import { messageSelectionStyles } from '../selection';
import { themeVar } from '@/ui/theme';

export interface MessageBlockquoteStyledProps {
  $messageColor: MessageColor;
}

export const MessageBlockquoteStyled = styled.blockquote<MessageBlockquoteStyledProps>`
  margin: 10px 0;
  padding: 4px 0 4px 14px;
  border-left: 3px solid
    ${({ theme, $messageColor }) => {
      if ($messageColor !== 'default') {
        return themeVar(theme, 'default.colors.base.white');
      }

      return themeVar(theme, 'colors.accent.primary');
    }};
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return themeVar(theme, 'default.colors.base.white');
    }

    return themeVar(theme, 'colors.base.white');
  }};
  opacity: 0.9;

  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
