import { styled } from 'styled-components';
import { TypographyStyled } from '../../typography/styled';
import { defaultTheme } from '@/ui/theme';

export const ReasoningBlockContentWrapper = styled.div`
  overflow: hidden;
  transition:
    height 0.5s ease-in-out,
    padding-top 0.5s ease-in-out;

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

export const ReasoningBlockButton = styled.button<{
  $isOpen: boolean;
}>`
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
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

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
    background-color: ${({ theme }) => theme.colors.grayScale.gray6};
  }

  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.colors.base.white};
  }

  & > *:last-child {
    transition: transform 0.2s ease-in-out;
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(0deg)' : 'rotate(180deg)'};
    & path {
      stroke: ${({ theme }) => theme.colors.base.white};
    }
  }
`;
