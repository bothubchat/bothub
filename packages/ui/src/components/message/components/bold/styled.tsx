import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { messageSelectionStyles } from '../selection';

export interface MessageBoldStyledProps {
  $messageColor: string;
}

export const MessageBoldStyled = styled(Typography)<MessageBoldStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.colors.base.white;
    }
    return theme.colors.base.white;
  }};
  font-weight: 700;
  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
