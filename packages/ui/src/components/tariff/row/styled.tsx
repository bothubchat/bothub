import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Badge } from '@/ui/components/badge';
import { Radio } from '@/ui/components/radio';
import { CheckCircleIcon } from '@/ui/icons/check-circle';
import { TariffCardColor } from './types';
import basicBg from '../assets/basic/basic-bg.svg';
import basicPercent from '../assets/basic/basic-percent.svg';
import basicPercentMobile from '../assets/basic/basic-percent-mobile.svg';
import basicDiscount from '../assets/basic/basic-discount.svg';
import premiumBg from '../assets/premium/premium-bg.svg';
import premiumPercent from '../assets/premium/premium-percent.svg';
import premiumPercentMobile from '../assets/premium/premium-percent-mobile.svg';
import premiumDiscount from '../assets/premium/premium-discount.svg';
import deluxeBg from '../assets/deluxe/deluxe-bg.svg';
import deluxePercent from '../assets/deluxe/deluxe-percent.svg';
import deluxePercentMobile from '../assets/deluxe/deluxe-percent-mobile.svg';
import deluxeDiscount from '../assets/deluxe/deluxe-discount.svg';
import eliteBg from '../assets/elite/elite-bg.svg';
import elitePercent from '../assets/elite/elite-percent.svg';
import elitePercentMobile from '../assets/elite/elite-percent-mobile.svg';
import eliteDiscount from '../assets/elite/elite-discount.svg';
import { adaptive } from '@/ui/adaptive';

export type Variant = 'main' | 'dashboard';

export interface TariffCardProps {
  $color?: TariffCardColor;
  selected?: boolean;
  $variant: Variant;
}

export const TariffCardStyled = styled.div<TariffCardProps>`
  position: relative;
  display: flex;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  padding: 16px 34px;
  ${({ $variant }) => adaptive({
  variant: $variant,
  merge: true,
  tablet: css`
      padding: 16px 16px;
    `,
  mobile: css`
      padding: 14px;
    `,
})}
  box-sizing: border-box;
  opacity: 0.9;
  background: ${({ theme }) => theme.colors.grayScale.gray7};
  border-radius: 14px;
  & > input:[type="radio"]:checked ~ & {
    outline: 1px solid ${({ theme }) => theme.default.colors.accent.primary};
  }
  ${({ selected, theme }) => selected
    && theme.mode === 'light'
    && css`
      outline: 1px solid ${theme.default.colors.accent.primary};
      background-color: ${theme.colors.grayScale.gray3};
    `}
  ${({ selected, theme }) => selected
    && theme.mode === 'dark'
    && css`
      outline: 1px solid ${theme.default.colors.accent.primary};
      background-color: ${theme.colors.grayScale.gray3};
    `}
  ${({ theme }) => theme.mode === 'dark'
    && css`
      &:after {
        display: block;
        content: '';
        position: absolute;
        width: 1070px;
        height: 216.23px;
        gap: 0px;
        left: -240px;
        top: -200px;
        filter: blur(50px);
        transform: rotate(-4.41deg);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        background: linear-gradient(
          90.98deg,
          #2244f4 7.53%,
          rgba(252, 94, 255, 0.4) 72.48%
        );
        border-radius: 50%;
        z-index: -1;
      }
    `};
`;

export const TariffCardBackgroundBlack = styled.div<{ $variant: Variant }>`
  position: absolute;
  right: clamp(-3.125rem, -8.854rem + 16.667vw, 0rem);
  bottom: 0;
	height: 0;
	border-bottom: 300px solid ${({ theme }) => theme.default.colors.base.black};
	border-left: 180px solid transparent;
  ${({ $variant }) => {
    switch ($variant) {
      case 'main':
        return adaptive({
          variant: 'main',
          merge: true,
          desktop: css`width: 270px;`,
          tablet: css`width: 240px;`,
          mobile: css`display: none`,
        });
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          merge: true,
          desktop: css`width: 270px;`,
          tablet: css`width: 220px;`,
          mobile: css`display: none`,
        });
    }
  }}
`;

