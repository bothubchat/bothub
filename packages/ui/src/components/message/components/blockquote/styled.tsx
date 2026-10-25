import { styled } from 'styled-components';
import { MessageColor } from '../../types';
import { messageSelectionStyles } from '../selection';

export interface MessageBlockquoteStyledProps {
  $messageColor: MessageColor;
}

export const MessageBlockquoteStyled = styled.blockquote<MessageBlockquoteStyledProps>`
  margin: 10px 0;
  padding: 4px 0 4px 14px;
  border-left: 3px solid
    ${({ theme, $messageColor }) => {
      if ($messageColor !== 'default') {
        return theme.default.colors.base.white;
      }

      return theme.colors.accent.primary;
    }};
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  opacity: 0.9;

  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
