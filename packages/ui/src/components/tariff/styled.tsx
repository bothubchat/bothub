import styled from "styled-components";
import { Typography } from "../typography";
import { Button } from "../button";
import { SwiperSlide } from 'swiper/react';
import { TariffColor } from "./types";

export const TariffBorderWrapper = styled.div`
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  padding: 1px;
  height: 100%;
`;

export const TariffContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.base.black};
  border-radius: 16px;
  padding: 20px 18px;
  height: 100%;
  box-sizing: border-box;
  min-height: 508px;
`;

export const TariffTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const TariffBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const TariffName = styled(Typography).attrs({ variant: 'h3', component: 'h3' })`
  margin: auto;
`;

export const TariffText = styled(Typography)`
  width: 100%;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
`;

export const TariffPrice = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
`;

export const TariffPriceValue = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
  font-size: 26px;
  line-height: 34px;
`;

export const TariffCurrency = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 14px;
  line-height: 22px;
  margin-top: 8px;
`;

export const TariffContentList = styled.ul`
  list-style: none;
  padding: 0px;
  width: 100%;
`;

export const TariffItem = styled.li`
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 16px 0px;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.base.white};
`;

export const TariffPurchaseButton = styled(Button).attrs({ fullWidth: true })``;

export const TariffValidityPeriod = styled(Typography)`
  margin-top: 20px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  text-align: center;
  width: 100%;
`;

export const TariffStyled = styled(SwiperSlide)<{ $color: TariffColor }>`
  display: flex !important;
  flex-direction: column;
  overflow: hidden;
  ${TariffBorderWrapper} {
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
  ${TariffName} {
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
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    flex-shrink: 0;
    width: 320px !important;
    height: 100% !important;
  }
`;