export const TariffCardBackgroundGradient = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.mode === 'light' && css`opacity: 0.7;`}
`;

export const TariffCardBackgroundGradientBasic = styled(TariffCardBackgroundGradient).attrs({
  src: basicBg
})``;

export const TariffCardBackgroundGradientPremium = styled(TariffCardBackgroundGradient).attrs({
  src: premiumBg
})``;

export const TariffCardBackgroundGradientDeluxe = styled(TariffCardBackgroundGradient).attrs({
  src: deluxeBg
})``;

export const TariffCardBackgroundGradientElite = styled(TariffCardBackgroundGradient).attrs({
  src: eliteBg
})``;

export const TariffCardBackgroundPercent = styled.img<{ $variant: Variant }>`
  position: absolute;
  right: 0;
  top: 0;
  ${({ $variant }) => {
    switch ($variant) {
      case 'main':
        return adaptive({
          variant: 'main',
          mobile: css`display: none`,
        });
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          mobile: css`display: none`,
        });
    }
  }}
`;

export const TariffCardBackgroundPercentBasic = styled(TariffCardBackgroundPercent).attrs({
  src: basicPercent
})``;

export const TariffCardBackgroundPercentPremium = styled(TariffCardBackgroundPercent).attrs({
  src: premiumPercent
})``;

export const TariffCardBackgroundPercentDeluxe = styled(TariffCardBackgroundPercent).attrs({
  src: deluxePercent
})``;

export const TariffCardBackgroundPercentElite = styled(TariffCardBackgroundPercent).attrs({
  src: elitePercent
})``;

export const TariffCardBackgroundPercentMobile = styled.img<{ $variant: Variant }>`
  display: none;
  position: absolute;
  right: 0;
  height: 100%;
  top: 0;
  ${({ $variant }) => adaptive({
  variant: $variant,
  merge: true,
  mobile: css`display: block`,
})}
`;

export const TariffCardBackgroundPercentMobileBasic = styled(TariffCardBackgroundPercentMobile)
  .attrs({
    src: basicPercentMobile
  })``;

export const TariffCardBackgroundPercentMobilePremium = styled(TariffCardBackgroundPercentMobile)
  .attrs({
    src: premiumPercentMobile
  })``;

export const TariffCardBackgroundPercentMobileDeluxe = styled(TariffCardBackgroundPercentMobile)
  .attrs({
    src: deluxePercentMobile
  })``;

export const TariffCardBackgroundPercentMobileElite = styled(TariffCardBackgroundPercentMobile)
  .attrs({
    src: elitePercentMobile
  })``;

export const TariffCardDiscountImage = styled.img<{ $variant: Variant }>`
  position: absolute;
  top: 0;
  ${({ $variant }) => adaptive({
  variant: $variant,
  merge: true,
  desktop: css`
    right: 200px;
  `,
  tablet: css`
    right: clamp(5.938rem, 0.208rem + 16.667vw, 9.063rem);
  `,
  mobile: css`
    display: none;
  `
})}
`;

export const TariffCardDiscountImageBasic = styled(TariffCardDiscountImage).attrs({
  src: basicDiscount
})``;

export const TariffCardDiscountImagePremium = styled(TariffCardDiscountImage).attrs({
  src: premiumDiscount
})``;

export const TariffCardDiscountImageDeluxe = styled(TariffCardDiscountImage).attrs({
  src: deluxeDiscount
})``;

export const TariffCardDiscountImageElite = styled(TariffCardDiscountImage).attrs({
  src: eliteDiscount
})``;

export const TariffCardContainer = styled.div<{ $variant: Variant }>`
  display: flex;
  flex-direction: column;
  ${({ $variant }) => {
    switch ($variant) {
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          desktop: css`
            min-width: 210px;
          `,
          tablet: css`
            min-width: 185px;
          `,
          mobile: css`
            min-width: 210px;
          `
        });
      case 'main':
        return adaptive({
          variant: 'main',
          desktop: css`
            min-width: 210px;
          `,
          tablet: css`
            min-width: 235px;
          `,
          mobile: css`
            min-width: 210px;
          `
        });
    }
  }}
`;

export const TariffCardStyledContent = styled.div<{ $variant: Variant }>`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 34px;
  ${({ $variant }) => adaptive({
  variant: $variant,
  merge: true,
  tablet: css`
    gap: 32px;
    `,
  mobile: css`
    flex-wrap: wrap;
    gap: 10px;
    `,
})}
`;

export const TarrifCardStyledLeft = styled.div<{ $variant: Variant }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  ${({ $variant }) => adaptive({
  variant: $variant,
  mobile: css`
      flex-wrap: wrap;
    `,
})}
`;

