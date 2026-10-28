import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { messageSelectionStyles } from '../selection';
import { themeVar } from '@/ui/theme';

export interface MessageBoldStyledProps {
  $messageColor: string;
}

export const MessageBoldStyled = styled(Typography)<MessageBoldStyledProps>`
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return themeVar(theme, 'colors.base.white');
    }
    return themeVar(theme, 'colors.base.white');
  }};
  font-weight: 700;
  &::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor)}
  }
`;
