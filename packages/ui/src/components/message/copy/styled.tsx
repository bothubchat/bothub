import { styled, css } from 'styled-components';
import { MessageAction } from '../styled';

export interface MessageCopyActionStyledProps {
  $focus: boolean;
}

export const MessageCopyActionStyled = styled(MessageAction)<MessageCopyActionStyledProps>`
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
