import { css, styled } from 'styled-components';
import React from 'react';
import { Typography } from '../typography';
import { ArrowDownIcon } from '@/ui/icons';

export const AccordionStyled: React.FC<
  React.ComponentProps<'div'> & { $fullWidth: boolean }
> = styled.div`
  ${({ $fullWidth }) =>
    !$fullWidth &&
    css`
      max-width: 638px;
    `}
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
  overflow: hidden;
`;

export const AccordionHead = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 18px;
  cursor: pointer;
  background-color: rgba(
    from ${({ theme }) => theme.colors.grayScale.gray4} r g b / 0.5
  );
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 20px;
  transition: 0.3s;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `};
`;

export const AccordionLabel = styled(Typography).attrs({
  variant: 'body-m-semibold'
})``;

export const AccordionArrow = styled(ArrowDownIcon).attrs<{
  $isOpen: boolean;
}>({ size: 24 })`
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform 0.2s ease-in-out;
`;

export const AccordionBody = styled.div`
  padding: 18px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-top: 0;
  border-radius: 0 0 20px 20px;
  transition: 1s;
`;

export const AccordionText = styled(Typography).attrs({
  variant: 'body-m-regular',
  component: 'p'
})`
  white-space: pre-wrap;
`;
