import { styled, css } from 'styled-components';
import { MessageActionsButton } from '../styled';

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
        stroke: ${theme.scheme === 'custom'
          ? theme.colors.custom.icon
          : theme.colors.accent.primaryLight};
      }
    `}
`;
