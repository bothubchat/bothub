import React, { lazy, Suspense, useRef } from 'react';
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
  TariffCardContainer,
  TariffCardStyledOldPrice,
  TariffCardStyledOldPriceWrapper
} from './styled';
import { TariffCardColor, TariffType } from './types';

const TariffCardImages = lazy(() =>
  import('./tariff-card-images').then((module) => ({
    default: module.TariffCardImages
  }))
);

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
  color?: TariffCardColor;
  isDefault?: boolean;
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
  isDefault = true,
  color = 'white',
  oldPrice,
  children: _,
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

  return (
    <TariffCardStyled
      $variant={variant}
      onClick={handleClick}
      ref={ref}
      selected={selected}
      {...props}
    >
      {!isDefault && (
        <Suspense>
          <TariffCardImages
            variant={variant}
            name={name as TariffType}
          />
        </Suspense>
      )}
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
          <TariffCardStyledPrice
            $isDefault={isDefault}
            $variant={variant}
          >
            {price}
          </TariffCardStyledPrice>
          <TariffCardStyledCurrency
            $isDefault={isDefault}
            $variant={variant}
          >
            {currency}
          </TariffCardStyledCurrency>
          {!isDefault && oldPrice && (
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
