import { css, styled } from 'styled-components';
import { TypographyStyled } from '@/ui/components/typography/styled';
import { ChevronDownLineIcon } from '@/ui/icons/chevron-down-line';
import { colorToRgba } from '@/ui/utils';
import { themeVar } from '@/ui/theme';

export const ReasoningBlockStyled = styled.div<{
  $fullWidth: boolean;
}>`
  max-width: 100%;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

export const ReasoningBlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ReasoningBlockContentWrapper = styled.div<{
  $fullWidth: boolean;
  $isReasoning: boolean;
}>`
  overflow: hidden;
  --reasoning-block-animation-duration: 0.5s;
  transition: ${({ $isReasoning }) =>
    $isReasoning
      ? 'none'
      : 'height var(--reasoning-block-animation-duration) ease-in-out, padding-top var(--reasoning-block-animation-duration) ease-in-out'};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      max-width: 100%;
    `}

  & > div > div:nth-child(1) {
    padding-top: 10px;
  }

  & > div > div:nth-child(2) {
    border-left: 1px solid
      ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
    padding-left: 12px;
  }

  & ${TypographyStyled} {
    color: ${({ theme }) => themeVar(theme, 'tokens.reasoningText')};
  }

  & li {
    font-size: 0.875rem;
  }
`;

/**
 * Плашка из макета: значок, подпись и стрелка в рамке. Подпись приходит от
 * потребителя — её шрифт и цвет плашка задаёт сама
 */
export const ReasoningBlockButton = styled.button`
  all: unset;
  box-sizing: border-box;
  width: fit-content;
  max-width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
  color: ${({ theme }) => colorToRgba(theme.tokens.textDefault, 0.8)};
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  transition:
    background-color 120ms ease-out,
    color 120ms ease-out;

  & ${TypographyStyled} {
    color: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  svg {
    flex-shrink: 0;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => themeVar(theme, 'tokens.hoverOverlay')};
    color: ${({ theme }) => themeVar(theme, 'tokens.textStrong')};
  }

  &:disabled {
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => themeVar(theme, 'tokens.borderFocus')};
    outline-offset: 1px;
  }

  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    min-height: 34px;
  }
`;

export const ReasoningBlockButtonArrow = styled(ChevronDownLineIcon)<{
  $isOpen: boolean;
}>`
  transition: transform 0.2s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
