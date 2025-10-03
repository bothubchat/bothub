import { styled, css } from 'styled-components';
import { ScrollbarStyle } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';
import { MessageMultilineCodeContentProps } from './types';

export const MessageMultilineCodeContentContainer = styled.div`
  background-color: #002635;
`;

export const contentStyles = css<MessageMultilineCodeContentProps>`
  ${ScrollbarStyle}
  overflow-x: auto;
  line-height: 1.3;
  padding: 1em;
  display: block;
  span {
    line-height: 1.3;
  }
  &::selection,
  *::selection {
    ${({ $messageColor }) => {
      switch ($messageColor) {
        case 'default':
          return css`
            background: ${({ theme }) =>
              theme.mode === 'light'
                ? theme.default.colors.accent.primary
                : theme.colors.base.white} !important;
            color: ${({ theme }) =>
              theme.mode === 'light'
                ? theme.default.colors.base.white
                : theme.colors.accent.primary} !important;
          `;
        case 'green':
          return css`
            background: ${({ theme }) =>
              theme.default.colors.base.white} !important;
            color: ${({ theme }) => theme.colors.gpt3} !important;
          `;
        case 'purple':
          return css`
            background: ${({ theme }) =>
              theme.default.colors.base.white} !important;
            color: ${({ theme }) => theme.colors.gpt4} !important;
          `;
        default:
          return css`
            background: ${({ theme }) =>
              theme.default.colors.base.white} !important;
            color: ${$messageColor} !important;
          `;
      }
    }}
  }
  ${adaptive({
    variant: 'dashboard',
    miniTablet: css`
      font-size: 14px !important;
      span {
        font-size: 14px !important;
      }
    `,
    mobile: css`
      font-size: 12px !important;
      span {
        font-size: 12px !important;
      }
    `,
    touch: css`
      &::-webkit-scrollbar {
        display: none;
      }
    `,
  })}
`;

export const MessageMultilineCodeContentStyled = styled.code<MessageMultilineCodeContentProps>`
  ${contentStyles}
  background-color: #002635;
  color: #fff;
`;

export const MessageMultilineCodeLastLine = styled.div``;
