import React from 'react';
import {
  BannerMiniStyled,
  BannerMiniImageWave,
  BannerMiniImagePercent,
  BannerMiniContent,
  BannerMiniTitle,
  BannerMiniText,
  BannerMiniBackground
} from './styled';

interface BannerMiniBlackFridayProps {
  title: string;
  text: string;
}
export const BannerMiniBlackFriday: React.FC<BannerMiniBlackFridayProps> = ({ title, text }) => (
  <BannerMiniStyled>
    <BannerMiniBackground />
    <BannerMiniImageWave />
    <BannerMiniImagePercent />
    <BannerMiniContent>
      <BannerMiniTitle>{title}</BannerMiniTitle>
      <BannerMiniText>{text}</BannerMiniText>
    </BannerMiniContent>
  </BannerMiniStyled>
);
