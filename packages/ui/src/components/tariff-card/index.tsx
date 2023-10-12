import React from 'react';
import {
  TariffCardBorderWrapper, 
  TariffCardContent, 
  TariffCardCurrency, 
  TariffCardName, 
  TariffCardPrice, 
  TariffCardPriceValue, 
  TariffCardPurchaseButton, 
  TariffCardStyled,
  TariffCardValidityPeriod, 
  TariffCardTop, 
  TariffCardBottom, 
  TariffCardNamePrice,
  TariffCardHead,
  TariffCardBody,
  TariffCardDetailsLink
} from './styled';
import { TariffCardColor, TariffCardVariant } from './types';

export interface TariffCardProps extends React.ComponentProps<'div'> {
  variant?: TariffCardVariant;
  name: string;
  giveCaps?: React.ReactNode;
  price: string;
  currency: string;
  purchase: React.ReactNode;
  details: React.ReactNode;
  validityPeriod: string;
  color?: TariffCardColor;
}

export const TariffCard: React.FC<TariffCardProps> = ({ 
  variant = 'primary', name, giveCaps, price, currency, details, purchase, validityPeriod, color = 'gray', children, ...props
}) => (
  <TariffCardStyled
    $color={color}
    {...props}
  >
    <TariffCardBorderWrapper>
      <TariffCardContent
        $variant={variant}
      >
        <TariffCardTop>
          <TariffCardHead>
            <TariffCardNamePrice>
              <TariffCardName>{name}</TariffCardName>
              <TariffCardPrice>
                <TariffCardPriceValue>
                  {price}
                </TariffCardPriceValue>
                <TariffCardCurrency>
                  {currency}
                </TariffCardCurrency>
              </TariffCardPrice>
            </TariffCardNamePrice>
            {giveCaps}
          </TariffCardHead>
          <TariffCardBody>
            {children}
          </TariffCardBody>
        </TariffCardTop>
        <TariffCardBottom>
          {typeof details !== 'string' && details}
          {typeof details === 'string' && (
            <TariffCardDetailsLink>
              {details}
            </TariffCardDetailsLink>
          )}
          {typeof purchase !== 'string' && purchase}
          {typeof purchase === 'string' && (
            <TariffCardPurchaseButton>
              {purchase}
            </TariffCardPurchaseButton>
          )}
          <TariffCardValidityPeriod>
            {validityPeriod}
          </TariffCardValidityPeriod>
        </TariffCardBottom>
      </TariffCardContent>
    </TariffCardBorderWrapper>
  </TariffCardStyled>
);

TariffCard.displayName = 'SwiperSlide';

export * from './types';
export * from './styled';
export * from './model';
