import { styled } from 'styled-components';
import { Typography } from '../../typography';
import { MessageVariant } from '../types';

export const MessageVersionsStyled = styled.div<{
  $variant?: MessageVariant;
}>`
  display: flex;
  align-items: center;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  ${({ $variant }) => ($variant === 'assistant' ? 'margin-left: auto;' : '')}
`;

export const MessageVersionsPagination = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

export const MessageVersionsText = styled(Typography).attrs({
  variant: 'body-m-medium',
})`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export const MessageVersionsSwitchButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline: 4px;
  padding: 4px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  }
  &:active {
    transform: translateY(1px);
    color: #4785ff;
  }
  transition: all 50ms ease-out;
  cursor: pointer;
`;
