import { css, styled } from 'styled-components';
import { Typography } from '../typography';
import { ArrowDownIcon } from '@/ui/icons';

export const AccordionStyled = styled.div`
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
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 20px;
  transition:
    border-bottom 0.3s,
    border-radius 0.3s;
  position: relative;
  overflow: hidden;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `};

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.grayScale.gray4};
    opacity: 0.5;
  }
`;

export const AccordionLabel = styled(Typography).attrs({
  variant: 'body-m-semibold'
})`
  position: relative;
  z-index: 1;
`;

export const AccordionArrow = styled(ArrowDownIcon).attrs<{
  $isOpen: boolean;
}>({ size: 24 })`
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform 0.2s ease-in-out;
`;

export const AccordionBody = styled.div<{ $isOpen: boolean }>`
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-top: 0;
  border-radius: 0 0 20px 20px;
  transition:
    max-height 0.3s,
    padding 0.3s,
    opacity 0.3s;
  ${({ $isOpen }) =>
    $isOpen
      ? css`
          padding: 18px;
          max-height: auto;
        `
      : css`
          padding: 0 18px;
          max-height: 0px;
          opacity: 0;
          pointer-events: none;
        `};
`;

export const AccordionText = styled(Typography).attrs({
  variant: 'body-m-regular',
  component: 'p'
})`
  white-space: pre-wrap;
`;
