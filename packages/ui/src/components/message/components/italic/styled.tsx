import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageColor } from '../../types';
import { messageSelectionStyles } from '../selection';
import { themeVar } from '@/ui/theme';

export interface MessageItalicStyledProps {
  $messageColor: MessageColor;
}

export const MessageItalicStyled = styled(Typography)<MessageItalicStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return themeVar(theme, 'default.colors.base.white');
    }

    return themeVar(theme, 'colors.base.white');
  }};
  font-style: italic;
  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
