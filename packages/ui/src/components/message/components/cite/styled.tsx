import { styled } from 'styled-components';
import { messageSelectionStyles } from '../selection';
import { themeVar } from '@/ui/theme';

export interface MessageCiteStyledProps {
  $messageColor: string;
}

export const MessageCiteStyled = styled.cite<MessageCiteStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return themeVar(theme, 'colors.base.white');
    }
    return themeVar(theme, 'colors.base.white');
  }};
  font-style: italic;
  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
