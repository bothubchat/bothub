import { styled, css } from 'styled-components';
import { MessageAction } from '../styled';
import { themeVar } from '@/ui/theme';

export interface MessageCopyActionStyledProps {
  $focus: boolean;
}

export const MessageCopyActionStyled = styled(
  MessageAction,
)<MessageCopyActionStyledProps>`
  ${({ theme, $focus }) =>
    $focus &&
    css`
      cursor: default;
      svg path {
        fill: ${theme.mode === 'dark'
          ? themeVar(theme, 'default.colors.accent.primary')
          : themeVar(theme, 'colors.base.white')} !important;
      }
      &:hover {
        svg path {
          fill: ${themeVar(theme, 'colors.accent.primaryLight')} !important;
        }
      }
    `}
`;
