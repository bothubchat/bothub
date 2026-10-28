import { styled, css } from 'styled-components';
import { MessageActionsButton } from '../styled';
import { themeVar } from '@/ui/theme';

export interface MessageForkButtonStyledProps {
  $selected?: boolean;
}

export const MessageForkButtonStyled = styled(
  MessageActionsButton,
)<MessageForkButtonStyledProps>`
  ${({ theme, $selected }) =>
    $selected &&
    css`
      svg path {
        stroke: ${themeVar(theme, 'tokens.messageActionIcon')};
      }
    `}
`;
