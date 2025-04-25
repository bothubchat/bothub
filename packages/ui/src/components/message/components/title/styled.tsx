import { styled, css } from 'styled-components';
import { MessageTitleVariant } from './types';
import { MessageVariant } from '../../types';

export interface MessageTitleStyledProps {
  $variant: MessageTitleVariant;
  $messageVariant: MessageVariant;
  $messageColor: string;
}

export const MessageTitleStyled = styled.span<MessageTitleStyledProps>`
  margin: 0px;
  line-height: 1;
  margin: 10px 0px;
  color: ${({ theme, $messageColor }) => {
    if ($messageColor !== 'default') {
      return theme.default.colors.base.white;
    }

    return theme.colors.base.white;
  }};
  ${({ $variant }) => {
    switch ($variant) {
      case 'h1':
        return css`
          font-weight: 600;
          font-style: normal;
          font-size: 32px;
          line-height: 42px;
          --bothub-typing-cursor-size: 42px;
        `;
      case 'h2':
        return css`
          font-weight: 600;
          font-style: normal;
          font-size: 28px;
          line-height: 36px;
          --bothub-typing-cursor-size: 36px;
        `;
      case 'h3':
        return css`
          font-weight: 600;
          font-size: 24px;
          font-style: normal;
          line-height: 32px;
          --bothub-typing-cursor-size: 32px;
        `;
      case 'h4':
        return css`
          font-weight: 600;
          font-size: 20px;
          font-style: normal;
          line-height: 26px;
          --bothub-typing-cursor-size: 26px;
        `;
      case 'h5':
        return css`
          font-weight: 600;
          font-size: 18px;
          font-style: normal;
          line-height: 24px;
          --bothub-typing-cursor-size: 24px;
        `;
      case 'h6':
        return css`
          font-weight: 600;
          font-size: 16px;
          font-style: normal;
          line-height: 22px;
          --bothub-typing-cursor-size: 22px;
        `;
    }
  }}
  &::selection {
    ${({ $messageColor }) => {
      switch ($messageColor) {
        case 'default':
          return css`
            background: ${({ theme }) =>
              theme.mode === 'light'
                ? theme.default.colors.accent.primary
                : theme.colors.base.white};
            color: ${({ theme }) =>
              theme.mode === 'light'
                ? theme.default.colors.base.white
                : theme.colors.accent.primary};
          `;
        case 'green':
          return css`
            background: ${({ theme }) => theme.default.colors.base.white};
            color: ${({ theme }) => theme.colors.gpt3};
          `;
        case 'purple':
          return css`
            background: ${({ theme }) => theme.default.colors.base.white};
            color: ${({ theme }) => theme.colors.gpt4};
          `;
        default:
          return css`
            background: ${({ theme }) => theme.default.colors.base.white};
            color: ${$messageColor};
          `;
      }
    }}
  }
`;
