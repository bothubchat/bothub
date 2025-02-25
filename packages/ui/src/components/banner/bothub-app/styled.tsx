import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import phones from './assets/phone.webp';

export const BothubAppBannerContainer = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    align-items: flex-end;
  }
`;

export const BothubAppBannerBackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  background: linear-gradient(
    90deg,
    #1c64f2 -0.39%,
    rgba(212, 28, 242, 0.5) 99.61%
  );
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.05) 40%,
      rgba(0, 0, 0, 0.5) 100%
    );
    transition: all 0.3s ease-in-out;
    opacity: 0;
  }
  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    background: #000000;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
      opacity: 1;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.05) 0%,
        rgba(0, 0, 0, 0.9) 90%
      );
    }
  }
`;

export const BothubAppBannerImage = styled.img.attrs({
  src: phones,
  alt: 'phones'
})`
  position: relative;
  margin-left: 33px;
  z-index: 1;
  width: 100%;
  object-fit: cover;
  height: inherit;
  user-select: none;
  transition: transform 0.3s ease-in-out;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    margin-left: 30px;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    display: none;
  }
`;

export const BothubAppBannerStyled = styled.a`
  overflow: hidden;
  display: flex;
  position: relative;
  border-radius: 24px;
  width: 100%;
  height: 222px;

  max-width: 1290px;
  &:hover {
    ${BothubAppBannerImage} {
      transform: scale(1.05);
    }
    ${BothubAppBannerBackgroundGradient} {
      $:before {
        @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
          opacity: 1;
        }
      }
      &:after {
        opacity: 1;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    height: 180px;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    height: 343px;
  }
`;

export const BothubAppBannerBackgroundImage = styled.img.attrs({
  src: phones,
  alt: 'phones'
})`
  display: none;
  position: absolute;
  width: 120%;
  scale: 1.2;
  left: -10%;
  top: -100%;
  height: 200%;
  object-fit: cover;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    display: block;
  }
`;

export const BothubAppBannerBackgroundShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const BothubAppBannerContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 34px;
  gap: 8px;
  z-index: 1;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    padding: 18px 30px 18px 24px;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: 14px;
  }
`;

export const BothubAppBannerTitle = styled(Typography).attrs({
  variant: 'banner-h3-black',
  component: 'p'
})`
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  margin: 0;
`;

export const BothubAppBannerDescription = styled(Typography).attrs({
  variant: 'body-m-medium',
  component: 'p'
})`
  margin: 0;
`;
