import { styled } from "styled-components";
import { Swiper } from "swiper/react";

export const TariffListStyled = styled.div``;

export const TariffDesktopList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  justify-items: center;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    display: none;
  }
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
