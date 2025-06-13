import {
  BothubAppBannerBackgroundGradient,
  BothubAppBannerBackgroundImage,
  BothubAppBannerBackgroundShadow,
  BothubAppBannerContainer,
  BothubAppBannerContent,
  BothubAppBannerDescription,
  BothubAppBannerImage,
  BothubAppBannerStyled,
  BothubAppBannerTitle
} from './styled';

interface BothubAppBannerProps {
  title: string;
  description: string;
  href: string;
}

export const BothubAppBanner: React.FC<BothubAppBannerProps> = ({
  title,
  description,
  href
}) => (
  <BothubAppBannerStyled href={href}>
    <BothubAppBannerBackgroundGradient />
    <BothubAppBannerBackgroundShadow />
    <BothubAppBannerBackgroundImage />
    <BothubAppBannerContainer>
      <BothubAppBannerImage />
      <BothubAppBannerContent>
        <BothubAppBannerTitle>{title}</BothubAppBannerTitle>
        <BothubAppBannerDescription>{description}</BothubAppBannerDescription>
      </BothubAppBannerContent>
    </BothubAppBannerContainer>
  </BothubAppBannerStyled>
);

export * from './mini';
