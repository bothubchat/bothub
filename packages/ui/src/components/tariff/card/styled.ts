import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Badge } from '@/ui/components/badge';
import { TariffType } from './types';
import { colorToRgba } from '@/ui/utils';
import { Button } from '@/ui/components/button';
import { ArrowNarrowRightIcon, StarUnfilledIcon } from '@/ui/icons';

export const TariffCardIsPopular = styled.div<{
  $active?: boolean;
  $variant: TariffType | 'ENTERPRISE';
}>`
  display: flex;
  flex-direction: column;
  grid-area: ${({ $variant }) => $variant};
  height: 100%;
  ${({ $active }) =>
    $active &&
    css`
      background: ${({ theme }) => theme.colors.gradient.premium};
      padding: 2px 3px;
      border-radius: 21px;
      @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
        border-radius: 19px;
      }
      @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
        border-radius: 15px;
      }
    `}
`;

export const TariffCardIsPopularContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  padding-bottom: 6px;
  gap: 8px;
`;
export const TariffCardStarUnfilledIcon = styled(StarUnfilledIcon)`
  path {
    fill: #fff;
  }
`;

export const TariffCardIsPopularText = styled(Typography).attrs({
  variant: 'body-s-medium',
  component: 'p'
})`
  color: ${({ theme }) => theme.default.colors.base.white};
  text-align: center;
`;

export const TariffCardBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grayScale.gray4};
  border-radius: 20px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    border-radius: 18px;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    border-radius: 14px;
  }
`;

export const TariffCardStyled = styled.div<{
  $variant: TariffType | 'ENTERPRISE';
  $active?: boolean;
}>`
  position: relative;
  z-index: 2;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.grayScale.gray7};
  height: 100%;
  cursor: ${({ $variant }) =>
    $variant !== 'ENTERPRISE' ? 'pointer' : 'default'};
  padding: 20px 34px;
  transition: background 0.3s ease;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    padding: 20px;
    border-radius: 18px;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: 20px 14px;
    border-radius: 14px;
  }
  &:hover {
    ${({ theme, $variant, $active }) =>
      $variant !== 'ENTERPRISE' &&
      !$active &&
      `background: ${colorToRgba(theme.colors.accent.primary, 0.2)}`};
  }
  ${({ theme, $active }) =>
    $active &&
    css`
      background: ${theme.colors.gradient.elite20};
      pointer-events: none;
    `}
`;

export const TariffCardStyledContent = styled.div<{
  $variant: TariffType | 'ENTERPRISE';
}>`
  display: grid;
  grid-template-columns: ${({ $variant }) =>
    $variant === 'ENTERPRISE' ? '1fr auto' : 'auto 1fr auto'};
  align-items: center;
  gap: 14px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    gap: 10px;
  }
`;

export const TariffCardContainer = styled.div``;

export const TariffCardContainerPrice = styled.div`
  white-space: nowrap;
`;

export const TariffCardPrice = styled(Typography).attrs({
  variant: 'body-xxl-semibold',
  component: 'span'
})``;

export const TariffCardCurrency = styled(Typography).attrs({
  variant: 'body-l-semibold',
  component: 'span'
})``;

export const TariffCardLabel = styled(Typography).attrs({
  variant: 'body-xl-semibold',
  component: 'h3'
})<{ $color: TariffType | 'ENTERPRISE' }>`
  background-clip: text;
  -webkit-background-clip: text;
  width: fit-content;
  -webkit-text-fill-color: transparent;
  background-image: ${({ theme, $color }) => {
    switch ($color) {
      case 'BASIC':
        return theme.colors.accent.primary;
      case 'PREMIUM':
        return theme.colors.gradient.premium;
      case 'DELUXE':
        return theme.colors.gradient.deluxe;
      case 'ELITE':
        return theme.colors.gradient.elite;
      case 'ENTERPRISE':
        return theme.colors.gradient.enterprise;
      default:
        return theme.colors.base.white;
    }
  }};
  background-color: ${({ theme, $color }) => {
    switch ($color) {
      case 'BASIC':
        return theme.colors.accent.primary;
      case 'PREMIUM':
        return theme.colors.gradient.premium;
      case 'DELUXE':
        return theme.colors.gradient.deluxe;
      case 'ELITE':
        return theme.colors.gradient.elite;
      case 'ENTERPRISE':
        return theme.colors.gradient.enterprise;
      default:
        return theme.colors.base.white;
    }
  }};
`;

export const TariffCardCapsText = styled(Typography).attrs({
  variant: 'body-s-medium'
})``;

export const TariffCardCapsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 26px;
`;

export const TariffCardCapsBadge = styled(Badge)``;

export const TariffCardDescription = styled(Typography).attrs({
  variant: 'body-m-medium',
  component: 'p'
})`
  margin-top: 16px;
`;

export const TariffCardEnterpriseButtonContainer = styled.div`
  height: 100%;
`;

export const TariffCardEnterpriseButton = styled(Button).attrs({
  component: 'a',
  variant: 'primary-transparent'
})`
  opacity: 1;
  pointer-events: all;
  background: ${({ theme }) => theme.colors.gradient.enterprise};
  margin-left: auto;
`;

export const TariffCardArrow = styled(ArrowNarrowRightIcon)`
  rotate: -45deg;
`;

export const TariffCardDiscount = styled(Typography).attrs({
  variant: 'body-s-medium',
  component: 'p'
})`
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 2px 16px;
  color: ${({ theme }) => theme.default.colors.base.white};
  border-radius: 0px 14px 0px 14px;
  background: ${({ theme }) => theme.colors.gradient.elite};
`;
