import { styled } from 'styled-components';
import wave from './assets/wave-bg.svg';
import percent from './assets/percent.svg';
import { Typography } from '../../typography';

export const BannerMiniStyled = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
  background: ${({ theme }) => theme.default.colors.grayScale.gray7};
  padding: 16px 20px;
  border-radius: 14px;
  overflow: hidden;
  opacity: 0px;
`;

export const BannerMiniBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: linear-gradient(
    90deg,
    rgba(16, 19, 38, 0.5) 0%,
    rgba(28, 100, 242, 0.5) 100%
  );
  width: 100%;
  height: 100%;
  user-select: none;
`;

export const BannerMiniImageWave = styled.img.attrs({
  src: wave,
  alt: 'wave'
})`
  position: absolute;
  right: 0px;
  bottom: 0px;
  min-height: 100%;
  width: 100%;
  user-select: none;
`;

export const BannerMiniImagePercent = styled.img.attrs({
  src: percent,
  alt: 'percent'
})`
  position: absolute;
  right: -20px;
  bottom: 0px;
  height: 100%;
  user-select: none;
`;

export const BannerMiniContent = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  gap: 5px;
`;

export const BannerMiniTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: ${({ theme }) => theme.default.colors.base.white};
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const BannerMiniText = styled(Typography).attrs({
  variant: 'body-s-regular'
})`
  color: ${({ theme }) => theme.default.colors.base.white};
`;
