import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { Typography } from '../../typography';
import { MessageVariant } from '../types';

export const MessageActionsStyled = styled.div<{ $variant?: MessageVariant }>`
  margin-top: auto;
  display: flex;
  flex-direction: ${({ $variant }) =>
    $variant === 'assistant' ? 'row' : 'row-reverse'};
`;

export const MessageActionsMenuStyled = styled.div`
  position: relative;
  display: flex;
`;

export const MessageActionsMenuModal = styled(motion.div)<{
  $variant?: MessageVariant;
}>`
  position: absolute;
  top: 30px;
  ${({ $variant }) =>
    $variant === 'assistant'
      ? css`
          left: 14px;
        `
      : css`
          right: 14px;
        `}
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
`;

export const MessageActionsMenuModalOption = styled(motion.button)`
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
  cursor: pointer;
`;

export const MessageActionsButton = styled(motion.button)`
  all: unset;
  width: fit-content;
  height: fit-content;
  padding-inline: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const MessageActionsMenuModalOptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MessageActionsButtonText = styled(Typography).attrs({
  variant: 'body-m-regular',
})``;

export const MessageActionsButtonIconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
`;

export const MessageActionsButtonWithTooltip = styled.div``;
