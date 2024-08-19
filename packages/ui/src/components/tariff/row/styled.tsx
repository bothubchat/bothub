import styled, { css } from "styled-components";
import { Typography } from '@/ui/components/typography';
import { Badge } from '@/ui/components/badge';
import { Radio } from "@/ui/components/radio";
import { CheckCircleIcon } from "@/ui/icons/check-circle";
import { TariffCardVariant, TariffCardColor } from './types';
export interface TariffCardProps {
  $color?: TariffCardColor;
  selected?: boolean;
  $variant?: TariffCardVariant;
}

export const TariffCardStyled = styled.div<TariffCardProps>`
  position: relative;
  display: flex;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  padding: 16px 34px;
  box-sizing: border-box;
  opacity: 0.9;
  background: ${({ theme }) => theme.colors.grayScale.gray7};
  border-radius: 14px;
  & > input:[type="radio"]:checked ~ & {
    outline: 1px solid ${({ theme }) => theme.default.colors.accent.primary};
  }
  ${({ selected, theme }) => (
    selected && theme.mode === 'light' && css`
    outline: 1px solid ${theme.default.colors.accent.primary};
    background-color: ${theme.colors.grayScale.gray3};
    `
  )}
  ${({ selected, theme }) => (
    selected && theme.mode === 'dark' && css`
    outline: 1px solid ${theme.default.colors.accent.primary};
    background-color: ${theme.colors.grayScale.gray3};
    `
  )}
  ${({theme}) => (
    theme.mode === 'dark' && css`
      &:after {
      display: block;
      content: '';
      position: absolute;
      width: 1070px;
      height: 216.23px;
      gap: 0px;
      left: -240px;
      top: -200px;
      filter: blur(50px);
      transform: rotate(-4.41deg);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      background: linear-gradient(90.98deg, #2244F4 7.53%, rgba(252, 94, 255, 0.4) 72.48%);
      border-radius: 50%;
      z-index: -1;
    }`
  )};

  @media (max-width: 550px) {
    padding: 14px;
  }
`

export const TariffCardStyledContent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 34px;
    @media (max-width: 1060px) {
    gap: 32px;
  }
  @media (max-width: 550px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`

export const TarrifCardStyledLeft = styled.div`
  position: relative;
  min-width: 241px;
  display: flex;
  align-items: center;
  gap: 14px;
  @media (max-width: 1060px) {
    min-width: 200px;
  }
`

export const TariffCardStyledName: React.FC<{$color: TariffCardColor, children?: React.ReactNode}> = styled(Typography).attrs({ variant: 'body-xl-semibold', component: 'h3' })<{$color: TariffCardColor}>`
  background-clip: text;
  -webkit-background-clip: text;
  width: fit-content;
  -webkit-text-fill-color: transparent;
  background-image: ${({ theme, $color }) => {
    switch ($color) {
      case 'blue':
        return theme.colors.accent.primary;
      case 'blue-lilac':
        return theme.colors.premiumGradient;
      default:
        return theme.colors.base.white;
    }
  }};
  background-color: ${({ theme, $color }) => {
    switch ($color) {
      case 'blue':
        return theme.colors.accent.primary;
      case 'blue-lilac':
        return theme.colors.premiumGradient;
      default:
        return theme.colors.base.white;
    }
  }};
`;

export const TariffCardStyledMiddle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const TariffCardStyledDescription = styled(Typography).attrs({ variant: 'body-s-medium' })`
  width: 100%;
  max-width: 518px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3; 
  -webkit-box-orient: vertical;
`;

export const TarrifCardStyledRight = styled.div`
  white-space: nowrap;
  @media (max-width: 550px) {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const TariffCardStyledPrice = styled(Typography).attrs({ variant: 'body-xxl-semibold' })``;

export const TariffCardStyledCurrency = styled(Typography).attrs({ variant: 'body-l-medium' })``;

export const TarrifCardStyledRadio = styled(Radio)``;

export const TariffCardStyledGiveCaps = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TariffCardGiveCapsBadge = styled(Badge).attrs({ variant: 'info' })`
  ${({ theme }) => `
    background-color: ${theme.default.colors.grayScale.gray2};
    color: ${theme.default.colors.base.white};
  `}
`;

export const TariffCardGiveCapsBadgeText = styled(Typography).attrs({ variant: 'body-s-regular' })`
  white-space: nowrap;
  ${({ theme }) => `
    color: ${theme.default.colors.base.white};
  `}
`;

export const TariffCardStyledDescriptionIcon = styled(CheckCircleIcon).attrs({ size: 18 })`
  @media (max-width: 550px) {
    display: none;
  }
`;
export const TariffCardGiveCapsText = styled(Typography).attrs({ variant: 'body-xs-regular' })`
  white-space: nowrap;
`