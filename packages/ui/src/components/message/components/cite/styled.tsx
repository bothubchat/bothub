import { styled } from 'styled-components';
import { messageSelectionStyles } from '../selection';

export interface MessageCiteStyledProps {
  $messageColor: string;
}

export const MessageCiteStyled = styled.cite<MessageCiteStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.colors.base.white;
    }
    return theme.colors.base.white;
  }};
  font-style: italic;
  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
