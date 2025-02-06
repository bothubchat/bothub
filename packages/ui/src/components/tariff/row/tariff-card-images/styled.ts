import { styled, css } from 'styled-components';
import { adaptive } from '@/ui/adaptive';
import { Variant } from '../styled';

import basicBg from '../../assets/basic/basic-bg.svg';
import premiumBg from '../../assets/premium/premium-bg.svg';
import deluxeBg from '../../assets/deluxe/deluxe-bg.svg';
import eliteBg from '../../assets/elite/elite-bg.svg';

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
          desktop: css`
            width: 270px;
          `,
          tablet: css`
            width: 240px;
          `,
          mobile: css`
            display: none;
          `
        });
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          merge: true,
          desktop: css`
            width: 270px;
          `,
          tablet: css`
            width: 220px;
          `,
          mobile: css`
            display: none;
          `
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
  ${({ theme }) =>
    theme.mode === 'light' &&
    css`
      opacity: 0.7;
    `}
`;

export const TariffCardBackgroundGradientBasic = styled(
  TariffCardBackgroundGradient
).attrs({
  src: basicBg
})``;

export const TariffCardBackgroundGradientPremium = styled(
  TariffCardBackgroundGradient
).attrs({
  src: premiumBg
})``;

export const TariffCardBackgroundGradientDeluxe = styled(
  TariffCardBackgroundGradient
).attrs({
  src: deluxeBg
})``;

export const TariffCardBackgroundGradientElite = styled(
  TariffCardBackgroundGradient
).attrs({
  src: eliteBg
})``;

export const TariffCardBackgroundPercentStyled = styled.svg<{
  $variant: Variant;
}>`
  position: absolute;
  right: 0;
  top: 0;
  ${({ $variant }) => {
    switch ($variant) {
      case 'main':
        return adaptive({
          variant: 'main',
          mobile: css`
            display: none;
          `
        });
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          mobile: css`
            display: none;
          `
        });
    }
  }}
`;

export const TariffCardBackgroundPercentMobileStyled = styled.svg<{
  $variant: Variant;
}>`
  display: none;
  position: absolute;
  right: 0;
  height: 100%;
  top: 0;
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      merge: true,
      mobile: css`
        display: block;
      `
    })}
`;

export const TariffCardDiscountLabelStyled = styled.svg<{ $variant: Variant }>`
  position: absolute;
  top: 0;
  ${({ $variant }) =>
    adaptive({
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
