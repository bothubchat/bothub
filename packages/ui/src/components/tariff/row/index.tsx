import React, { useRef } from 'react';
import {
  TariffCardStyled,
  TariffCardStyledContent,
  TariffCardStyledCurrency,
  TariffCardStyledName,
  TariffCardStyledPrice,
  TarrifCardStyledLeft,
  TariffCardStyledMiddle,
  TarrifCardStyledRadio,
  TarrifCardStyledRight,
  TariffCardStyledDescription,
  TariffCardStyledDescriptionIcon,
  TariffCardGiveCapsText,
  TariffCardGiveCapsBadge,
  TariffCardGiveCapsBadgeText,
  TariffCardStyledGiveCaps,
  TariffCardBackgroundGradientBasic,
  TariffCardBackgroundPercentBasic,
  TariffCardBackgroundPercentMobileBasic,
  TariffCardDiscountImageBasic,
  TariffCardBackgroundGradientDeluxe,
  TariffCardBackgroundGradientElite,
  TariffCardBackgroundGradientPremium,
  TariffCardBackgroundPercentDeluxe,
  TariffCardBackgroundPercentElite,
  TariffCardBackgroundPercentMobileDeluxe,
  TariffCardBackgroundPercentMobileElite,
  TariffCardBackgroundPercentMobilePremium,
  TariffCardBackgroundPercentPremium,
  TariffCardDiscountImageDeluxe,
  TariffCardDiscountImageElite,
  TariffCardDiscountImagePremium,
  TariffCardContainer,
  TariffCardBackgroundBlack,
  TariffCardStyledOldPrice,
  TariffCardStyledOldPriceWrapper,
} from './styled';
import { TariffCardColor, TariffType } from './types';

export interface TariffCardRowProps extends React.ComponentProps<'div'> {
  name: string;
  description?: string;
  giveCaps?: string;
  giveCapsText?: string;
  price: string;
  currency: string;
  oldPrice?: string;
  selected?: boolean;
  variant?: 'main' | 'dashboard';
  isFree?: boolean;
  color?: TariffCardColor;
}

export const TariffCardRow: React.FC<TariffCardRowProps> = ({
  name,
  giveCaps,
  price,
  variant = 'main',
  currency,
  onChange,
  giveCapsText,
  selected,
  color = 'white',
  isFree,
  oldPrice,
  children,
  description,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    const radio = ref.current?.querySelector('input');
    if (radio) {
      radio.click();
    }
  };

  const tariffImages = {
    Basic: [
      <TariffCardBackgroundGradientBasic />,
      <TariffCardBackgroundBlack $variant={variant} />,
      <TariffCardBackgroundPercentBasic $variant={variant} />,
      <TariffCardBackgroundPercentMobileBasic $variant={variant} />,
      <TariffCardDiscountImageBasic $variant={variant} />
    ],
    Premium: [
      <TariffCardBackgroundGradientPremium />,
      <TariffCardBackgroundBlack $variant={variant} />,
      <TariffCardBackgroundPercentPremium $variant={variant} />,
      <TariffCardBackgroundPercentMobilePremium $variant={variant} />,
      <TariffCardDiscountImagePremium $variant={variant} />
    ],
    Deluxe: [
      <TariffCardBackgroundGradientDeluxe />,
      <TariffCardBackgroundBlack $variant={variant} />,
      <TariffCardBackgroundPercentDeluxe $variant={variant} />,
      <TariffCardBackgroundPercentMobileDeluxe $variant={variant} />,
      <TariffCardDiscountImageDeluxe $variant={variant} />
    ],
    Elite: [
      <TariffCardBackgroundGradientElite />,
      <TariffCardBackgroundBlack $variant={variant} />,
      <TariffCardBackgroundPercentElite $variant={variant} />,
      <TariffCardBackgroundPercentMobileElite $variant={variant} />,
      <TariffCardDiscountImageElite $variant={variant} />
    ],
  }

  return (
    <TariffCardStyled
      $variant={variant}
      onClick={handleClick}
      ref={ref}
      selected={selected}
      {...props}
    >
      {tariffImages[name as TariffType]}
      <TariffCardStyledContent $variant={variant}>
        <TarrifCardStyledLeft $variant={variant}>
          <TarrifCardStyledRadio
            onClick={onChange}
            checked={selected}
            name="tariff"
            value={name}
          />
          <TariffCardContainer $variant={variant}>
            <TariffCardStyledName $color={color}>{name}</TariffCardStyledName>
            <TariffCardStyledGiveCaps>
              <TariffCardGiveCapsText>{giveCapsText}</TariffCardGiveCapsText>
              <TariffCardGiveCapsBadge>
                <TariffCardGiveCapsBadgeText>
                  {giveCaps}
                </TariffCardGiveCapsBadgeText>
              </TariffCardGiveCapsBadge>
            </TariffCardStyledGiveCaps>
          </TariffCardContainer>
          <TariffCardStyledMiddle>
            <TariffCardStyledDescriptionIcon $variant={variant} />
            <TariffCardStyledDescription>
              {description}
            </TariffCardStyledDescription>
          </TariffCardStyledMiddle>
        </TarrifCardStyledLeft>
        <TarrifCardStyledRight $variant={variant}>
          <TariffCardStyledPrice $isFree={isFree} $variant={variant}>
            {price}
          </TariffCardStyledPrice>
          <TariffCardStyledCurrency $isFree={isFree} $variant={variant}>
            {currency}
          </TariffCardStyledCurrency>
          {!isFree && (
            <TariffCardStyledOldPriceWrapper $variant={variant}>
              <TariffCardStyledOldPrice $variant={variant}>
                {`${oldPrice} ${currency}`}
              </TariffCardStyledOldPrice>
            </TariffCardStyledOldPriceWrapper>
          )}
        </TarrifCardStyledRight>
      </TariffCardStyledContent>
    </TariffCardStyled>
  );
};
