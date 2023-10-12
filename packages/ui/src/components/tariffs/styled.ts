import { css, styled } from 'styled-components';
import { Swiper } from 'swiper/react';
import { TariffsVariant } from './types';

export const TariffsStyled = styled.div`
  overflow: hidden;
  width: 100%;
`;

export interface TariffDesktopListProps {
  $variant: TariffsVariant;
}

export const TariffDesktopList = styled.div<TariffDesktopListProps>`
  display: grid;
  grid-template-columns: repeat(4, 300px);
  gap: 30px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    grid-template-columns: repeat(2, auto);
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    display: none;
  }
  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
        return css`
          justify-content: center;
        `;
      case 'settings':
        return css``;
    }
  }}
`;

export const TariffSlider = styled.div`
  @media not (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    display: none !important;
  }
`;

export const TariffSliderList = styled(Swiper)`
  overflow: visible !important;
`;

TariffSliderList.displayName = 'SwiperSlider';

export const TariffSliderActions = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 30px;
`;
