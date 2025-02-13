import { css, styled } from 'styled-components';
import { TypographyStyled } from '@/ui/components/typography/styled';
import { defaultTheme } from '@/ui/theme';
import { ArrowUpIcon } from '@/ui/icons';

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
}>`
  overflow: hidden;
  --reasoning-block-animation-duration: 0.5s;
  transition:
    height var(--reasoning-block-animation-duration) ease-in-out,
    padding-top var(--reasoning-block-animation-duration) ease-in-out;

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
    border-left: 1px solid ${({ theme }) => theme.colors.grayScale.gray1};
    padding-left: 10px;
  }

  & ${TypographyStyled} {
    color: ${({ theme }) =>
      theme.mode === 'dark' ? '#CDD5DA' : defaultTheme.colors.grayScale.gray1};
  }
`;

export const ReasoningBlockButton = styled.button`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 15px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  cursor: pointer;
  outline: none;
  transition:
    background-color 0.3s ease-out,
    border-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray5};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    cursor: default;
    background-color: ${({ theme }) => theme.colors.grayScale.gray3};
  }

  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const ReasoningBlockButtonArrow = styled(ArrowUpIcon)<{
  $isOpen: boolean;
}>`
  transition: transform 0.2s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};

  & path {
    stroke: ${({ theme }) => theme.colors.base.white};
  }
`;
