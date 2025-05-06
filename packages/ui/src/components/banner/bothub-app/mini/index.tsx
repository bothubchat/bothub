import {
  BothubAppBannerMiniBadge,
  BothubAppBannerMiniTitle,
  BothubAppBannerMiniText,
  BothubAppBannerMiniStyled
} from './styled';

interface BothubAppBannerMiniProps {
  title: string;
  text: string;
  href: string;
}

export const BothubAppBannerMini: React.FC<BothubAppBannerMiniProps> = ({
  title,
  href,
  text
}) => (
  <BothubAppBannerMiniStyled href={href}>
    <BothubAppBannerMiniTitle>
      <BothubAppBannerMiniBadge />
      {title}
    </BothubAppBannerMiniTitle>
    <BothubAppBannerMiniText>{text}</BothubAppBannerMiniText>
  </BothubAppBannerMiniStyled>
);
