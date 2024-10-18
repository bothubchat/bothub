import { animated } from '@react-spring/web';
import styled, { css } from 'styled-components';
import { Typography } from '../../typography';
import { MessageVariant } from '../types';

export const MessageActionsStyled = styled.div<{ $variant?: MessageVariant }>`
  margin-top: auto;
  display: flex;
  flex-direction: ${({ $variant }) => ($variant === 'assistant' ? 'row' : 'row-reverse')};
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const MessageActionsMenuStyled = styled.div`
  position: relative;
  display: flex;
`;

const getModalStylesX = (variant?: MessageVariant, inverted?: boolean) => {
  switch (variant) {
    case 'assistant':
      if (!inverted) {
        return css`
          left: 14px;
        `;
      }
      return css`
        right: 14px;
      `;
    case 'user':
      if (!inverted) {
        return css`
          right: 14px;
        `;
      }
      return css`
        left: 14px;
      `;
    default:
      return css``;
  }
};

export const MessageActionsMenuModal = styled(animated.div)<{
  $variant?: MessageVariant;
  $invertedX?: boolean;
  $invertedY?: boolean;
}>`
  position: absolute;
  ${({ $invertedY }) => (!$invertedY
    ? css`
          top: 36px;
        `
    : css`
          bottom: 36px;
        `)}
  ${({ $variant, $invertedX }) => getModalStylesX($variant, $invertedX)}
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  z-index: 100;
`;

export const MessageActionsMenuModalOption = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray2};
  }
  &:active {
    filter: brightness(0.8);
    transform: translateY(1px);
  }
  cursor: pointer;
`;

export const MessageActionsButton = styled(animated.button)`
  all: unset;
  width: fit-content;
  height: fit-content;
  padding-inline: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    filter: brightness(1.2)
  }
  &:active {
    filter: brightness(0.8);
    transform: translateY(1px);
  }
  transition: all 100ms ease-out;
`;

export const MessageActionsMenuModalOptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MessageActionsButtonText = styled(Typography).attrs({
  variant: 'body-m-regular',
})``;

export const MessageActionsButtonWithTooltip = styled.div``;
