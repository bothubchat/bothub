import { css, styled } from 'styled-components';
import { Swiper } from 'swiper/react';
import { TariffsVariant } from './types';
import { adaptive } from '@/ui/adaptive';

export const TariffsStyled = styled.div`
  overflow: hidden;
  width: 100%;
`;

export interface TariffDesktopListProps {
  $variant: TariffsVariant;
}

export const TariffDesktopList = styled.div<TariffDesktopListProps>`
  display: grid;
  ${adaptive(({ $variant }) => ({
    variant: $variant === 'default' ? 'main' : 'dashboard',
    desktop: css`
      grid-template-columns: repeat(4, 300px);
      gap: 30px;
    `,
    mobile: css`
      display: none;
    `
  }))}
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'default':
        return css`
          justify-content: center;
          @media (max-width: ${theme.dashboard.tablet.maxWidth}) {
            grid-template-columns: repeat(2, auto);
            gap: 24px;
          }
        `;
      case 'settings':
        return css`
          justify-content: flex-start;
          @media (max-width: 1250px) {
            grid-template-columns: repeat(2, auto);
            gap: 24px;
          }
        `;
    }
  }}
`;

export const TariffSlider = styled.div`
  @media not (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    display: none !important;
  }
`;

export const TariffSliderContent = styled.div`
  position: relative;
`;

export const TariffSliderShadows = styled.div`
  pointer-events: none;
`;

export interface TariffSliderShadowProps {
  $variant: TariffsVariant;
  $hidden: boolean;
}

export const TariffSliderShadow = styled.div<TariffSliderShadowProps>`
  display: flex;
  position: absolute;
  top: 0px;
  bottom: 0px;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  width: 120px;
  background: red;
  z-index: 2;
  @media (max-width: 500px) {
    width: 60px;
  }
`;

export const TariffSliderLeftShadow = styled(TariffSliderShadow)`
  left: 0px;
  ${({ theme, $variant }) => {
    let color: string;
    switch ($variant) {
      case 'default':
        color = theme.colors.base.black;
        break;
      case 'settings':
        color = theme.colors.grayScale.gray4;
        break;
    }

    return css`
      background: linear-gradient(to right, ${color}, rgba(0, 0, 0, 0));
    `;
  }}
`;

export const TariffSliderRightShadow = styled(TariffSliderShadow)`
  right: 0px;
  ${({ theme, $variant }) => {
    let color: string;
    switch ($variant) {
      case 'default':
        color = theme.colors.base.black;
        break;
      case 'settings':
        color = theme.colors.grayScale.gray4;
        break;
    }

    return css`
      background: linear-gradient(to left, ${color}, rgba(0, 0, 0, 0));
    `;
  }}
`;

export const TariffSlideList = styled(Swiper)`
  overflow: visible !important;
`;

TariffSlideList.displayName = 'SwiperSlider';

export const TariffSliderActions = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 30px;
`;