export const TariffCardStyledName: React.FC<{
  $color: TariffCardColor;
  children?: React.ReactNode;
}> = styled(Typography).attrs({
  variant: 'body-xl-semibold',
  component: 'h3',
}) <{ $color: TariffCardColor }>`
  background-clip: text;
  -webkit-background-clip: text;
  width: fit-content;
  -webkit-text-fill-color: transparent;
  background-image: ${({ theme, $color }) => {
      switch ($color) {
        case 'blue':
          return theme.colors.accent.primary;
        case 'blue-lilac':
          return theme.colors.premiumGradient;
        default:
          return theme.colors.base.white;
      }
    }};
  background-color: ${({ theme, $color }) => {
      switch ($color) {
        case 'blue':
          return theme.colors.accent.primary;
        case 'blue-lilac':
          return theme.colors.premiumGradient;
        default:
          return theme.colors.base.white;
      }
    }};
`;

export const TariffCardStyledMiddle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const TariffCardStyledDescription = styled(Typography).attrs({
  variant: 'body-s-semibold',
})`
  width: 100%;
  max-width: 518px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const TarrifCardStyledRight = styled.div<{ $variant: Variant }>`
  position: relative;
  white-space: nowrap;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 5px;
  width: 200px;
  margin-right: clamp(0rem, -6.366rem + 18.519vw, 3.125rem);
  ${({ $variant }) => adaptive({
  variant: $variant,
  mobile: css`
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px 0;
    `,
})}
`;

export const TariffCardStyledPrice = styled(Typography).attrs({
  variant: 'h2',
}) <{ $isDefault?: boolean, $variant: Variant }>`
  color: ${({ theme, $isDefault }) => ($isDefault ? theme.colors.base.white : theme.default.colors.base.white)};
  ${({ $variant }) => adaptive({
  variant: $variant,
  mobile: css`
    color: ${({ theme }) => theme.colors.base.white};
  `,
})}
`;

export const TariffCardStyledCurrency = styled(Typography).attrs({
  variant: 'body-l-medium',
}) <{ $isDefault?: boolean, $variant: Variant }>`
  padding-bottom: 4px;
  color: ${({ theme, $isDefault }) => ($isDefault ? theme.colors.base.white : theme.default.colors.base.white)};
  ${({ $variant }) => adaptive({
  variant: $variant,
  mobile: css`
    color: ${({ theme }) => theme.colors.base.white};
  `,
})}
`;
export const TariffCardStyledOldPriceWrapper = styled.div<{ $variant: Variant }>`
  position: absolute;
  display: flex;
  top: -10px;
  right: 0;
  ${({ $variant }) => adaptive({
  variant: $variant,
  mobile: css`
    top: -4px;
    right: 0;
    `,
})}
`;

export const TariffCardStyledOldPrice = styled(Typography) <{ $variant: Variant }>`
  color: ${({ theme }) => theme.default.colors.grayScale.gray6};
  ${({ $variant }) => adaptive({
  variant: $variant,
  mobile: css`
      color: ${({ theme }) => theme.colors.base.white};
    `,
})}
  width: 100px;
  z-index: 1;
  font-size: 14px;
  font-weight: 600;
  line-height: 18.2px;
  text-align: right;
  text-decoration-line: line-through;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const TarrifCardStyledRadio = styled(Radio)`
`;

export const TariffCardStyledGiveCaps = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TariffCardGiveCapsBadge = styled(Badge).attrs({ variant: 'info' })`
  ${({ theme }) => `
    background-color: ${theme.mode === 'dark'
      ? theme.colors.grayScale.gray2
      : theme.colors.grayScale.gray5};
    color: ${theme.default.colors.base.white};
  `}
`;

export const TariffCardGiveCapsBadgeText = styled(Typography).attrs({
  variant: 'body-s-medium',
})`
  white-space: nowrap;
  ${({ theme }) => `
    color: ${theme.default.colors.base.white};
  `}
`;

export const TariffCardStyledDescriptionIcon = styled(CheckCircleIcon).attrs({
  size: 18,
}) <{ $variant: Variant }>`
  ${({ $variant }) => adaptive({
  variant: $variant,
  mobile: css`
    display: none;
  `,
})}
`;
export const TariffCardGiveCapsText = styled(Typography).attrs({
  variant: 'body-xs-regular',
})`
  white-space: nowrap;
`;
