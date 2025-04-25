import { css, styled } from 'styled-components';

export interface MessageListStyledProps {
  $start?: number;
}

export const MessageListStyled = styled.ul<MessageListStyledProps>`
  counter-reset: item;
  ${({ $start }) =>
    $start &&
    css`
      counter-set: item ${$start - 1};
    `};
  list-style: none;
  padding: 0px;
  margin: 0px;
  margin-top: 10px;
`;
