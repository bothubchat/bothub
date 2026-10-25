import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageColor } from '../../types';
import { messageSelectionStyles } from '../selection';

export interface MessageItalicStyledProps {
  $messageColor: MessageColor;
}

export const MessageItalicStyled = styled(Typography)<MessageItalicStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  font-style: italic;
  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
