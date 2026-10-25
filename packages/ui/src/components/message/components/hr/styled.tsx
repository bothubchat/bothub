import { styled } from 'styled-components';
import { MessageColor } from '../../types';

export interface MessageHrStyledProps {
  $messageColor: MessageColor;
}

export const MessageHrStyled = styled.hr<MessageHrStyledProps>`
  width: 100%;
  margin: 14px 0;
  border: none;
  border-top: 1px solid
    ${({ theme, $messageColor }) => {
      if ($messageColor !== 'default') {
        return theme.default.colors.base.white;
      }

      return theme.tokens.divider;
    }};
  opacity: 0.5;
`;
