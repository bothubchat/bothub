import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageColor } from '../../types';
import { messageSelectionStyles } from '../selection';

export interface MessageLinkStyledProps {
  $messageColor: MessageColor;
}

export const MessageLinkStyled = styled(Typography)<MessageLinkStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  text-decoration: underline;
  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
