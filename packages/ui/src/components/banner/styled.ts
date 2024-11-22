import { adaptive } from '@/ui/adaptive';
import { css,styled } from 'styled-components';

import dashboardDesktop from './assets/dashboard/desktop.svg';
import dashboardTablet from './assets/dashboard/tablet.svg';
import dashboardMobile from './assets/dashboard/mobile.svg';
import mainDesktop from './assets/main/desktop.svg';
import mainTablet from './assets/main/tablet.svg';
import mainMobile from './assets/main/mobile.svg';
import wave from './assets/wave.svg';

interface BlackFridayBannerStyledProps {
  $variant?: 'dashboard' | 'main';
}

export const BlackFridayBannerStyled = styled.div<BlackFridayBannerStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  height: 200px;
  padding: 60px 40px;
  background: ${({ theme }) => theme.default.colors.grayScale.gray7};
  border-radius: 24px;
  width: 100%;

  overflow: hidden;
  ${({ $variant }) => {
    switch ($variant) {
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          desktop: css`
            height: 374px;
          `,
          tablet: css`
            height: 306px;
          `,
          mobile: css`
            height: 350px;
            align-items: flex-start;
            padding: 40px 34px;
          `,
        });
      case 'main':
        return adaptive({
          variant: 'main',
          tablet: css`
            height: 208px;
            padding: 28px 40px;
          `,
          mobile: css`
            gap: 10px;
            height: 250px;
            align-items: flex-start;
            padding: 32px 34px;
          `
        });
    }
  }}
`;

export const BlackFridayBannerStyledGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(16, 19, 38, 0.5) 0%, rgba(28, 100, 242, 0.5) 100%);
  width: 100%;
  height: 100%;
`;

export const BlackFridayBannerBackgroundText = styled.div<{ $variant?: 'dashboard' | 'main'}>`
  position: absolute;
  display: flex;
  white-space: pre-wrap;
  flex-direction: column;
  margin: auto;
  left: 0;
  right: 0;
  top: -35px;
  bottom: 0;
  opacity: 0.1;
  z-index: 1;
  color: ${({ theme }) => theme.default.colors.base.white};
  overflow: hidden;
  text-transform: uppercase;
  font-family: inherit;
  font-size: 200px;
  font-weight: 900;
  line-height: 145px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  ${({ $variant }) => {
    switch ($variant) {
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          desktop: css`
            top: 42px;
          `,
          tablet: css`
            top: 49px;
            font-size: 143px;
            line-height: 104px;
          `,
          mobile: css`
            display: none;
          `
        });
      case 'main':
        return adaptive({
          variant: 'main',
          tablet: css`
            top: -2px;
            font-size: 143px;
            line-height: 104px;
          `,
          mobile: css`
            display: none;
          `,
        });
    }
  }}
`;

export const BlackFridayBannerBackgroundWave = styled.img.attrs({ 
  src: wave
})<{ $variant?: 'dashboard' | 'main' }>`
  position: absolute;
  display: none;
  width: 100%;
  right: 0;
  bottom: 0;
  z-index: 1;
  ${({ $variant }) => {
    switch ($variant) {
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          mobile: css`
            height: 100%;
            display: block;
          `,
        });
      case 'main':
        return adaptive({
          variant: 'main',
          mobile: css`
            display: block;
          `,
      });
    }
  }}
`;

export const BlackFridayBannerBackground = styled.img<{
  $variant?: 'dashboard' | 'main';
}>`
  display: none;
  position: absolute;
  height: 100%;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

export const BlackFridayBannerBackgroundDashboardDesktop = styled(BlackFridayBannerBackground).attrs({
  src: dashboardDesktop
})`
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      display: block;
      right: clamp(-13.75rem, -80rem + 100vw, 0rem);
    `,
  })}
`;

export const BlackFridayBannerBackgroundDashboardTablet = styled(BlackFridayBannerBackground).attrs({
  src: dashboardTablet
})`
    ${adaptive({
    variant: 'dashboard',
    tablet: css`
      right: clamp(-18.75rem, -53.125rem + 100vw, 0rem);
      display: block;
    `,
  })}
`;

export const BlackFridayBannerBackgroundDashboardMobile = styled(BlackFridayBannerBackground).attrs({
  src: dashboardMobile
})`
  ${adaptive({
    variant: 'dashboard',
    mobile: css`
      display: block;
      top: 75px;
      right: auto;
      left: 20px;
      scale: 1.5;
    `,
  })}
`;

export const BlackFridayBannerBackgroundMainDesktop = styled(BlackFridayBannerBackground).attrs({
  src: mainDesktop
})`
  ${adaptive({
    variant: 'main',
    desktop: css`
      display: block;
      right: clamp(-13.75rem, -80rem + 100vw, 0rem);
    `,
  })}
`;

export const BlackFridayBannerBackgroundMainTablet = styled(BlackFridayBannerBackground).attrs({
  src: mainTablet
})`
    ${adaptive({
    variant: 'main',
    tablet: css`
      display: block;
      right: clamp(-18.75rem, -53.125rem + 100vw, 0rem);
    `,
  })}
`;

export const BlackFridayBannerBackgroundMainMobile = styled(BlackFridayBannerBackground).attrs({
  src: mainMobile
})`
    ${adaptive({
    variant: 'main',
    mobile: css`
      display: block;
      right: clamp(-7.813rem, -24.554rem + 71.429vw, 0rem);
    `,
  })}
`;

export const BlackFridayContainer = styled.div<{$variant?: 'dashboard' | 'main'}>`
  display: flex;
  position: relative;
  z-index: 1;
  white-space: pre-wrap;
  align-items: flex-start;
  gap: 20px;
  color: ${({ theme }) => theme.default.colors.base.white};
  ${({ $variant }) => {
    switch ($variant) {
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          merge: true,
          desktop: css`
            flex-direction: column;
          `,
          tablet: css`
            gap: 10px;
          `,
        })
      case 'main':
        return adaptive({
          variant: 'main',
          tablet: css`
            
          `,
          mobile: css`
            flex-direction: column-reverse;
            gap: 10px;
          `,
        })
    }
  }}
  `;

export const BlackFridayBannerTitle = styled.span<{$variant: 'dashboard' | 'main'}>`
  font-family: inherit;
  font-size: 44px;
  text-transform: uppercase;
  font-weight: 900;
  line-height: 40px;
  text-align: left;
  ${({ $variant }) => {
    switch ($variant) {
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          desktop: css`
            font-size: 64px;
            line-height: 60px;
          `,
        })
      case 'main':
        return null;
    }
  }}
`;

export const BlackFridayDescription = styled.div<{$variant: 'dashboard' | 'main'}>`
  font-family: inherit;
  font-size: 20px;
  ${({ $variant }) => {
    switch ($variant) {
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          desktop: css`
          `,
          tablet: css`
            font-size: 16px;
            line-height: 20px;
          `,
        })
      case 'main':
        return adaptive({
          variant: 'main',
          desktop: css`
            max-width: 245px;
          `,
          tablet: css`
            max-width: 171px;
            font-size: 16px;
            line-height: 20px;
          `,
        })
    }
  }}
  
  font-weight: 600;
  line-height: 24.2px;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`

export const BlackFridayBannerText = styled.div<{$variant: 'dashboard' | 'main'}>`
  ${({ $variant }) => {
    switch ($variant) {
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
        })
      case 'main':
        return adaptive({
          variant: 'main',
          mobile: css`
            display: none;
          `,
        })
    }
  }}
`;

export const BlackFridayBannerDate = styled.div``;

