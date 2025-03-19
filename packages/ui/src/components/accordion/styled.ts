import { css, styled } from 'styled-components';
import { ComponentProps } from 'react';
import { Typography } from '../typography';
import { ArrowDownIcon } from '@/ui/icons';

export const AccordionStyled = styled.div<
  ComponentProps<'div'> & { $fullWidth: boolean }
>`
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
  position: relative;
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
  transition:
    border-bottom 0.3s,
    border-radius 0.3s;
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

export const AccordionBody = styled.div<{ $isOpen: boolean }>`
  padding: 18px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-top: 0;
  border-radius: 0 0 20px 20px;
  transition:
    opacity 0.3s,
    position 0.3s;
  ${({ $isOpen }) =>
    $isOpen
      ? css`
          position: relative;
        `
      : css`
          opacity: 0;
          pointer-events: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
        `};
`;

export const AccordionText = styled(Typography).attrs({
  variant: 'body-m-regular',
  component: 'p'
})`
  white-space: pre-wrap;
`;
