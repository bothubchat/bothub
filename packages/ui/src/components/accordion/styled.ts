import { css, keyframes, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { themeVar } from '@/ui/theme';

type IsOpenProps = {
  $isOpen: boolean;
};

export const AccordionStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
`;

export const AccordionHead = styled.div<
  IsOpenProps & {
    $isDefaultVariant: boolean;
  }
>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 18px;
  cursor: pointer;
  border: ${({ theme, $isDefaultVariant }) =>
    $isDefaultVariant &&
    `1px solid ${themeVar(theme, 'colors.grayScale.gray2')}`};
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
    background-color: ${({ theme }) =>
      themeVar(theme, 'colors.grayScale.gray4')};
    opacity: ${({ $isDefaultVariant }) =>
      !$isDefaultVariant ? '0.75' : '0.5'};
  }
`;

export const AccordionLabel = styled(Typography).attrs({
  variant: 'body-m-semibold',
})`
  position: relative;
  z-index: 1;
`;

export const AccordionArrow = styled(ArrowDownIcon).attrs<IsOpenProps>({
  size: 24,
})`
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform 0.2s ease-in-out;
`;

export const AccordionBody = styled.div<
  IsOpenProps & {
    $isDefaultVariant: boolean;
  }
>`
  display: grid;
  background-color: ${({ theme, $isDefaultVariant }) =>
    !$isDefaultVariant
      ? themeVar(theme, 'tokens.gray4Alpha75')
      : themeVar(theme, 'colors.grayScale.gray3')};

  border: ${({ theme, $isDefaultVariant }) =>
    $isDefaultVariant &&
    `1px solid ${themeVar(theme, 'colors.grayScale.gray2')}`};

  border-top: 0;
  border-radius: 0 0 20px 20px;
  transition:
    grid-template-rows 0.3s,
    padding 0.3s,
    opacity 0.3s;
  ${({ $isOpen, $isDefaultVariant }) =>
    $isOpen
      ? css`
          padding: 18px;
          ${!$isDefaultVariant ? 'padding-top: 0px;' : ''}
          grid-template-rows: 1fr;
        `
      : css`
          padding: 0 18px;
          grid-template-rows: 0fr;
          opacity: 0;
          pointer-events: none;
        `};
`;

// Keeps the content clipped while the body expands
const AccordionBodyClip = keyframes`
  from,
  to {
    overflow: hidden;
  }
`;

export const AccordionBodyContent = styled.div<IsOpenProps>`
  min-height: 0;
  ${({ $isOpen }) =>
    $isOpen
      ? css`
          animation: ${AccordionBodyClip} 0.3s;
        `
      : css`
          overflow: hidden;
        `};
`;

export const AccordionText = styled(Typography).attrs<IsOpenProps>({
  variant: 'body-m-regular',
  component: 'p',
})`
  white-space: pre-wrap;
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      opacity: 0;
      pointer-events: none;
    `};
`;
