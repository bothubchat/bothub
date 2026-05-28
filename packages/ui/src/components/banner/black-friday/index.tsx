import React from 'react';
import {
  BlackFridayBannerStyled,
  BlackFridayBannerBackgroundText,
  BlackFridayContainer,
  BlackFridayDescription,
  BlackFridayBannerTitle,
  BlackFridayBannerText,
  BlackFridayBannerBackgroundDashboardDesktop,
  BlackFridayBannerBackgroundDashboardTablet,
  BlackFridayBannerBackgroundDashboardMobile,
  BlackFridayBannerBackgroundMainDesktop,
  BlackFridayBannerBackgroundMainMobile,
  BlackFridayBannerBackgroundMainTablet,
  BlackFridayBannerBackgroundWave,
  BlackFridayBannerStyledGradient,
} from './styled';
import { BlackFridayBannerProps } from './types';

export const BlackFridayBanner: React.FC<BlackFridayBannerProps> = ({
  $variant = 'dashboard',
  backgroundText,
  title,
  text,
}) => {
  const images = {
    dashboard: [
      <BlackFridayBannerBackgroundDashboardDesktop />,
      <BlackFridayBannerBackgroundDashboardTablet />,
      <BlackFridayBannerBackgroundDashboardMobile />,
    ],
    main: [
      <BlackFridayBannerBackgroundMainDesktop />,
      <BlackFridayBannerBackgroundMainTablet />,
      <BlackFridayBannerBackgroundMainMobile />,
    ],
  };

  return (
    <BlackFridayBannerStyled $variant={$variant}>
      <BlackFridayBannerStyledGradient />
      <BlackFridayBannerBackgroundText $variant={$variant}>
        {backgroundText}
      </BlackFridayBannerBackgroundText>
      <BlackFridayBannerBackgroundWave $variant={$variant} />
      {images[$variant]}
      <BlackFridayContainer $variant={$variant}>
        <BlackFridayBannerTitle $variant={$variant}>
          {title}
        </BlackFridayBannerTitle>
        <BlackFridayDescription $variant={$variant}>
          <BlackFridayBannerText $variant={$variant}>
            {text}
          </BlackFridayBannerText>
        </BlackFridayDescription>
      </BlackFridayContainer>
    </BlackFridayBannerStyled>
  );
};

export * from './mini';
