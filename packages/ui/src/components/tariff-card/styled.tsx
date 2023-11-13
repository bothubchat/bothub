import { css, styled } from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import React from 'react';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { TariffCardColor, TariffCardVariant } from './types';
import { Badge } from '@/ui/components/badge';

export const TariffCardBorderWrapper = styled.div`
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  padding: 1px;
  height: 100%;
`;

export interface TariffCardContentProps {
  $variant: TariffCardVariant;
}

export const TariffCardContent = styled.div<TariffCardContentProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 16px;
  padding: 20px 18px;
  height: 100%;
  box-sizing: border-box;
  min-height: 540px;
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${theme.colors.base.black};
        `;
      case 'secondary':
        return css`
          background: ${theme.colors.grayScale.gray4};
        `;
    }
  }}
`;

export const TariffCardTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const TariffCardHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  padding-bottom: 12px;
  margin-bottom: 16px;
`;

export const TariffCardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const TariffCardBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 28px;
`;

export const TariffCardNamePrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const TariffCardName = styled(Typography).attrs({ variant: 'h3', component: 'h3' })``;

export const TariffCardGiveCaps = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-top: 8px;
`;

export const TariffCardGiveCapsText = styled(Typography).attrs({ variant: 'body-xs-regular' })``;

export const TariffCardGiveCapsBadge = styled(Badge)``;

export const TariffCardPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

export const TariffCardPriceValue = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
  font-size: 26px;
  line-height: 34px;
`;

export const TariffCardCurrency = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 14px;
  line-height: 22px;
  margin-top: 8px;
`;

export const TariffCardDetailsLink = styled.a`
  display: flex;
  justify-content: center;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.accent.primaryLight};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const TariffCardPurchaseButton = styled(Button).attrs({ fullWidth: true })`
  margin-top: 20px;
`;

export const TariffCardValidityPeriod = styled(Typography)`
  margin-top: 20px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  text-align: center;
  width: 100%;
`;

export type TariffCardStyledProps = Omit<React.ComponentProps<typeof SwiperSlide>, 'children'> & React.PropsWithChildren & {
  $color: TariffCardColor;
};

export const TariffCardStyled: React.FC<TariffCardStyledProps> = styled(SwiperSlide)<TariffCardStyledProps>`
  display: flex !important;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
  ${TariffCardBorderWrapper} {
    background: ${({ theme, $color }) => {
    switch ($color) {
      case 'blue':
        return theme.colors.accent.primary;
      case 'blue-lilac':
        return theme.colors.premiumGradient;
      default:
        return theme.colors.grayScale.gray2;
    }
  }}
  }
  ${TariffCardName} {
    background: ${({ theme, $color }) => {
    switch ($color) {
      case 'blue':
        return theme.colors.accent.primary;
      case 'blue-lilac':
        return theme.colors.premiumGradient;
      default:
        return theme.colors.base.white;
    }
  }};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    width: 100%;
    max-width: 366px;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    flex-shrink: 0;
    width: 320px !important;
    height: 100% !important;
  }
`;
