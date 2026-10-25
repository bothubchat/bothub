import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageColor } from '../../types';
import { messageSelectionStyles } from '../selection';

export interface MessageStrikeStyledProps {
  $messageColor: MessageColor;
}

export const MessageStrikeStyled = styled(Typography)<MessageStrikeStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  text-decoration: line-through;
  opacity: 0.85;

  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
