import React from "react";
import { TariffBorderWrapper, TariffContent, TariffCurrency, TariffItem, TariffContentList, TariffName, TariffPrice, TariffPriceValue, TariffPurchaseButton, TariffStyled, TariffText, TariffValidityPeriod } from "./styled";
import { TariffColor } from "./types";
import { CheckCircleIcon } from "../icons";

export interface TariffProps extends React.ComponentProps<'div'> {
  name: string;
  text: string;
  price: string;
  currency: string;
  list: string[];
  button: React.ReactNode;
  validityPeriod: string;
  color?: TariffColor;
}

export const Tariff: React.FC<TariffProps> = ({ 
  name, text, price, currency, list, button, validityPeriod, color = 'gray', ...props
}) => {
  return <TariffStyled {...props} $color={color}>
    <TariffBorderWrapper>
      <TariffContent>
        <TariffName>{name}</TariffName>
        <TariffText>{text}</TariffText>
        <TariffPrice>
          <TariffPriceValue>
            {price}
          </TariffPriceValue>
          <TariffCurrency>
            {currency}
          </TariffCurrency>
        </TariffPrice>
        <TariffContentList>
          {list.map((item, index) => (
            <TariffItem key={index}>
              <CheckCircleIcon />
              {item}
            </TariffItem>
          ))}
        </TariffContentList>
        {typeof button === 'string' ? (
          <TariffPurchaseButton>
            {button}
          </TariffPurchaseButton>
        ) : button}
        <TariffValidityPeriod>
          {validityPeriod}
        </TariffValidityPeriod>
      </TariffContent>
    </TariffBorderWrapper>
  </TariffStyled>
};

Tariff.displayName = 'SwiperSlide';

export * from './types';
export * from './styled';
export * from './list';
