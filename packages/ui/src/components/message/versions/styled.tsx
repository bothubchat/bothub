import { styled } from 'styled-components';
import { Typography } from '../../typography';

export const MessageVersionsStyled = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
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
  padding-inline: 4px;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  &:active {
    color: #4785ff;
  }
  cursor: pointer;
`;
