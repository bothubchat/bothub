import { styled, css } from 'styled-components';
import { MessageActionButton } from '../styled';

export interface MessageCopyActionStyledProps {
  $focus: boolean;
}

export const MessageCopyActionStyled = styled(MessageActionButton)<MessageCopyActionStyledProps>`
  ${({ theme, $focus }) => $focus && css`
    cursor: default;
    svg path {
      fill: ${theme.colors.accent.primaryLight} !important;
    }
    &:hover {
      svg path {
        fill: ${theme.colors.accent.primaryLight} !important;
      }
    }
  `}
`;
