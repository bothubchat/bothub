import { animated } from '@react-spring/web';
import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageVariant } from '../types';

export const MessageActionsStyled = styled.div<{ $variant?: MessageVariant }>`
  display: flex;
  flex-direction: ${({ $variant }) =>
    $variant === 'assistant' ? 'row' : 'row-reverse'};
  align-items: flex-start;
  justify-content: center;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  @media (width <= ${({ theme }) => theme.mobile.maxWidth}) {
    gap: 8px;
  }
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
  ${({ $invertedY }) =>
    !$invertedY
      ? css`
          top: 36px;
        `
      : css`
          bottom: 36px;
        `}
  ${({ $variant, $invertedX }) => getModalStylesX($variant, $invertedX)}
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  z-index: 10;
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

export const MessageActionsButton = styled.button`
  all: unset;
  width: fit-content;
  height: fit-content;
  padding-inline: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    svg {
      path,
      circle {
        fill: ${({ theme }) =>
          theme.mode === 'dark'
            ? theme.colors.grayScale.gray6
            : theme.colors.grayScale.gray2};
        transition: all 100ms ease-out;
      }
    }
  }
  &:active {
    svg {
      path,
      circle {
        fill: #4785ff;
        transition: all 100ms ease-out;
      }
    }
    transform: translateY(1px);
  }
  transition: all 50ms ease-out;
`;

export const MessageEditButtonsStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const MessageActionsMenuModalOptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MessageActionsButtonText = styled(Typography).attrs({
  variant: 'body-m-regular'
})``;
