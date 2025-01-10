import {
  TariffCardBackgroundBlack,
  TariffCardBackgroundGradientBasic,
  TariffCardBackgroundGradientDeluxe,
  TariffCardBackgroundGradientElite,
  TariffCardBackgroundGradientPremium,
} from './styled';
import { TariffType } from '../types';
import { TariffCardDiscountLabel } from './discount-label';
import { TariffCardBackgroundPercent } from './background-percent';
import { TariffCardBackgroundPercentMobile } from './background-percent-mobile';

export interface TariffCardImagesProps {
  variant: 'main' | 'dashboard';
  name: TariffType;
}

export const TariffCardImages = ({ variant, name }: TariffCardImagesProps) => {
  const tariffImages = {
    Basic: [
      <TariffCardBackgroundGradientBasic />,
      <TariffCardBackgroundBlack $variant={variant} />,
      <TariffCardBackgroundPercent variant={variant} color="#4785FF" />,
      <TariffCardBackgroundPercentMobile variant={variant} color="#4785FF" />,
      <TariffCardDiscountLabel
        variant={variant}
        color="#4785FF"
        percent="30"
      />,
    ],
    Premium: [
      <TariffCardBackgroundGradientPremium />,
      <TariffCardBackgroundBlack $variant={variant} />,
      <TariffCardBackgroundPercent variant={variant} color="#1C64F2" />,
      <TariffCardBackgroundPercentMobile variant={variant} color="#1C64F2" />,
      <TariffCardDiscountLabel
        variant={variant}
        color="#1C64F2"
        percent="30"
      />,
    ],
    Deluxe: [
      <TariffCardBackgroundGradientDeluxe />,
      <TariffCardBackgroundBlack $variant={variant} />,
      <TariffCardBackgroundPercent variant={variant} color="#734AD3" />,
      <TariffCardBackgroundPercentMobile variant={variant} color="#734AD3" />,
      <TariffCardDiscountLabel
        variant={variant}
        color="#734AD3"
        percent="30"
      />,
    ],
    Elite: [
      <TariffCardBackgroundGradientElite />,
      <TariffCardBackgroundBlack $variant={variant} />,
      <TariffCardBackgroundPercent variant={variant} color="#EE1CF2" />,
      <TariffCardBackgroundPercentMobile variant={variant} color="#EE1CF2" />,
      <TariffCardDiscountLabel
        variant={variant}
        color="#EE1CF2"
        percent="20"
      />,
    ],
  };

  return tariffImages[name];
};
